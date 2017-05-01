import express from 'express';
import webpack from 'webpack';
// import compress from 'compression';
import morgan from 'morgan';
import StatsD from 'node-statsd';
import memwatch from 'memwatch-next';

import { morganOutput, requestOutput, webpackLog } from './server.utils';
import setupProxy from './proxy';
import webpackConfig from '../config/webpack.config';
import project from '../config/project.config';
import configDebug from 'debugger-256';
import { humanMemorySize } from '../shared/util';

// TODO: make logger for happypack

const { info, log, warn, error } = configDebug('app:server');

const sdc = new StatsD();
sdc.increment('app_start');

process.on('uncaughtException', (err) => {
  sdc.increment('app_uncaught_exception');
  error('\n\n');
  error('*** UNCAUGHT EXCEPTION ***');
  console.error(err);
  error('*** UNCAUGHT EXCEPTION ***');
  error('\n\n');
});

process.on('unhandledRejection', (err) => {
  sdc.increment('app_unhandled_rejection');
  error('\n\n');
  error('*** UNHANDLED REJECTION ***');
  console.error(err);
  error('*** UNHANDLED REJECTION ***');
  error('\n\n');
});

memwatch.on('stats', (stats) => {
  // current_base, num_full_gc, num_inc_gc, heap_compactions, estimated_base, current_base, min, max, usage_trend
  log(`GC (#${stats.num_full_gc}/${stats.num_inc_gc}): \
      ${humanMemorySize(stats.current_base, true)} (Current) \
      ${humanMemorySize(stats.estimated_base, true)} (Estimated) \
      Usage: ${stats.usage_trend}`);
});

memwatch.on('leak', (info) => {
  warn('Memory Leak', info);
});

const app = express();
setupProxy(app);

// Rewrites all routes requests to the root /index.html file (ignoring file requests).
// Remove this middleware if universal rendering is desired
app.use(require('connect-history-api-fallback')());

// Apply gzip compression
// turned off as it squashes eventsource messages
// app.use(compress());

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(requestOutput);
  app.use(morgan(morganOutput));

  info('Enabling webpack dev and HMR middleware');
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    log         : webpackLog,
    stats       : project.compiler_stats,
    watchOptions : {
      aggregateTimeout: 300,
      poll: 300
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    log: webpackLog,
    heartbeat: 3 * 1000
  }));

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()));
} else {
  info(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()));
}

// error handling
app.use(function (err, req, res, next) {
  sdc.increment('app_error');
  error('\n\n*** ERROR ***');
  console.error(err);
  error('*** ERROR ***\n\n');
  res.status(err.status ? err.status : 500).send(err.message);
});

module.exports = app;
