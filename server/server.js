const _ = require('lodash');
const webpack = require('webpack');
// TODO: make logger for happypack
// import compress from 'compression';
const StatsD = require('node-statsd');
// const memwatch = require('memwatch-next');
const memwatch = require('node-memwatch');

const express = require('express');
const responseTime = require('response-time');
const addRequestId = require('express-request-id')();
const userAgent = require('express-useragent');

const app = express();
const sdc = new StatsD();
const config = require('../config');
const sharedUtils = require('../shared/util');
const setupProxy = require('./proxy');
const logger = require('../shared/logger')('app:server');
const serverUtils = require('./utils')({ config, logger, sdc, sharedUtils });

process.on('uncaughtException', (err) => serverUtils.appErrorLog('exception', err));
process.on('unhandledRejection', (err) => serverUtils.appErrorLog('rejection', err));

memwatch.on('stats', serverUtils.memwatchStatsLog);
memwatch.on('leak', serverUtils.memwatchLeakLog);

app.use(addRequestId);
app.use(userAgent.express());
app.use(responseTime(serverUtils.responseLog));
app.use(serverUtils.requestLog);
setupProxy({ config, logger, app, sdc });

// Rewrites all routes requests to the root /index.html file (ignoring file requests).
// Remove this middleware if universal rendering is desired
app.use(require('connect-history-api-fallback')());

// Apply gzip compression (turned off as it squashes eventsource messages)
// app.use(compress());

if (config.env === 'development') {
  logger.info('Enabling webpack dev and HMR middleware for development environment');
  const compiler = webpack(config.webpack);
  const webpackLogger = logger.child({ subsystem: 'app:webpack' });

  const devConfig = _.merge(config.middleware.dev, {
    path        : config.webpack.output.path,
    publicPath  : config.webpack.output.publicPath,
    reporter    : serverUtils.webpackReporter,
    logger      : webpackLogger
  });

  // config.middleware.hot.log: process.stdout.write, // webpackLog
  app.use(require('webpack-dev-middleware')(compiler, devConfig));
  app.use(require('webpack-hot-middleware')(compiler, config.middleware.hot));

  // static assets from /public
  app.use(express.static(config.paths.public()));
} else {
  logger.info(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  );
  app.use(express.static(config.paths.dist()));
}

// error handling
app.use((err, req, res, next) => {
  sdc.increment('app_error');
  logger.error(err);
  res.status(err.status ? err.status : 500).send(err.message);
});

sdc.increment('app_start');
module.exports = app;
