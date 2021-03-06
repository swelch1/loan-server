const winston = require('winston');
const { format } = winston;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({format: format.simple()}),
    new winston.transports.File({ filename: 'error.log', level: 'error', format: format.combine(format.timestamp(), format.json()) }),
  ],
});

module.exports = {logger}