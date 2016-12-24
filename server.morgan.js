const chalk = require("chalk");

let debug;

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

module.exports.writeMorgan = function(name) {
  if (typeof debug === 'undefined') {
    debug = require("debug")(name);
  }
  const writeMorgan = function (tokens, req, res) {
    const status = tokens.status(req, res)
    const statusColor = status >= 500
        ? 'red' : status >= 400
        ? 'yellow' : status >= 300
        ? 'cyan' : 'green'
    const method = "<= " + tokens.method(req, res);
    const methodColor = (method === 'POST' || method === 'PUT')
      ? 'blue' : method === 'DELETE'
      ? 'red' : 'green';


    const contentLength =  res['_contentLength'] ? res['_contentLength'] + ' Bytes' : '-';
    const url = req.path;

    return debug(chalk.reset(padRight(chalk[methodColor](method) + ' ' + url, 50))
        + ' ' + chalk[statusColor](status)
        + ' ' + chalk.reset(padLeft(tokens['response-time'](req, res) + ' ms', 8))
        + ' ' + chalk.reset('-')
        + ' ' + chalk.reset(contentLength));
  };

  return writeMorgan;
};


module.exports.bodyOutput = function(name) {
  return function(req, res, next) {
    if (typeof debug === 'undefined') {
      debug = require("debug")(name);
    }
    const method = "=> " + req.method;
    const methodColor = (method === 'POST' || method === 'PUT')
      ? 'blue' : method === 'DELETE'
      ? 'red' : 'green';

    const url = req.path;
    const data = {};
    if (req.body && Object.keys(req.body).length > 0) {
      data.body = req.body;
    }
    if (req.query && Object.keys(req.query).length > 0) {
      data.query = req.query;
    }
    // empty object has a string length of 2
    const bodySize = JSON.stringify(data).length > 2 ?
     JSON.stringify(data).length + " Bytes in Body/Query" : "";

    const contentType = req.get("content-type");
    const accept = req.get("accept") || ""
    const acceptEncoding = req.get("accept-encoding") || "";
    const userAgent = req.get("user-agent") || "";
    const referer = req.get("referer") || "";

    debug(padRight(chalk[methodColor](method) + ' ' + url, 50) + " " + bodySize);
    // header information, usually too verbose
    if (false) {
      debug("\t"
        + (contentType ? " ContentType: " + contentType : "")
        + (accept ? " Accept: " + accept : "")
        + (acceptEncoding ? " Accept Encoding: " + acceptEncoding : "")
        + (userAgent ? " User-Agent: " + userAgent : "")
        + (referer ? " Referer: " + referer : ""));
    }

    if (data.query || data.body) {
      debug("%O", data);
    }
    next();
  };
};
