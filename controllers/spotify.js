const express = require('express');
const router = express.Router();
const SpotifyApi = require('../services/spotify.js');

router.get('/songs', (req, res) => {
	const { query: { searchterm }, user } = req;
	
	try {
		SpotifyApi.searchSongs({ searchTerm: searchterm, user }).then(({ 
			body: { 
				tracks: { 
					items: songs 
				} 
			}, 
			error }) => {
				const payload = { songs, error };

				res.send(payload);
		});
	} catch(error) {
		res.send({ songs: [], error });
	}
});

router.get('/playlists', (req,res) => {
	SpotifyApi.getPlaylists({ user: req.user }).then(({ body }) => {
		res.send(body);
	});
});

router.get('/playlistTracks', (req,res) => {
	const { query: { ownerId, playlistId, total }, user } = req;

	SpotifyApi.getPlaylistTracks({ 
		user, 
		ownerId, 
		playlistId, 
		total 
	}).then((tracks) => {
		res.send({ tracks });
	});
});

router.get('/songData/:id', (req, res) => {
	const { params: { id }, user } = req;

	try {
		SpotifyApi.getSongData({ id, user }).then(({ body: song, error }) => {
			const payload = { song, error };

			res.send(payload);
		});
	} catch(error) {
		res.send({ error });
	}
});

router.get('/songWithData/:id', async(req, res) => {
	const { params: { id }, user } = req;

	try {
		Promise.all([
			SpotifyApi.getSong({ id, user }),
			SpotifyApi.getSongData({ id, user })
		]).then(([
			{ body: song },
			{ body: songData }
		]) => {
			const payload = { song, songData };

			res.send(payload);
		});
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