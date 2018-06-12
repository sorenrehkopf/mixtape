const winston = require('winston');
const logsene = require('winston-logsene');

class ConsoleLogger {
	static info(...data) {
		console.log(...data);
	}

	static error(...data) {
		console.error(...data);
	}

	static warn(...data) {
		console.warn(...data);
	}

	static debug(...data) {
		console.debug(...data);
	}
};

const logger = process.env.NODE_ENV == 'production' ? new winston.Logger() : ConsoleLogger;

if (process.env.NODE_ENV == 'production') {
	logger.add(logsene, {
		token: process.env.LOGSENE_LOGGING_TOKEN,
		type: process.env.NODE_ENV,
		url: 'https://logsene-receiver.sematext.com/_bulk'
	});
}

module.exports = logger;