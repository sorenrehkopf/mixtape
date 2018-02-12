const bodyParser = require('body-parser');
const cors = require('cors');
const dotEnv = require('dotenv');
const express = require('express');

const app = express();

// load environment variables from .env file
dotEnv.load();

// apply middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const authController = require('./controllers/auth.js');
// const spotifyController = require('./controllers/spotify.js');

app.use('/api/auth', authController);

app.listen(3000, () => {
	console.log('app listening on port 3000');
});
