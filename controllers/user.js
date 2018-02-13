const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	const { displayName, displayPhoto } = req.user;
	const payload = {
		displayName,
		displayPhoto
	};

	res.send(payload);
});

module.exports = router;