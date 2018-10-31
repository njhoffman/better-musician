const isNodeJS = process.env.NODE;
const browserLogger = require('./browser');
const terminalLogger = require('./terminal');

if (isNodeJS) {
  module.exports = terminalLogger;
} else {
  module.exports = browserLogger;
}
