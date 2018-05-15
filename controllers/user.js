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
		include: [{
				model: Song
			},
			{
				model: Tag
			}],
		order: [ [ Song, 'createdAt', 'DESC'] ]
	}).then(({ displayName, displayPhoto, Songs, Tags }) => {
		console.log('the songs!')
		res.send({
			displayName,
			displayPhoto,
			Songs: Songs.map(song => {
				song.tags = SongFormatter.formatForClient(song.tags);
				return song;
			}),
			Tags
		});
	});
});

module.exports = router;