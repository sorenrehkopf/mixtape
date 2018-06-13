const logger = require('../../services/logger.js');

const requestLogger = (req, res, next) => {
	const { user, path, method } = req;

	if (path.startsWith('/api')) {
		logger.info(`Handling request to route "${path}"`, {
			path,
			method,
			userId: user && user.id,
			userName: user && user.displayName
		});
	}

	next();
};

module.exports = requestLogger;