const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi();

router.get('/songs', async(req, res) => {
	const { searchterm } = req.query;
	console.log('the term!', searchterm);
	const songs = await spotifyApi.searchTracks(searchterm).catch(err => {
		console.log('the error', err)
	});
	console.log('the songs!', songs);
	const payload = {
		songs
	};

	res.send(payload);
});

module.exports = router;