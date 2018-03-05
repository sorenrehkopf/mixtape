const express = require('express');
const router = express.Router();
const { Song } = require('../../models/index.js');

router.get('/', (req, res) => {
	
});

router.post('/', (req, res) => {
	console.log(req.body);
	res.send(req.body);
});

module.exports = router;