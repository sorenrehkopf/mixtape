const logger = require('../../services/logger.js');

const requestLogger = (req, res, next) => {
	const { user: { id: userId, displayName: userName }, path } = req;

	logger.info(`Handling request to route "${path}"`, {
		path,
		userId,
		userName
	});

	next();
};

module.exports = requestLogger;