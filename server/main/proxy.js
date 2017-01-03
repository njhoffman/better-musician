const http = require('http');
const httpProxy = require('http-proxy');
const proxyRequestDebug  = require('debug')('app:request:proxy');
const project = require('../../config/project.config');
const requestOutput = require('../server.utils').requestOutput;
const responseOutput = require('../server.utils').responseOutput;
// const proxyResponseDebug = require('debug')('app:response:proxy');
const proxyResponseDebug = proxyRequestDebug;

module.exports = function (app) {
  // Proxy to API server
  const server = new http.Server(app);
  const targetUrl = 'http://' + project.api_host + ':' + project.api_port;
  const proxy = httpProxy.createProxyServer({
      target: targetUrl,
      ws: false
  });
  app.use('/api', (req, res)               => { proxy.web(req, res, {target: targetUrl}); });
  app.use('/ws', (req, res)                => { proxy.web(req, res, {target: targetUrl + '/ws'}); });
  server.on('upgrade', (req, socket, head) => { proxy.ws(req, socket, head); });

  proxy.on('proxyReq', function(proxyReq, req, res, options) {
    // proxyReq.setHeader('Content-Type', 'application/json');
    // proxyReq.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    return requestOutput(proxyRequestDebug)(req, res);
  });

  proxy.on('proxyRes', function(proxyRes, req, res, options) {
    // forward cookie set from proxy
    if (proxyRes.headers['set-cookie']) {
      res.header['Set-Cookie'] = proxyRes.headers['set-cookie'];
    }
    return responseOutput(proxyResponseDebug)(req, proxyRes);
  });

  // added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
  proxy.on('error', (error, req, res) => {
    const json = {error: 'proxy_error', reason: error.message};
    if (error.code !== 'ECONNRESET') {
      proxyResponseDebug("PROXY ERROR");
      proxyResponseDebug(error);
    }
    if (!res.headersSent) {
      res.writeHead(500, {'content-type': 'application/json'});
    }
    res.end(JSON.stringify(json));
  });
}
