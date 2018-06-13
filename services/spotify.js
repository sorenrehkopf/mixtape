const { User } = require('../models/index.js');
const SpotifyWebApi = require('spotify-web-api-node');
const logger = require('./logger.js');

const spotifyApi = new SpotifyWebApi({
	clientId:process.env.SPOTIFY_CLIENT_ID,
	clientSecret:process.env.SPOTIFY_CLIENT_SECRET
});

class SpotifyApi {
	static execute({ method, params= [], user: { spotifyAccessToken, spotifyRefreshToken, id, displayName } }) {
		spotifyApi.setAccessToken(spotifyAccessToken);
		spotifyApi.setRefreshToken(spotifyRefreshToken);

		return new Promise((resolve, reject) => {
			spotifyApi[method](...params).then(({ body }) => {
				resolve({ body, error: null });
			}).catch(async(error) => {
				if (error.statusCode === 401) {
					logger.info('refreshing the spotify access token!', {
						userId: id,
						userName: displayName
					});
					try {
						spotifyApi.refreshAccessToken().then(({ body: { access_token } }) => {
							User.findById(id).then(user => {
								user.spotifyAccessToken = access_token;
								user.save();

								spotifyApi.setAccessToken(access_token);
								spotifyApi[method](...params).then(({ body }) => {
									resolve({ body , error: null });
								});
							});
						});
					} catch (error) {
						logger.error('Error with the spotify request', {
							error,
							userId: id,
							userName: displayName
						});

						reject(error);
					}
				}
			});
		});
	}

	static searchSongs({ searchTerm, user }) {
		return this.execute({
			method: 'searchTracks',
			params: [searchTerm],
			user
		});
	};

	static getSong({ id, user }) {
		return this.execute({
			method: 'getTrack',
			params: [id],
			user
		});
	};

	static getSongData({ id, user }) {
		return this.execute({
			method: 'getAudioFeaturesForTrack',
			params: [id],
			user
		});
	};

	static saveSong({ id, user }) {
		return this.execute({
			method: 'addToMySavedTracks',
			params: [[id]],
			user
		})
	}

	static getDataForSongs({ user, trackIds, total }) {
		const n = Math.ceil(total / 100);
		const trackFetches = [];
		let tracks = [];

		for (let i = 0; i < n; i ++) {
			const count = 99 * i;
			trackFetches.push(this.execute({
				method: 'getAudioFeaturesForTracks',
				params: [trackIds.slice(0 + count, 99 + count)],
				user
			}).then(({ body }) => {
				tracks = [...tracks, ...body.audio_features];
			}));
		}

		return new Promise(resolve => {
			Promise.all(trackFetches).then(() => resolve(tracks));
		});
	}

	static createPlaylist({ user, name, description }) {
		return this.execute({
			method: 'createPlaylist',
			params: [user.spotifyId, name, { description }],
			user
		});
	}

	static addTracksToPlaylist({ user, playlistId, songUris }) {
		return this.execute({
			method: 'addTracksToPlaylist',
			params: [user.spotifyId, playlistId, songUris],
			user
		});
	}

	static replacePlaylistTracks({ user, playlistId, songUris }) {
		return this.execute({
			method: 'replaceTracksInPlaylist',
			params: [user.spotifyId, playlistId, songUris],
			user
		});
	}

	static updatePlaylistDetails({ user, playlistId, update }) {
		return this.execute({
			method: 'changePlaylistDetails',
			params: [user.spotifyId, playlistId, update],
			user
		});
	}

	static playPlaylist({ user, uri }) {
		return this.execute({
			method: 'play',
			params: [{ context_uri: uri }],
			user
		})
	}

	static getPlaylists({ user }) {
		return this.execute({
			method: 'getUserPlaylists',
			params: [user.spotifyId, { limit: 50 }],
			user
		})
	}

	static getPlaylistTracks({ user, ownerId, playlistId, total }) {
		const n = Math.ceil(total / 100);
		const trackFetches = [];
		const trackFetchResults = {};

		for (let i = 0; i < n; i ++) {
			trackFetches.push(this.execute({
				method: 'getPlaylistTracks',
				params: [ownerId, playlistId, { limit: 100, offset: 100 * i }],
				user
			}).then(({ body }) => {
				trackFetchResults[i] = body.items;
			}));
		}

		return new Promise(resolve => {
			Promise.all(trackFetches).then(() => {
				let tracks = [];

				for (let i = 0; i < n; i ++) {
					tracks = [...tracks, ...trackFetchResults[i]];
				}

				resolve(tracks);
			});
		});
	}
}

module.exports = SpotifyApi;