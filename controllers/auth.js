const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const User = require('../models/user.js');
const template = require('lodash/template');
const fs = require('fs');
const jwtSimple = require('jwt-simple');

const handleauthSuccessHTML = fs.readFileSync('./templates/handleauthSuccess.html');
const handleAuthSuccessCompiler = template(handleauthSuccessHTML);
const handleauthFailureHTML = fs.readFileSync('./templates/handleauthFailure.html');

const router = express.Router();
const spotifyApi = new SpotifyWebApi({
	clientId:process.env.SPOTIFY_CLIENT_ID,
	clientSecret:process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri:process.env.SPOTIFY_REDIRECT_URI
});


const scopes = ['playlist-modify-private','playlist-modify-public','playlist-read-private'];

router.get('/login', (req, res) => {
	const authUrl = spotifyApi.createAuthorizeURL(scopes, '');
	res.redirect(authUrl);
});

router.get('/handleauth', (req, res) => {
	if (req.query) {
		const code = req.query.code;
		spotifyApi.authorizationCodeGrant(code).then(async({ body: { access_token, refresh_token } }) => {

			spotifyApi.setAccessToken(access_token);
		  spotifyApi.setRefreshToken(refresh_token);

	    const { body: { displayName, id, images: [{ url }] } } = await spotifyApi.getMe();
	    
	    User.findOrCreate({
	    	where: {
	    		spotifyId: id
	    	},
	    	defaults: {
	    		displayName,
	    		displayPhoto: url,
	    	}
	    }).spread(({ displayName, displayPhoto, id }, created) => {
	    	const authToken = jwtSimple.encode({ id }, process.env.AUTH_TOKEN_SECRET);
	    	const data = JSON.stringify({ authToken, displayName, displayPhoto });
	    	const handleAuthPage = handleAuthCompiler({ data });
	    	
	    	res.sendFile(handleAuthPage);
		  }).catch(error => {
		  	console.log(`There was an error: ${error}`);
		  	res.set('Content-Type', 'text/html');
		  	res.send(handleauthFailureHTML);
		  });
		}).catch(error=> {
			console.log(`There was an error: ${error}`);
		  res.set('Content-Type', 'text/html');
		  res.send(handleauthFailureHTML);
		});
	}else{
		console.log('error setting query');
		res.set('Content-Type', 'text/html');
		res.send(handleauthFailureHTML);
	}
});

router.get('/check',(req, res) => {
	var loggedIn = req.session.checkToken(req.headers.authtoken);
	console.log(req.headers.authtoken);
	console.log('loggedIn',loggedIn);
	var resp = loggedIn?{toList:votingService.toList,fromList:req.session.getFromList()}:false;
	console.log(resp);
	res.send(resp);
});

router.get('/logout',function(req,res){
	spotifyApi.resetAccessToken();
	spotifyApi.resetRefreshToken();
	req.session.clearToken();
	res.send({message:'logged out!'});
})

module.exports = router;