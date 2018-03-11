const express = require('express');
const router = express.Router();
const { User } = require('../models/index.js');

router.get('/', (req, res) => {
	
});

router.post('/', (req, res) => {
	console.log(req.body);
	res.send(req.body);
});

module.exports = router;