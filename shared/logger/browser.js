const _ = require('lodash');
const { parseLog } = require('./browser.parser');

// just for reference, defaults are stored in src/config/defaults
const defaultOptions = {
  level: 6, // trace
  expandObjects: true,
  clearOnReload: true,
  logRequests: true,
  logActions: true,
  colors: {
    trace: '#ccffff',
    debug: '#88ffee',
    info:  '#44aabb',
    log :  '#00aa66',
    warn:  '#aa6622',
    error: '#ff0000',
    fatal: '#ff0000',
  },
  subsystems: {
    include: [],
    exclude: [],
    colors: []
  },
  actions: {
    include: [],
    exclude: [],
    colors: []
  }
};
//
const logLevels = ['fatal', 'error', 'warn', 'log', 'info', 'debug', 'trace'];
const getLevelNumber = (name) => (_.isNumber(name) ? name : logLevels.indexOf(name));
// const getLevelName = (number) => (!_.isNumber(number) ? number : logLevels[number]);

const processLog = (level, subsystem, options, inputs) => {
  const levelNum = getLevelNumber(level);
  if (options.level < levelNum) {
    return true;
  }
  const ssColor = `color: ${_.get(options, `colors.${level}`)}`;
  return parseLog(subsystem, ssColor, options, inputs);
};

const init = (subsystem, options = defaultOptions) => ({
  trace : (...inputs) => processLog('trace', subsystem, options, inputs),
  debug : (...inputs) => processLog('debug', subsystem, options, inputs),
  info  : (...inputs) => processLog('info', subsystem, options, inputs),
  log   : (...inputs) => processLog('log', subsystem, options, inputs),
  warn  : (...inputs) => processLog('warn', subsystem, options, inputs),
  error : (...inputs) => processLog('error', subsystem, options, inputs),
  fatal : (...inputs) => processLog('fatal', subsystem, options, inputs)
});

module.exports = {
  init
};

// TODO: Improvements...
// Allow in place colors to be used without arrays
// Handle objects without message printing better
// Handle undefined objects
