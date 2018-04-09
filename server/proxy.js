const http = require('http');
const httpProxy = require('http-proxy');
const project = require('../config/project.config');
const requestOutput = require('./server.utils').proxyRequestOutput;
const responseOutput = require('./server.utils').proxyResponseOutput;

// const { error } = require('debugger-256')('app:response:proxy');

module.exports = function (app) {
  // Proxy to API server
  const server = new http.Server(app);
  const targetUrl = 'http://' + project.api_host + ':' + project.api_port;
  const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: false
  });
  /* eslint-disable no-multi-spaces */
  app.use('/api', (req, res)               => { proxy.web(req, res, { target: targetUrl }); });
  app.use('/ws', (req, res)                => { proxy.web(req, res, { target: targetUrl + '/ws' }); });
  server.on('upgrade', (req, socket, head) => { proxy.ws(req, socket, head); });
  /* eslint-enable no-multi-spaces */

  proxy.on('proxyReq', (proxyReq, req, res, options) => {
    // proxyReq.setHeader('Content-Type', 'application/json');
    // proxyReq.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    return requestOutput(req, res);
  });

  proxy.on('proxyRes', (proxyRes, req, res, options) => {
    // forward cookie set from proxy
    if (proxyRes.headers['set-cookie']) {
      res.header['Set-Cookie'] = proxyRes.headers['set-cookie'];
    }
    return responseOutput(req, proxyRes, res);
  });

  // added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
  proxy.on('error', (err, req, res) => {
    const json = { error: 'proxy_error', reason: err.message };
    if (err.code !== 'ECONNRESET') {
      console.error('PROXY ERROR');
      console.error(err);
    }
    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json' });
    }
    res.end(JSON.stringify(json));
  });
};
