const { User } = require('../models/index.js');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
	clientId:process.env.SPOTIFY_CLIENT_ID,
	clientSecret:process.env.SPOTIFY_CLIENT_SECRET
});

class SpotifyApi {
	static async execute({ method, params= [], user: { spotifyAccessToken, spotifyRefreshToken, id } }) {
		spotifyApi.setAccessToken(spotifyAccessToken);
		spotifyApi.setRefreshToken(spotifyRefreshToken);

		const { body } = await spotifyApi[method](...params).catch(async(error) => {
			if (error.statusCode === 401) {
				console.log('refreshing the access token!');
				try {
					const { body: { access_token } } = await spotifyApi.refreshAccessToken();
					const user = await User.findById(id);
					
					user.spotifyAccessToken = access_token;
					await user.save();

					spotifyApi.setAccessToken(access_token);

					const { body } = await spotifyApi[method](...params);
					return { body , error: null }; 
				} catch (error) {
					console.log('there was an error!', error);
					return { body: null, error };
				}
			}

			return { body: null, error };
		});

		return { body, error: null }
	}

	static async searchSongs({ searchTerm, user }) {
		return await this.execute({
			method: 'searchTracks',
			params: [searchTerm],
			user
		});
	};

	static async getSongData({ id, user }) {
		return await this.execute({
			method: 'getAudioFeaturesForTrack',
			params: [id],
			user
		});
	};

	static getDataForSongs({ user, trackIds, total }) {
		const n = Math.ceil(total / 100);
		const trackFetches = [];
		let tracks = [];

		for (let i = 0; i < n; i ++) {
			const count = 99 * i;
			console.log(trackIds.slice(0 + count, 99 + count))
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