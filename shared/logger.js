const isTest = process.env.NODE_ENV === 'test';

if (isTest) {
  module.exports = exports = require('./logger.browser');
} else {
  module.exports = exports = require('./logger.terminal');
}

