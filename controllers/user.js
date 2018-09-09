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
	}).then(({ displayName, displayPhoto, settings, Songs, Tags }) => {
		res.send({
			id,
			displayName,
			displayPhoto,
			settings,
			Tags: Tags || []
		});
	}).catch(err => {
		logger.error('Error finding the user', { 
			error: err,
			userId: req.user.id, 
			userName: req.user.displayName 
		});
		
		res.status(404).send();
	});
});

router.post('/settings', (req, res) => {
	const { id } = req.user;
	const { settings } = req.body;

	User.findById(id).then(user => {
		user.settings = settings;
		return user.save().then(() => {
			res.status(200).send();
		});
	}).catch(err => {
		logger.error('Error finding the user', { 
			error: err,
			userId: req.user.id, 
			userName: req.user.displayName 
		});
		
		res.status(404).send();
	});
});

module.exports = router;