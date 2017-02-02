const chalk = require("chalk");
const util = require("util");
const _ = require('lodash');
const configDebug = require('./server.debug');

const verbosity = 9;

function padLeft(str, len) {
  return len > str.length
    ? (new Array(len - str.length + 1)).join(' ') + str
    : str
}
function padRight(str, len) {
  return len > str.length
    ? str + (new Array(len - str.length + 1)).join(' ')
    : str
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch(e) {
    return false;
  }
  return true;
}

const requestDebug  = configDebug('app:request');
const requestOutput = (req, res, next) => {
  const { log, info, trace } = requestDebug;
  const method = ">>> " + req.method;
  const methodColorTag = 'request' +
    (req.method === 'POST' || req.method === 'PUT' ?  'Post'
      : req.method === 'GET' ? 'Get'
      : req.method === 'DELETE' ? 'Delete'
      :  'Other');

  const url = req.path;
  const body = req.body || {};
  const query = req.body || {};

  log(padRight('%' + method + '% %' + url + '%', 50),
    { color: methodColorTag },
    { color: 'requestUrl' });

  trace('Headers', _.omit(req.headers, 'cookie'));
  if (req.session) { trace('Session', req.sesion); }
  if (req.cookies) { trace('COokies', req.cookies); }

  if (req.locals && Object.keys(req.locals).length > 0) {
    trace("Locals ", req.locals);
  }
  if (Object.keys(body).length > 0) {
    if (isJson(body)) { info('Body', JSON.parse(body)); }
    else { info('Body', body); }
  }
  if (Object.keys(query).length > 0) { info("Query", query); }
  if (next) { next(); }
};

const proxyRequestDebug  = configDebug('app:proxy:request');
const proxyRequestOutput = (req, res, next) => {
  const { log, info, trace } = proxyRequestDebug;
  const method = ">>> " + req.method;
  const methodColorTag = 'request' +
    (req.method === 'POST' || req.method === 'PUT' ?  'Post'
      : req.method === 'GET' ? 'Get'
      : req.method === 'DELETE' ? 'Delete'
      :  'Other');
  const url = req.path;
  const body = req.body || {};
  const query = req.body || {};

  log(padRight('%' + method + '% %' + url + '%', 50),
    { color: methodColorTag },
    { color: 'requestUrl' });


  trace('Headers', _.omit(req.headers, 'cookie'));
  if (req.session) { trace('Session', req.sesion); }
  if (req.cookies) { trace('COokies', req.cookies); }
  if (req.locals) { trace("Locals ", req.locals); }

  if (Object.keys(body).length > 0) {
    if (isJson(body)) { info('Body', JSON.parse(body)); }
    else { info('Body', body); }
  }
  if (Object.keys(query).length > 0) { info("Query", query); }
  if (next) { next(); }
};


const proxyResponseDebug  = configDebug('app:proxy:response');
const proxyResponseOutput = (req, proxyRes, res) => {
  const { log, info, trace } = proxyResponseDebug;
  const status = proxyRes.statusCode;
  const statusColorTag = 'requestStatus' +
    (status >= 500
    ? 'Error' : status >= 400
    ? 'Warn' : status >= 300
    ? 'Info' : 'Ok');
  const method = "<<< " + req.method;
  const methodColorTag = 'request' +
    (req.method === 'POST' || req.method === 'PUT' ?  'Post'
      : req.method === 'GET' ? 'Get'
      : req.method === 'DELETE' ? 'Delete'
      :  'Other');


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
  const responseTime = "";
  const url = req.path;

  log(
    padRight('%' + method + '% %' + url, 50) + '%'
    + ' %' + status + '% '
    + padLeft(responseTime + ' ms', 8)
    + ' - '
    + contentLength,
    { color: methodColorTag },
    { color: 'requestUrl' },
    { color: statusColorTag }
  );

  trace('Headers', _.omit((proxyRes.headers ? proxyRes.headers : req.headers), 'cookie') );
  if (proxyRes.locals) { trace(proxyRes.locals); }

}

const responseDebug = configDebug('app:response');
const morganOutput = (tokens, req, res, next) => {
  const { log, info, trace } = responseDebug;

  let body = [];
  res.on('data', function(chunk) {
    body += chunk;
    if (isJson(body)) {
      info('Body', JSON.parse(body));
    }
  });

  const status = tokens.status(req, res)
  const statusColorTag = 'requestStatus' +
    (status >= 500
    ? 'Error' : status >= 400
    ? 'Warn' : status >= 300
    ? 'Info' : 'Ok');
  const method = "<<< " + tokens.method(req, res);
  const methodColorTag = 'request' +
    (req.method === 'POST' || req.method === 'PUT' ?  'Post'
      : req.method === 'GET' ? 'Get'
      : req.method === 'DELETE' ? 'Delete'
      :  'Other');


  const contentLength =  res['_contentLength'] ? res['_contentLength'] + ' Bytes' : '-';
  const responseTime = tokens['response-time'](req, res);
  const url = req.path;

  log(
    padRight('%' + method + '% %' + url, 50) + '%'
    + ' %' + status + '% '
    + padLeft(responseTime + ' ms', 8)
    + ' - '
    + contentLength,
    { color: methodColorTag },
    { color: 'requestUrl' },
    { color: statusColorTag }
  );
  trace('Headers', _.omit((res.headers ? res.headers : req.headers), 'cookie') );
  if (req.session) { trace('Session', req.session); }
  if (res.locals && Object.keys(res.locals).length > 0) { trace(res.locals); }
};

module.exports = {
  proxyResponseOutput,
  proxyRequestOutput,
  requestOutput,
  morganOutput

}

