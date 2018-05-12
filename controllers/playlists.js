const express = require('express');
const router = express.Router();
const { Song } = require('../models/index.js');
const TagsFormatter = require('../services/tags-formatter.js');
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
		const songUris = CollectionBuilder.filterResults({
			songs,
			params: songCriteria
		}).map(({ spotifyId }) => `spotify:track:${spotifyId}`);

		SpotifyApi.createPlaylist({ user, name }).then(({ body: playlist }) => {
			const { id: playlistId } = playlist;
			SpotifyApi.addTracksToPlaylist({ user, playlistId, songUris })
			res.send({ playlist });
		});
	});
});

module.exports = router;