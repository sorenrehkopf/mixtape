const express = require('express');
const router = express.Router();
const { Song, Tag } = require('../models/index.js');
const QueryBuilder = require('../services/query-builder');
const CollectionBuilder = require('../services/collection-builder');
const SongFormatter = require('../services/song-formatter');
const SpotifyApi = require('../services/spotify');
const { isEqual } = require('lodash');
const { Op } = require('sequelize');

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
	const { user: { id: userId } } = req;

	Song.findAll({
		where: {
			userId
		},
		order: [ [ Song, 'createdAt', 'DESC'] ],
		limit: 200
	})
});

router.get('/search/:query', (req, res) => {
	const params = JSON.parse(decodeURIComponent(req.params.query));
	const query = QueryBuilder.build({ params, user: req.user });

	Song.findAll(query).then(songs => {
		const filteredSongs = CollectionBuilder.filterResults({
			songs,
			params
		}).map(song => ({
			...song,
			tags: SongFormatter.formatForClient(song.tags)
		}));

		res.send({ songs: filteredSongs });
	});
});

router.post('/', (req, res) => {
	const {
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
			albumName,
			artistName,
			danceability,
			durationFriendly,
			durationMs,
			energy,
			imageUrl,
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

		res.send(song);
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
					console.error('there was an error adding the songs!', err);
				});
			});
		});
	});
});

module.exports = router;