const express = require('express');
const router = express.Router();
const { Song, Tag } = require('../models/index.js');
const QueryBuilder = require('../services/query-builder');
const CollectionBuilder = require('../services/collection-builder');
const TagsFormatter = require('../services/tags-formatter');
const { isEqual } = require('lodash');

router.get('/search/:query', (req, res) => {
	const params = JSON.parse(decodeURIComponent(req.params.query));
	const query = QueryBuilder.build({ params, user: req.user });

	Song.findAll(query).then(songs => {
		const filteredSongs = CollectionBuilder.filterResults({
			songs,
			params
		}).map(song => ({
			...song,
			tags: TagsFormatter.formatForClient(song.tags)
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

	const formattedTags = TagsFormatter.formatForDB(tags);
	console.log('here1!', typeof spotifyId, spotifyId)
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
		console.log('here!', created);
		if (created) {
			song.update(data);

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
		} else {
			const update  = {};
			for (let key in data) {
				if (!isEqual(data[key], song[key])) {
					update[key] = data[key];
				}
			}
			console.log('the update!!', update);
			song.update(update);
		}

		res.send(song);
	});
});

module.exports = router;