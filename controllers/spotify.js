const express = require('express');
const router = express.Router();
const SpotifyApi = require('../services/spotify.js');

router.get('/songs', async(req, res) => {
	const { query: { searchterm }, user } = req;
	
	try {
		const { body: { tracks: { items: songs } } } = await SpotifyApi.searchSongs({ searchTerm: searchterm, user });
		const payload = { songs };

		res.send(payload);
	} catch(error) {
		res.send({ songs: [], error });
	}
});

module.exports = router;