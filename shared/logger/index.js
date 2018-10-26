const isNodeJS = process.env.NODE;

if (isNodeJS) {
  module.exports = exports = require('./terminal');
} else {
  module.exports = exports = require('./browser');
}
