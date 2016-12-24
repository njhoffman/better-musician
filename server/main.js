const express = require('express');
const debug = require('debug')('app:server        ');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const project = require('../config/project.config');
const compress = require('compression');
const morgan = require('morgan');
const httpProxy = require('http-proxy');
const http = require('http');

const writeMorgan = require('../server.morgan.js').writeMorgan;
const bodyOutput = require("../server.morgan.js").bodyOutput;

const app = express();
const server = new http.Server(app);

const targetUrl = 'http://localhost:3001';
const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: true
});


// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(require('connect-history-api-fallback')());

// Apply gzip compression
// turned off as it squashes eventsource messages
// app.use(compress());


const webpackDebug = require('debug')('app:server:webpack');
const webpackLog = function (message) {
  // message = message.split('\n').map( function (line) { return webpackDebug(line); }).join('\n');
  if (message.indexOf('\n') !== -1) {
    message = "\n\n" + message + "\n\n";
  }
  return webpackDebug(message);
};

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(bodyOutput('app:request       '));
  app.use(morgan(writeMorgan('app:request       ')));

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



module.exports = app;
