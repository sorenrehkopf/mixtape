const express = require('express');
const router = express.Router();
const { Mix } = require('../models/index.js');
const logger = require('../services/logger.js');

router.get('/', (req, res) => {
	const { user: { id: userId } } = req;

	Song.findAll({
		where: {
			userId
		},
		order: [ ['id', 'ASC'] ]
	}).then((mixes) =>{
		res.send({ mixes });
	}).catch(err => {
		logger.error('Something went wrong getting the mixes for the user', { 
			error: err,
			userId: req.user.id, 
			userName: req.user.displayName 
		});
		
		res.status(500).send()
	});
});

router.delete('/:id', (req, res) => {
	const { user: { id: userId }, params: { id } } = req;

	Mix.find({
		where: {
			userId,
			id
		}
	}).then(mix => {
		return mix.destroy();
	}).then(() => {
		res.status(200).send();
	}).catch(err => {
		res.status(404).send();
	})
});

router.post('/', (req, res) => {
	const { user: userId, body: { name, parameters, order} } = req;
	console.log(body);
	Mix.create({
		name,
		order,
		parameters,
		userId
	}).then((mix) => {
		res.send(mix);
	}).catch(err => {
		logger.error('Something went wrong while creating that mix', { 
			error: err,
			userId: req.user.id, 
			userName: req.user.displayName 
		});

		res.status(500).send();
	});
});

router.put('/', (req, res) => {
	const { user: userId, body: { id, name, parameters, order} } = req;

	Mix.find({
		where: {
			id,
			userId
		}
	}).then((mix) => {
		return mix.update({
			name,
			parameters,
			order
		}).then(mix => {
			res.send(mix)
		});
	}).catch(err => {
		logger.error('Something went wrong while updating that mix', { 
			error: err,
			userId: req.user.id, 
			userName: req.user.displayName 
		});

		res.status(500).send();
	});
});

module.exports = router;