const browser = process.env.NODE_ENV === 'test' ? false : true;

if (browser) {
  module.exports = exports = require('./logger.browser');
} else {
  module.exports = exports = require('./logger.terminal');
}

