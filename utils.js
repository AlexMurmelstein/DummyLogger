const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const dailyRotateTransport = new winston.transports.DailyRotateFile({
  level: 'silly',
  filename: 'log/Days/%DATE%.log',
  //Not working:
  // frequency: '2m',
  datePattern: 'YYYY-MM-DD-HH-mm',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

dailyRotateTransport.on('rotate', function (oldFilename, newFilename) {
  console.log('Old File: ', oldFilename, 'New File: ', newFilename);
});

const logger = winston.createLogger({
  level: 'silly',
  // format: winston.format.simple(),
  format: winston.format.combine(
    winston.format.label({
      label: `Label`,
    }),
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf(
      //The info.{objectName} can be seen in the console, for some reason doesn't work with origin
      info =>
        `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}:${
          info.meta.req.headers.host
        }: ${info.meta.res.statusCode}`
    )
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //Old one, no rotation
    new winston.transports.File({
      filename: 'log/combinedAll.log',
      level: 'silly',
    }),
    //New one, set above with rotation
    dailyRotateTransport,
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
