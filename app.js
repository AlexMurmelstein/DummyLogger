//Used primarily expressWinston example from here:
//https://www.loggly.com/ultimate-guide/node-logging-basics/

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils.js');
const expressWinston = require('express-winston');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressWinston.logger(logger));

// logger.error(new Error('Something went wrong'));
// logger.info('Hi ho hee');
// logger.warn('warn');
// logger.debug('debug');

//Error handling: add from https://sematext.com/blog/node-js-logging/

app.get('/', (req, res) => {
  res.send('Hello World!');
  // logger.info(`Server Sent A Hello World in URL:${req.url}`);
});

app.get('/users', (req, res) => {
  res.send(
    '<html><head><title>2</title></head><body><form action="/users" method="POST"><input type="text" name="msg"><button type="submit">SEND</button></form></body></html>'
  );
  // logger.silly(`Hi there again from URL: ${req.url}`);
});

app.post('/users', (req, res) => {
  const a = req.body.msg;
  res.send(`${a}`);
});

app.listen(3000, () => {
  console.log('Up and running at 3000!');
});

//Test test!
