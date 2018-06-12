const logger = require('../../services/logger.js');

const requestLogger = (req, res, next) => {
	const { user, path } = req;

	logger.info(`Handling request to route "${path}"`, {
		path,
		userId: user && user.id,
		userName: user && user.displayName
	});

	next();
};

module.exports = requestLogger;