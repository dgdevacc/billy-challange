const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const HttpError = require('./api/lib/utils/http-error');


const app = express(); // initialize Express
require('./api/lib/db'); // initialize DB connection pool
require('./api/lib/utils/set-global-functions')(); // set global functions


/*
  Requests log

  Don't show the log when it's a testing environment
  or it would interfere with the test output.
*/

if (process.env.CONFIG_REQUESTS_LOGGING) {
  app.use(logger('dev')); // 'dev' outputs colored lines by response status
} // TODO: (else) Move them in a file + config option


/*
  CORS Settings (Cross-origin resource sharing Settings)
*/

const whitelist = ['*'];

const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.CONFIG_ANY_CORS_ALLOWED) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1) return callback(null, true);

    return callback(new HttpError('Unauthorized', 'Not allowed by CORS', 401));
  },

  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
};

app.use(cors(corsOptions));


/*
  APP Settings
*/

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/*
  API Routes
*/

app.use('/api', require('./api/routes/apiRoutes'));

app.get('/', (req, res) => res.status(200).send({
  message: 'Hi there, I\'m Billy\'s helper!',
}));


/*
  ERRORS handling
*/

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars, consistent-return
  // If it is an instance of HttpError process it here
  if (err instanceof HttpError) {
    if (err.body) return res.json(err.body);

    return res.status(err.httpStatus).end(err.message);
  }

  // Check if we received an invalid JSON as body
  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).end('The body of your request is not valid JSON', 400);
  }

  // Show the error in console only on local/testing environment
  if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'testing') {
    console.log('Error', err);
  }

  // Else send the 500 code
  return res.sendStatus(500);
});

module.exports = app;
