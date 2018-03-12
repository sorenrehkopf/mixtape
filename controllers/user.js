const express = require('express');
const router = express.Router();
const { Song, User } = require('../models/index.js');

router.get('/', (req, res) => {
	const { id } = req.user;
	User.findOne({
		where: {
			id
		},
		include: [ Song ],
		order: [ [ Song, 'createdAt', 'DESC'] ]
	}).then(({ displayName, displayPhoto, Songs }) => {
		res.send({
			displayName,
			displayPhoto,
			Songs
		});
	});
});

module.exports = router;