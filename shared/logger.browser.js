const pjson = require('prettyjson-256');
const _ = require('lodash');
const { padRight } = require('./util');

const beautifiers = require('./logger.browser.beautifiers');

//  console.log('%cBlue! %cRed!', 'color: blue;', 'color: red;');
const results = pjson.init({ browser: true, showEmpty: false });
const consoleLog = console.log;
const subsystems = ['hot-module'];
const lineLimit = 150;

const ignoredActions = [
  '@@redux-form/BLUR', '@@redux-form/CHANGE', '@@redux-form/FOCUS'
];
const parse = (subsystem, style, messages) => {
  subsystems.indexOf(subsystem) === -1 && subsystems.push(subsystem);
  const ssLength = 6 + _.maxBy(subsystems, (ss) => ss.length).length - subsystem.length;

  let toProcess = messages;
  if (_.isArray(messages)) {
    const lastKey = _.isObject(_.last(messages)) && _.keys(_.last(messages)).length === 1
      ? _.keys(_.last(messages))[0] : false;
    if (lastKey && _.has(beautifiers, lastKey)) {
      const pretty = beautifiers[lastKey](messages.pop()[lastKey]);
      toProcess = _.isArray(pretty) && _.isArray(pretty[0]) ? pretty : [pretty];
    } else {
      toProcess = messages.filter(msg => !_.isUndefined(msg));
    }
  }

  const logMessages = [];
  [].concat(toProcess).filter(msg => !_.isEmpty(msg)).forEach((msg, i) => {
    let rendered = [];
    if (_.isArray(msg) && msg[0].split('%c').length === msg.length) {
      // if has own color code formatting, don't send it through json parser
      const tmp = pjson.render(msg.shift());
      rendered.push([tmp[0], tmp[1][0]].concat(msg));
    } else {
      // parser returns rendered messages in first array, colors in second
      const indent = i > 0 ? ssLength + subsystem.length + ((i + 1) * 3) : 0;
      rendered = pjson.render(msg, indent);
      rendered = _.zip(rendered[0], rendered[1]);
    }

    // add subsystem to first line
    if (i === 0) {
      rendered[0][0] += '%i';
      rendered.unshift([
        `%c ${subsystem} ${Array(ssLength).join(' ')}`,
        style
      ]);
    }
    const logLine = createLogLine(rendered);
    logMessages.push(logLine);
  });

  logMessages.forEach(([msg, ...colors]) =>
    msg.split('\n').forEach(line =>
      // !/null\s*$/.test(line) &&
      consoleLog(line, ...colors.splice(0, line.split('%c').length - 1))
    )
  );
};

const createLogLine = (messages) => {
  let out = '';
  let colors = [];
  let lineLength = 0;
  messages.forEach((line, n) => {
    const newMessage = line[0].replace(/%i$/, '');
    const newMessageLength = newMessage.replace(/\%c/g, '').length;
    if (n > 0 && !/%i$/.test(line[0])) {
      out += ' \n ';
      lineLength = 0;
    }
    lineLength += newMessageLength;
    out += lineLength > lineLimit ? newMessage.slice(0, lineLimit - (lineLength - newMessageLength)) + '...' : newMessage;
    colors.push(...line.slice(1));
    const nextLine = messages[n + 1];
    if (nextLine && !/%i$/.test(nextLine[0])) {
      out += ' \r ';
    }
  });
  return [out, ...colors];
};

console.log = function (arg1) {
  if (arg1 && arg1.indexOf && arg1.indexOf('[HMR]') !== -1) {
    if (arg1.indexOf('bundle rebuilding') !== -1) {
      console.clear();
    }
    return parse('hot-module', 'color: #ff8800', `${arg1}`);
  } else {
    return consoleLog.apply(console, arguments);
  }
};

export const init = (subsystem) => ({
  trace : trace.bind(this, subsystem),
  debug : debug.bind(this, subsystem),
  info  : info.bind(this, subsystem),
  log   : log.bind(this, subsystem),
  warn  : warn.bind(this, subsystem),
  error : error.bind(this, subsystem),
  fatal : fatal.bind(this, subsystem)
});

export const trace = (subsystem, ...inputs) => parse(subsystem, 'color: #ccffff', inputs);
export const debug = (subsystem, ...inputs) => parse(subsystem, 'color: #88ffee', inputs);
export const info  = (subsystem, ...inputs) => parse(subsystem, 'color: #44aabb', inputs);
export const log   = (subsystem, ...inputs) => parse(subsystem, 'color: #00aa66', inputs);
export const warn  = (subsystem, ...inputs) => parse(subsystem, 'color: #aa6622', inputs);
export const error = (subsystem, ...inputs) => parse(subsystem, 'color: #ff0000', inputs);
export const fatal = (subsystem, ...inputs) => parse(subsystem, 'color: #ff0000', inputs);


// TODO: Improvements...
// Allow in place colors to be used without arrays
// Handle objects without message printing better
// Handle undefined objects
