const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const project = require('../config/project.config');
const compress = require('compression');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const setupProxy = require('./proxy');

const morganOutput = require('./server.utils').morganOutput;
const requestOutput = require('./server.utils').requestOutput;
const webpackLog = require('./server.utils').webpackLog;

const debug              = require('debug')('app:server');
const requestDebug       = require('debug')('app:request');
const responseDebug      = require('debug')('app:response');
const webpackDebug       = require('debug')('app:server:webpack');

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
if (true || project.env === 'development') {
  const compiler = webpack(webpackConfig);

  // app.use(requestOutput(requestDebug));
  // app.use(morgan(morganOutput(responseDebug)));

  debug('Enabling webpack dev and HMR middleware');
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
  debug(
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
    debug("\n\n*** ERROR ***");
    console.error(err);
    debug("*** ERROR ***\n\n");
    res.status(err.status ? err.status : 500).send(err.message)
});


module.exports = app;
