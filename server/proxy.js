const http = require('http');
const httpProxy = require('http-proxy');

module.exports = ({ config, app, logger, requestLog }) => {
  // Proxy to API server
  logger = logger.child({ subsystem: 'app:proxy' });
  const server = new http.Server(app);
  const targetUrl = `http://${config.api.host}:${config.api.port}`;
  const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: false
  });
  app.use('/api', (req, res) => { proxy.web(req, res, { target: targetUrl }); });
  app.use('/ws', (req, res) => { proxy.web(req, res, { target: targetUrl + '/ws' }); });
  server.on('upgrade', (req, socket, head) => { proxy.ws(req, socket, head); });

  proxy.on('proxyReq', (proxyReq, req, res, options) => {
    // proxyReq.setHeader('Content-Type', 'application/json');
    // proxyReq.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    req._isProxy = true;
    return requestLog(req, res);
  });

  proxy.on('proxyRes', (proxyRes, req, res, options) => {
    // forward cookie set from proxy
    if (proxyRes.headers['set-cookie']) {
      res.header['Set-Cookie'] = proxyRes.headers['set-cookie'];
    }
  });

  proxy.on('error', (err, req, res) => {
    const json = { error: 'proxy_error', reason: err.message };
    if (err.code !== 'ECONNRESET') {
      logger.error((err.code === 'ECONNREFUSED' ? {} : err),
        `${err.code}: ${err.message} trying to process: ${req.method} ${req.url}`);
    }
    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json' });
    }
    res.end(JSON.stringify(json));
  });
};
