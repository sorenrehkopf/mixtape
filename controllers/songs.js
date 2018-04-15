const express = require('express');
const router = express.Router();
const { Song, Tag } = require('../models/index.js');

router.get('/:query', (req, res) => {
	const query = JSON.parse(decodeURIComponent(req.params.query));
	console.log('here are the params!', query);
	Song.findAll({
		where: {
			userId: req.user.id
		}
	})
	res.send({ songs: ['howdy!']});
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