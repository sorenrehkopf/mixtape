const express = require('express');
const router = express.Router();
const { Song, Tag } = require('../models/index.js');
const QueryBuilder = require('../services/query-builder');

router.get('/search/:query', (req, res) => {
	const params = JSON.parse(decodeURIComponent(req.params.query));
	const query = QueryBuilder.build({ params, user: req.user });
	console.log(JSON.stringify(query))
	Song.findAll(query).then(songs => {
		console.log(songs)
		res.send({ songs });
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
		id: spotifyId,
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
	Song.findOrCreate({
		where: {
			spotifyId,
			userId: req.user.id
		},
		defaults: {
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
			tags,
			tempo,
			timeSignature,
			userId,
			valence
		}
	}).spread((song, created) => {
		for (let name in tags) {
			Tag.findOrCreate({
				where: {
					userId: req.user.id,
					name
				}
			}).spread((tag, created) => {
				song.addTag(tag, { through: { value: {
							type: typeof tags[name],
							data: tags[name]
						}
					}
				})
			})
		}
		res.send(song);
	});
});

module.exports = router;