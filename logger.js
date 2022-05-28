const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

const full = new transports.DailyRotateFile({
	filename: './logs/app-full_%DATE%.log',

	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '21d'
});

const error = new transports.DailyRotateFile({
	filename: './logs/app-error_%DATE%.log',
	level: 'error',

	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '21d'
});

module.exports.log = createLogger({
	format: format.combine(
		format.timestamp(),
		format.json(),
	),
 	transports: [
 		full,
 		error,
	]
});