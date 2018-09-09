const express = require('express');
const router = express.Router();
const { Song, Tag } = require('../models/index.js');
const QueryBuilder = require('../services/query-builder');
const CollectionBuilder = require('../services/collection-builder');
const SongFormatter = require('../services/song-formatter');
const SpotifyApi = require('../services/spotify');
const { isEqual } = require('lodash');
const { Op } = require('sequelize');
const logger = require('../services/logger.js');

const getUpdate = (data, song) => {
	const update  = {};

	for (let key in data) {
		if (!isEqual(data[key], song[key])) {
			update[key] = data[key];
		}
	}

	return update;
}

router.get('/', (req, res) => {
	const { user: { id: userId }, query: { before } } = req;

	const query = {
		userId
	};

	if (before) {
		query.id = {
			[Op.lt]: before
		};
	}

	Song.findAll({
		where: query,
		limit: 75,
		order: [ ['id', 'DESC'] ]
	}).then((songs) =>{
		res.send({ songs });
	}).catch(err => {
		logger.error('Something went wrong getting the songs for the user', { 
			error: err,
			userId: req.user.id, 
			userName: req.user.displayName 
		});
		
		res.status(500).send()
	});
});

router.delete('/:id', (req, res) => {
	const { user: { id: userId }, params: { id } } = req;

	Song.find({
		where: {
			userId,
			id
		}
	}).then(song => {
		return song.destroy();
	}).then(() => {
		res.status(200).send();
	}).catch(err => {
		res.status(404).send();
	})
});

router.get('/search/:query', (req, res) => {
	const params = JSON.parse(decodeURIComponent(req.params.query));
	
	//if there are no values given to search for.
	if (!Object.keys(params.include.params).length && !Object.keys(params.include.tags).length && !Object.keys(params.exclude.tags).length) {
		return res.send({songs: [] });
	}

	const query = QueryBuilder.build({ params, user: req.user });


	Song.findAll({
		where: query,
		raw: true,
		limit: 400,
		order: [ ['id', 'DESC'] ]
	}).then(songs => {
		const filteredSongs = CollectionBuilder.filterResults({
			songs,
			params
		}).map(song => ({
			...song,
			tags: SongFormatter.formatForClient(song.tags)
		}));

		res.send({ songs: filteredSongs });
	}).catch(err => {
		logger.error('Something went wrong with that query', { 
			error: err,
			userId: req.user.id, 
			userName: req.user.displayName 
		});
		res.status(422).send();
	});
});

router.post('/', (req, res) => {
	const { settings: { dontSaveAddedSongs } } = req.user;
	const {
		acousticness,
		albumName,
		artistName,
		danceability,
		duration: {
			friendly: durationFriendly,
			ms: durationMs
		},
		energy,
		spotifyId,
		imageUrl,
		instrumentalness,
		key,
		loudness,
		name,
		previewUrl,
		tags,
		tempo,
		timeSignature,
		userId,
		valence
	} = req.body;

	const formattedTags = SongFormatter.formatForDB(tags);
	
	Song.findOrCreate({
		where: {
			spotifyId,
			userId: req.user.id
		}
	}).spread((song, created) => {
		const data = {
			acousticness,
			albumName,
			artistName,
			danceability,
			durationFriendly,
			durationMs,
			energy,
			imageUrl,
			instrumentalness,
			key,
			loudness,
			name,
			previewUrl,
			tags: formattedTags,
			tempo,
			timeSignature,
			userId,
			valence
		};

		const update = created ? data : getUpdate(data, song);

		song.update(update);

		if (created || update.tags) {
			if (!created) {
				song.setTags([])
			}

			for (let name in tags) {
				Tag.findOrCreate({
					where: {
						userId: req.user.id,
						name
					}
				}).spread((tag, created) => {
					song.addTag(tag, { through: { value: formattedTags[name] } });
				})
			}
		}

		if (created && !dontSaveAddedSongs) {
			SpotifyApi.saveSong({ id: spotifyId, user: req.user });
		}

		res.send(song);
	}).catch(err => {
		logger.error('Something went wrong while adding that song', { 
			error: err,
			userId: req.user.id, 
			userName: req.user.displayName 
		});
		res.status(422).send();
	});
});

router.post('/bulkAddPlaylist', (req,res) => {
	const { body: { ownerId, playlistId, total, tags }, user } = req;
	const formattedTags = SongFormatter.formatForDB(tags);

	SpotifyApi.getPlaylistTracks({ 
		user, 
		ownerId, 
		playlistId, 
		total 
	}).then((tracks) => {
		// first get just the actual track data from spotify
		tracks = tracks.map(({ track }) => track);
		// then de-dupe songs so we don't create any duplicate records
		Song.findAll({
			where: {
				[Op.and]: {
					userId: user.id,
					spotifyId: {
						[Op.or]: tracks.map(({ id }) => id)
					}
				}
			}
		}).then(songs => {
			tracks = tracks.filter(track => !songs.some(({ spotifyId }) => spotifyId == track.id));
			// in this case there were no new tracks to add. oh well!
			if (!tracks.length) {
				return res.send({ songs: [] });
			}
			// then get the audio data for the new tracks
			SpotifyApi.getDataForSongs({ 
				user,
				trackIds: tracks.map(({ id }) => id),
				total: tracks.length
			}).then((trackData) => {
				const songsObj = {};

				for (let data of trackData) {
					songsObj[data.id] = data;
				};

				for (let track of tracks) {
					songsObj[track.id] = {
						...track,
						...songsObj[track.id]
					};
				};

				const formattedTracks = Object.keys(songsObj).map(id => {
					return {
						...SongFormatter.convertFromSpotifyData(songsObj[id]),
						userId: user.id,
						tags: formattedTags
					};
				});

				Song.bulkCreate(formattedTracks, {}).then((newSongs) => {
					const tagRecords = {};
					const tagCreators = [];

					for (let name in tags) {
						tagCreators.push(Tag.findOrCreate({
							where: {
								userId: req.user.id,
								name
							}
						}).spread((tag, created) => {
							tagRecords[name] = tag;
						}));
					}

					Promise.all(tagCreators).then(() => {
						for (let song of newSongs) {
							for (let name in tags) {
								song.addTag(tagRecords[name], { through: { value: formattedTags[name] } });
							}
						}
					});
					res.send({ songs: formattedTracks.map(track => ({ ...track, tags })) });
				}).catch(err => {
					logger.error('Something went wrong getting the songs for the user', { 
						error: err,
						userId: req.user.id, 
						userName: req.user.displayName 
					});

					res.status(422).send();
				});
			});
		}).catch(error=> {
			logger.error('Something went wrong getting the songs for the user', { 
				error,
				userId: req.user.id, 
				userName: req.user.displayName 
			});
			
			res.status(422).send();
		})
	});
});

module.exports = router;