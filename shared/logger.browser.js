const pjson = require('prettyjson-256');
const _ = require('lodash');
const { padRight } = require('./util');

const results = pjson.init({ browser: true });

//  console.log('%cBlue! %cRed!', 'color: blue;', 'color: red;');

const consoleLog = console.log;
const subsystems = ['hot-module'];

const lineLimit = 100;
const parse = (subsystem, style, messages) => {
  subsystems.indexOf(subsystem) === -1 && subsystems.push(subsystem);
  const ssLength = 3 + _.maxBy(subsystems, (ss) => ss.length).length - subsystem.length;
  // TODO: fix problems rendering 'undefined'
  const filtered = _.isArray(messages) ? messages.filter(msg => !_.isUndefined(msg)) : messages;
  [].concat(filtered).forEach((msg, i) => {
    let rendMsg = [];
    msg = _.isArray(msg) && msg.length === 1 ? msg[0] : msg;
    if (_.isArray(msg) && msg[0].split('%c').length === msg.length) {
      // msg[0] = Array(ssLength).join(' ') + msg[0];
      msg[0] = Array(6).join(' ') + msg[0];
      rendMsg.push(msg);
    } else {
      rendMsg = pjson.render(
        (!_.isString(msg) ? _.pickBy(msg) : msg),
        5 + (i * 3)
      );
      rendMsg = _.zip(rendMsg[0], rendMsg[1]);
    }

    // first line with subsystem
    i === 0 && rendMsg.unshift([`%c ${subsystem} ${Array(ssLength).join(' ')}`, style]);

    let msgOut = '';
    let colors = [];
    rendMsg.forEach((line, n) => {
      const newMessage = line[0].replace(/%i$/, '');
      msgOut += newMessage.length > lineLimit
      ? newMessage.slice(0, lineLimit) + '...'
      : newMessage;
      colors.push(...line.slice(1));
      const nextLine = (n + 1) <= rendMsg.length ? rendMsg[n + 1] : false;

      if (!nextLine || !/%i$/.test(nextLine[0]) && (i + n > 1)) {
        // const placeHolder = n === 0 && rendMsg.length > 2 ? (Array(ssLength + 4).join(' ') + '↪') : '';
        // consoleLog((i + n > 1 ? Array(16 + ssLength).join(' ') : '') + msgOut + placeHolder, ...colors);
      //   const placeHolder = n === 0 && rendMsg.length > 2 ? (Array(ssLength + 4).join(' ') + '↪') : '';
      //   const fmtMessage = (i + n > 1 ? Array(16 + ssLength).join(' ') : '') + msgOut + placeHolder;
      //   consoleLog(fmtMessage.length > lineLimit ? fmtMessage.slice(0, lineLimit) + '...' : '',  ...colors);
      //   msgOut = '';
      //   colors = [];
      // }
        const placeHolder = n === 0 && rendMsg.length > 2 ? (Array(ssLength + 4).join(' ') + '↪') : '';
        const fmtMessage = (i + n > 1 ? Array(16 + ssLength).join(' ') : '') + msgOut + placeHolder;
        consoleLog(fmtMessage,  ...colors);
        msgOut = '';
        colors = [];
      }
    });
  });
};

console.log = function (arg1) {
  if (arg1 && arg1.indexOf('[HMR]') !== -1) {
    return parse('hot-module', 'color: #ffaa00', `${arg1}`);
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

export const trace = (subsystem, ...inputs) => parse(subsystem, 'color: #aaffff', inputs);
export const debug = (subsystem, ...inputs) => parse(subsystem, 'color: #aaffee', inputs);
export const info  = (subsystem, ...inputs) => parse(subsystem, 'color: #44ddbb', inputs);
export const log   = (subsystem, ...inputs) => parse(subsystem, 'color: #11dd88', inputs);
export const warn  = (subsystem, ...inputs) => parse(subsystem, 'color: #aa6622', inputs);
export const error = (subsystem, ...inputs) => parse(subsystem, 'color: #ff0000', inputs);
export const fatal = (subsystem, ...inputs) => parse(subsystem, 'color: #ff0000', inputs);

