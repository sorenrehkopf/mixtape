const bodyParser = require('body-parser');
const cors = require('cors');
const dotEnv = require('dotenv');
const express = require('express');
const authenticate = require('./middleware/auth/index.js');

const app = express();

// load environment variables from .env file
dotEnv.load();

// apply middleware
app.use(bodyParser.json());
app.use(cors());
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

app.get('*', (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(3000, () => {
	console.log('app listening on port 3000');
});
