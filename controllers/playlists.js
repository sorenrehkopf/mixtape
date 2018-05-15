const express = require('express');
const router = express.Router();
const { Song } = require('../models/index.js');
const SpotifyApi = require('../services/spotify.js');
const CollectionBuilder = require('../services/collection-builder.js');
const QueryBuilder = require('../services/query-builder.js');

router.post('/', (req, res) => {
	const { user, body: { songCriteria, playlistData: { name } } } = req;
	const query = QueryBuilder.build({
		params: songCriteria, 
		user 
	});

	Song.findAll(query).then(songs => {
		const songUris = CollectionBuilder.getPlaylistUris({
			songs,
			params: songCriteria
		});

		SpotifyApi.createPlaylist({ user, name }).then(({ body: playlist }) => {
			const { id: playlistId } = playlist;
			SpotifyApi.addTracksToPlaylist({ user, playlistId, songUris }).then(() => {
				res.send({ playlist });
			});
		});
	});
});

module.exports = router;