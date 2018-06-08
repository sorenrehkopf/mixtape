#!/usr/bin/env node

const bodyParser = require('body-parser');
const cors = require('cors');
const dotEnv = require('dotenv');
const express = require('express');
const authenticate = require('./middleware/auth/index.js');

const app = express();

// load environment variables from .env file
dotEnv.load();

const corsOptions = process.env.NODE_ENV === 'production' ? { 
	origin: 'https://www.myxtape.io',
	optionsSuccessStatus: 200
} : {
	origin: 'https://www.myxtape-dev.io',
	optionsSuccessStatus: 200
};

// apply middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static('public'));

app.use(authenticate);

const authController = require('./controllers/auth.js');
const playlistsController = require('./controllers/playlists.js');
const userController = require('./controllers/user.js');
const spotifyController = require('./controllers/spotify.js');
const songsController = require('./controllers/songs.js');


app.use('/api/auth', authController);
app.use('/api/playlists', playlistsController);
app.use('/api/user', userController);
app.use('/api/spotify', spotifyController);
app.use('/api/songs', songsController);

app.listen(process.env.PORT || 3000, () => {
	console.log(`app listening on port ${process.env.PORT || '3000'}`);
});
