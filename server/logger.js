/* eslint-disable */
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const moment = require('moment');
function timeStampFormat() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ')
}
function timeStampFormat2() {
  return moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ')
}
const logger = winston.createLogger({
  transports: [
    new (winstonDaily)({
      name: 'info-file',
      filename: './logs/app',
      datePattern: '_yyyy-MM-dd.log',
      colorize: false,
      maxsize: 50000000,
      maxFiles: 1000,
      level: 'info',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    }),
    new (winston.transports.Console)({
      name: 'debug-console',
      colorize: true,
      level: 'debug',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    })
  ],
  exceptionHandlers: [
    new (winstonDaily)({
      name: 'exception-file',
      filename: './logs/app-exception',
      datePattern: '_yyyy-MM-dd.log',
      colorize: false,
      maxsize: 50000000,
      maxFiles: 1000,
      level: 'error',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    }),
    new (winston.transports.Console)({
      name: 'exception-console',
      colorize: true,
      level: 'debug',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    })
  ]
});
const slog = winston.createLogger({
  transports: [
    new (winstonDaily)({
      name: 'info-file',
      filename: './logs/slog',
      datePattern: '_yyyy-MM-dd.log',
      colorize: false,
      maxsize: 50000000,
      maxFiles: 1000,
      level: 'info',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat2
    }),
    new (winston.transports.Console)({
      name: 'debug-console',
      colorize: true,
      level: 'debug',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat2
    })
  ],
  exceptionHandlers: [
    new (winstonDaily)({
      name: 'exception-file',
      filename: './logs/slog-exception',
      datePattern: '_yyyy-MM-dd.log',
      colorize: false,
      maxsize: 50000000,
      maxFiles: 1000,
      level: 'error',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat2
    }),
    new (winston.transports.Console)({
      name: 'exception-console',
      colorize: true,
      level: 'debug',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat2
    })
  ]
});
module.exports = {
  logger: logger,
  slog: slog
}
