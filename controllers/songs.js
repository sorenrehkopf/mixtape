const express = require('express');
const router = express.Router();
const { Song } = require('../models/index.js');

router.get('/', (req, res) => {
	User.findAll({
		where: {
			userId: req.user.id
		}
	})
});

router.post('/', (req, res) => {
	console.log(req.body);
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
		res.send(song);
	});
});

module.exports = router;