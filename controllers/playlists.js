const express = require('express');
const router = express.Router();
const { Song, User } = require('../models/index.js');
const SpotifyApi = require('../services/spotify.js');
const CollectionBuilder = require('../services/collection-builder.js');
const QueryBuilder = require('../services/query-builder.js');

router.post('/', (req, res) => {
	const { user, body: { songCriteria, playlistData: { name, order, recycle } } } = req;
	const { settings: { defaultPlaylistId } } = user;
	const query = QueryBuilder.build({
		params: songCriteria, 
		user 
	});

	// if there are no given params to query by, only pull the 100 most recent songs
	// otherwise cap at a thousand cause that's plenty
	const limit = (
		!Object.keys(songCriteria.include.params).length && 
		!Object.keys(songCriteria.include.tags).length && 
		!Object.keys(songCriteria.exclude.tags).length
	) ? 100 : 1000;

	const ageOrder = order == 'oldest_first' ? 'ASC' : 'DESC';
	
	Song.findAll({
		where: query,
		raw: true,
		limit,
		order: [ ['id', ageOrder] ]
	}).then(songs => {
		const songUris = CollectionBuilder.getPlaylistUris({
			songs,
			params: songCriteria,
			order
		});

		if (recycle && defaultPlaylistId) {
			SpotifyApi.replacePlaylistTracks({
				user,
				playlistId: defaultPlaylistId,
				songUris
			}).then(() => {
				res.send({
					playlist: {
						external_urls: {
							spotify: `http://open.spotify.com/user/${user.spotifyId}/playlist/${defaultPlaylistId}`
						},
						uri: `spotify:user:${user.spotifyId}:playlist:${defaultPlaylistId}`,
						name: 'My Mixtape'
					}
				});
			});
		} else {
			const playlistName = recycle ? 'My Mixtape' : name;

			SpotifyApi.createPlaylist({ user, name: playlistName }).then(({ body: playlist }) => {
				const { id: playlistId } = playlist;

				if (recycle) {
					User.findById(user.id).then(user => {
						user.settings = {
							...user.settings,
							defaultPlaylistId: playlistId
						}
						user.save();
					});
				}

				SpotifyApi.addTracksToPlaylist({ user, playlistId, songUris }).then(() => {
					res.send({ playlist });
				});
			});
		}
	});
});

module.exports = router;