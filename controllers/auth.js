const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const { Song, Tag, User } = require('../models/index.js');
const template = require('lodash/template');
const fs = require('fs');
const jwtSimple = require('jwt-simple');
const logger = require('../services/logger.js');

const handleauthSuccessHTML = fs.readFileSync('./templates/handleauthSuccess.html');
const handleAuthSuccessCompiler = template(handleauthSuccessHTML);
const handleauthFailureHTML = fs.readFileSync('./templates/handleauthFailure.html');

const router = express.Router();
const spotifyApi = new SpotifyWebApi({
	clientId:process.env.SPOTIFY_CLIENT_ID,
	clientSecret:process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri:process.env.SPOTIFY_REDIRECT_URI
});
const SongFormatter = require('../services/song-formatter');


const scopes = [
	'user-library-modify',
	'user-modify-playback-state',
	'playlist-modify-private',
	'playlist-modify-public',
	'playlist-read-private'
];

router.get('/login', (req, res) => {
	const authUrl = spotifyApi.createAuthorizeURL(scopes, '');
	res.redirect(authUrl);
});

router.get('/handleauth', (req, res) => {
	const authErrorHandler = error => {
		logger.error(error, { 
			error
		});
		res.set('Content-Type', 'text/html');
		res.send(handleauthFailureHTML);
	}
	
	if (req.query) {
		const code = req.query.code;
		spotifyApi.authorizationCodeGrant(code).then(async({ body: { access_token, refresh_token } }) => {

			spotifyApi.setAccessToken(access_token);
		  spotifyApi.setRefreshToken(refresh_token);

	    spotifyApi.getMe().then(({ body: { display_name, id, images } }) => {
	    	const { url: photoUrl } = images[0] || {};

		    User.findOrCreate({
		    	where: {
		    		spotifyId: id
		    	},
		    	defaults: {
		    		displayName: display_name,
		    		displayPhoto: photoUrl,
		    		spotifyAccessToken: access_token,
		    		spotifyRefreshToken: refresh_token,
		    	},
		    	include: [ Tag ]
		    }).spread(async(user, created) => {
		    	const { displayName, displayPhoto, id, settings, Songs, Tags, spotifyAccessToken, spotifyRefreshToken } = user;

		    	if (
	    			spotifyAccessToken !== access_token
	    			|| displayName !== display_name
	    			|| displayPhoto !== photoUrl 
		    	) {
		    		user.displayName = display_name;
		    		user.displayPhoto = photoUrl;
		    		user.spotifyAccessToken = access_token;
		    		user.spotifyRefreshToken = refresh_token;

		    		user.save().catch(err => {
		    			logger.error('Something went wrong updating data for the user', { 
								error: err,
								userId: id, 
								userName: displayName 
							});
		    		});
		    	}
		    	
		    	const authToken = jwtSimple.encode({ id }, process.env.AUTH_TOKEN_SECRET);
		    	const data = JSON.stringify({ 
		    		authToken, 
		    		displayName: display_name, 
		    		displayPhoto: photoUrl,
		    		settings,
		    		Tags: Tags || []
		    	});
		    	const handleAuthPage = handleAuthSuccessCompiler({
		    		data, 
		    		targetOrigin: process.env.CLIENT_BASE_URL
		    	});
		    	
		    	res.set('Content-Type', 'text/html');
		    	res.send(handleAuthPage);
			  });
	    });
		}).catch(authErrorHandler);
	}else{
		authErrorHandler('Did not get query from spotify redirect.');
	}
});

module.exports = router;