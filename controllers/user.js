const express = require('express');
const router = express.Router();
const { Song, Tag, User } = require('../models/index.js');
const SongFormatter = require('../services/song-formatter.js');

router.get('/', (req, res) => {
	const { id } = req.user;
	User.findOne({
		where: {
			id
		},
		include: [Tag]
	}).then(({ displayName, displayPhoto, Songs, Tags }) => {
		res.send({
			displayName,
			displayPhoto,
			Songs: (Songs || []).map(song => {
				song.tags = SongFormatter.formatForClient(song.tags);
				return song;
			}),
			Tags: Tags || []
		});
	});
});

module.exports = router;