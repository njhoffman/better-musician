const isNodeJS = process.env.NODE;

if (isNodeJS) {
  module.exports = exports = require('./logger.terminal');
} else {
  module.exports = exports = require('./logger.browser');
}

