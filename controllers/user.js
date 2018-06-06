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
			Tags: Tags || []
		});
	}).catch(err => {
		console.log(`Error finding the user: ${err}`);
		res.status(404).send();
	});
});

module.exports = router;