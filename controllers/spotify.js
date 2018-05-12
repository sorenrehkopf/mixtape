const express = require('express');
const router = express.Router();
const SpotifyApi = require('../services/spotify.js');

router.get('/songs', async(req, res) => {
	const { query: { searchterm }, user } = req;
	
	try {
		const { body: { tracks: { items: songs } }, error } = await SpotifyApi.searchSongs({ searchTerm: searchterm, user });
		const payload = { songs, error };

		res.send(payload);
	} catch(error) {
		res.send({ songs: [], error });
	}
});

router.get('/song/:id', async(req, res) => {
	const { params: { id }, user } = req;

	try {
		const { body: song, error } = await SpotifyApi.getSongData({ id, user });
		const payload = { song, error };

		res.send(payload);
	} catch(error) {
		res.send({ error });
	}
});

router.put('/play', (req, res) => {
	const { body: { uri }, user } = req;
	SpotifyApi.playPlaylist({ user, uri }).then(() => {
		res.send({ status: 'success!' });
	}).catch(error => {
		res.send({ status: 'something went wrong', error });
	});
});

module.exports = router;