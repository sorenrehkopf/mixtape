const bodyParser = require('body-parser');
const cors = require('cors');
const dotEnv = require('dotenv');
const express = require('express');
// const http = require('http');
// initialize app and server;
const app = express();
// const server = http.Server(app);
// load environment variables from .env file
dotEnv.load();
// apply middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.listen(3000, () => {
	console.log('app listening on port 3000');
});
