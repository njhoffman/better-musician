const _ = require('lodash');
const StatsD = require('node-statsd');
const memwatch = require('memwatch-next');
const { humanMemorySize, isJson, padLeft, padRight } = require('../shared/util');
const configDebug = require('debugger-256');

const sdc = new StatsD();

const getMethodTag = (method) =>
  method === 'POST' || method === 'PUT' ? 'Post'
    : method === 'GET' ? 'Get'
    : method === 'DELETE' ? 'Delete'
    : 'Other';

const getStatusTag = (status) =>
  status >= 500
    ? 'Error' : status >= 400
    ? 'Warn' : status >= 300
    ? 'Info' : 'Ok';

const requestDebug  = configDebug('app:request');
const requestOutput = (req, res, next) => {
  const { log, info, trace } = requestDebug;
  const method = '>>> ' + req.method;
  const methodColorTag = 'request' + getMethodTag(req.method);
  const url = req.path;
  const body = req.body || {};
  const query = req.body || {};

  log(padRight('%' + method + '% %' + url + '%', 50),
    { color: methodColorTag },
    { color: 'requestUrl' });

  trace('Headers', _.omit(req.headers, 'cookie'));
  if (req.session) { trace('Session', req.sesion); }
  if (req.cookies) { trace('Cookies', req.cookies); }
  if (req.locals) { trace('Locals ', req.locals); }
  if (Object.keys(query).length > 0) { info('Query', query); }

  if (Object.keys(body).length > 0) {
    if (isJson(body)) {
      info('Body', JSON.parse(body));
    } else {
      info('Body', body);
    }
  }
  sdc.increment('app_request');
  if (next) { next(); }
};

const proxyRequestDebug  = configDebug('app:proxy:request');
const proxyRequestOutput = (req, res, next) => {
  const { log, info, trace } = proxyRequestDebug;
  const method = '>>> ' + req.method;
  const methodColorTag = 'request' + getMethodTag(req.method);
  const url = req.path;
  const body = req.body || {};
  const query = req.body || {};

  log(padRight('%' + method + '% %' + url + '%', 50),
    { color: methodColorTag },
    { color: 'requestUrl' });

  trace('Headers', _.omit(req.headers, 'cookie'));
  if (req.session) { trace('Session', req.sesion); }
  if (req.cookies) { trace('Cookies', req.cookies); }
  if (req.locals) { trace('Locals ', req.locals); }
  if (Object.keys(query).length > 0) { info('Query', query); }

  if (Object.keys(body).length > 0) {
    if (isJson(body)) {
      info('Body', JSON.parse(body));
    } else {
      info('Body', body);
    }
  }
  sdc.increment('app_proxy_request');
  if (next) { next(); }
};

const proxyResponseDebug  = configDebug('app:proxy:response');
const proxyResponseOutput = (req, proxyRes, res) => {
  const { log, info, trace } = proxyResponseDebug;
  const status = proxyRes.statusCode;
  const statusColorTag = 'requestStatus' + getStatusTag(status);
  const method = '<<< ' + req.method;
  const methodColorTag = 'response' + getMethodTag(req.method);

  let body = [];
  proxyRes.on('data', (chunk) => {
    body += chunk;
  });
  proxyRes.on('end', (chunk) => {
    if (chunk) {
      body += chunk;
    }
    if (isJson(body)) {
      info('Proxy Body Response', JSON.parse(body));
    } else {
      // trace('Proxy non-Json Response', body);
    }
  });

  const contentLength =  proxyRes['_contentLength'] ? proxyRes['_contentLength'] + ' Bytes' : '-';
  const responseTime = '';
  const url = req.path;

  log(
    padRight('%' + method + '% %' + url, 50) + '%' +
    ' %' + status + '% ' +
    padLeft(responseTime + ' ms', 8) +
    ' - ' + contentLength,
    { color: methodColorTag },
    { color: 'requestUrl' },
    { color: statusColorTag }
  );

  trace('Headers', _.omit((proxyRes.headers ? proxyRes.headers : req.headers), 'cookie'));
  if (proxyRes.locals) { trace(proxyRes.locals); }
};

