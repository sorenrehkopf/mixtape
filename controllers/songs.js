const express = require('express');
const router = express.Router();
const { Song, Tag } = require('../models/index.js');
const QueryBuilder = require('../services/query-builder');
const CollectionBuilder = require('../services/collection-builder');
const SongFormatter = require('../services/song-formatter');
const SpotifyApi = require('../services/spotify');
const { isEqual } = require('lodash');

const getUpdate = (data, song) => {
	const update  = {};

	for (let key in data) {
		if (!isEqual(data[key], song[key])) {
			update[key] = data[key];
		}
	}

	return update;
}

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

router.post('/bulkAdd', (req,res) => {
	const { body: { ownerId, playlistId, total }, user } = req;

	SpotifyApi.getPlaylistTracks({ 
		user, 
		ownerId, 
		playlistId, 
		total 
	}).then((tracks) => {
		SpotifyApi.getDataForSongs({ 
			user,
			trackIds: tracks.map(({ track: { id } }) => id),
			total: tracks.length
		}).then((trackData) => {
			// const formattedTracks = tracks.map(track => SongFormatter.convertFromSpotifyData(track))
			res.send({trackData});
		});
	});
});

module.exports = router;