const express = require('express');
const router = express.Router();
const { Song, Tag, User } = require('../models/index.js');

router.get('/', (req, res) => {
	const { id } = req.user;
	User.findOne({
		where: {
			id
		},
		include: [{
				model: Song,
				include: [{
					model: Tag,
					through: { attributes: ['value'] }
				}]
			},
			{
				model: Tag
			}],
		order: [ [ Song, 'createdAt', 'DESC'] ]
	}).then(({ displayName, displayPhoto, Songs, Tags }) => {
		res.send({
			displayName,
			displayPhoto,
			Songs,
			Tags
		});
	});
});

module.exports = router;