const responseDebug = configDebug('app:response');
const morganOutput = (tokens, req, res, next) => {
  const { log, info, trace } = responseDebug;

  let body = [];
  res.on('data', (chunk) => {
    body += chunk;
    if (isJson(body)) {
      info('Body', JSON.parse(body));
    }
  });

  const status = tokens.status(req, res);
  const statusColorTag = 'requestStatus' + getStatusTag(status);
  const method = '<<< ' + tokens.method(req, res);
  const methodColorTag = 'response' + getMethodTag(req.method);

  const contentLength =  res['_contentLength'] ? res['_contentLength'] + ' Bytes' : '-';
  const responseTime = tokens['response-time'](req, res);
  const url = req.path;

  log(
    padRight('%' + method + '% %' + url, 50) + '%' +
    ' %' + status + '% ' +
    padLeft(responseTime + ' ms', 8) +
    ' - ' + contentLength,
    { color: methodColorTag },
    { color: 'requestUrl' },
    { color: statusColorTag }
  );
  trace('Headers', _.omit((res.headers ? res.headers : req.headers), 'cookie'));
  if (req.session) { trace('Session', req.session); }
  if (res.locals && Object.keys(res.locals).length > 0) { trace(res.locals); }
};

let initialBuild = true;
let hd = new memwatch.HeapDiff();
const webpackDebug = configDebug('app:webpack');
const webpackLog = (message) => {
  webpackDebug.info(message);
  if (/Compiled successfully/.test(message)) {
    const memoryMap = {
      heapTotal: 'Heap Total:',
      heapUsed: 'Heap Used:',
      rss: 'RSS:\t',
      external: 'External:'
    };
    Object.keys(memoryMap).forEach(memoryKey => {
      const memoryAmount = process.memoryUsage()[memoryKey]
        ? humanMemorySize(process.memoryUsage()[memoryKey], true) : false;
      if (memoryAmount) {
        webpackDebug.info(`%${memoryMap[memoryKey]}%\t% ${memoryAmount} %`,
          { color: 'webpackMemoryLabel' },
          { color: 'webpackMemoryValue' });
        sdc.gauge(`app_memory_${memoryKey}`, memoryAmount);
      }
    });

    // heapDiff
    const heapDiff = hd.end();
    webpackDebug.info(`%Heap Diff:%\t %${heapDiff.change.size}%   ` +
      `(${heapDiff.before.size} - ${heapDiff.after.size})   ` +
      `(Nodes Added: ${parseInt(heapDiff.change.allocated_nodes) - parseInt(heapDiff.change.freed_nodes)})`,
      { color: 'webpackMemoryLabel' },
      { color: 'webpackMemoryValue' });

    // don't show heap objects under 100kb
    const heapObjs = heapDiff.change.details
      .filter(ho => parseInt(ho.size_bytes) > 102400)
      .sort((a, b) => (parseInt(b.size_bytes) - parseInt(a.size_bytes)));

    let maxClassLength =  heapObjs.reduce((acc,curr) =>
        curr.what.length > acc ? curr.what.length : acc, 0);

    heapObjs.forEach((diffItem, i) => {
      // what, size_bytes, size, +, -
      const spaces = Array(maxClassLength + 1 - diffItem.what.length).join(' ');
      webpackDebug.trace(`\t   ${diffItem.what} ${spaces} %${diffItem.size}%`,
         { color: 'webpackDetailMemoryValue' });
    });
    hd = new memwatch.HeapDiff();
  } else if (/webpack built \w+ in (\d+)ms/.test(message)) {
    if (initialBuild) {
      sdc.gauge('app_webpack_initial_build', RegExp.$1);
      initialBuild = false;
    } else {
      sdc.gauge('app_webpack_rebuild', RegExp.$1);
    }
  }
};

module.exports = {
  proxyResponseOutput,
  proxyRequestOutput,
  requestOutput,
  morganOutput,
  webpackLog

};

