const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
	clientId:process.env.SPOTIFY_CLIENT_ID,
	clientSecret:process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri:process.env.SPOTIFY_REDIRECT_URI
});

router.get('/songs', async(req, res) => {
	const { searchterm } = req.query;
	const { spotifyAccessToken, spotifyRefreshToken } = req.user;

	spotifyApi.setAccessToken(spotifyAccessToken);
	spotifyApi.setRefreshToken(spotifyRefreshToken);
	
	try {
		const { body: { tracks: { items: songs } } } = await spotifyApi.searchTracks(searchterm);
		const payload = {
			songs
		};

		res.send(payload);
	} catch(error) {
		res.send({ songs: [], error });
	}
});

module.exports = router;