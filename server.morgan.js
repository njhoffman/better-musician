const chalk = require("chalk");
const debug = require('debug')('api:request');


module.exports = function(name) {
  const debug = require('debug')(name);
  const writeMorgan = function (tokens, req, res) {
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
    const status = tokens.status(req, res)
    const statusColor = status >= 500
        ? 'red' : status >= 400
        ? 'yellow' : status >= 300
        ? 'cyan' : 'green'
    const contentLength = tokens['content-length'] ? tokens['content-length'](req, res) : '-';

    return debug(chalk.reset(padRight(tokens.method(req, res) + ' ' + tokens.url(req, res), 50))
        + ' ' + chalk[statusColor](status)
        + ' ' + chalk.reset(padLeft(tokens['response-time'](req, res) + ' ms', 8))
        + ' ' + chalk.reset('-')
        + ' ' + chalk.reset(contentLength));
  };

  return writeMorgan;
};
