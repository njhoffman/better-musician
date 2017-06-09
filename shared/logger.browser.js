const pjson = require('prettyjson-256');
const { isArray, flattenDepth, zip } = require('lodash');

pjson.init({ browser: true });

//  console.log('%cBlue! %cRed!', 'color: blue;', 'color: red;');


export const init = (subsystem) => {
  return {
    trace : trace.bind(this, subsystem),
    debug : debug.bind(this, subsystem),
    info  : info.bind(this, subsystem),
    log   : log.bind(this, subsystem),
    warn  : warn.bind(this, subsystem),
    error : error.bind(this, subsystem),
    fatal : fatal.bind(this, subsystem)
  };
};

const parse = (subsystem, style, messages) => {
  messages.forEach((msg, i) => {
    let rendMsg = pjson.render(msg, 5 + (i * 3));
    rendMsg = zip(rendMsg[0], rendMsg[1]);
    if (i === 0) {
      if (messages.length > 1) {
        subsystem += "\n";
      }
      rendMsg.unshift(['%c ' + subsystem, style]);
    }
    let msgOut = '';
    let colors = [];
    rendMsg.forEach((line, n) => {
      colors.push(line[1]);
      msgOut += line[0].replace(/%i$/, '');

      const nextLine = (n + 1) < rendMsg.length ? rendMsg[n + 1] : false;
      if (!nextLine || !/%i$/.test(nextLine[0]) && rendMsg.length > 2) {
        console.log(msgOut, ...colors);
        msgOut = '';
        colors = [];
      }
    });
  });
};

export const trace = (subsystem, ...inputs) => parse(subsystem, 'color: #aaffff', inputs);
export const debug = (subsystem, ...inputs) => parse(subsystem, 'color: #88ffee', inputs);
export const info  = (subsystem, ...inputs) => parse(subsystem, 'color: #88eedd', inputs);
export const log   = (subsystem, ...inputs) => parse(subsystem, 'color: #44ddbb', inputs);
export const warn  = (subsystem, ...inputs) => parse(subsystem, 'color: #aa6622', inputs);
export const error = (subsystem, ...inputs) => parse(subsystem, 'color: #ff0000', inputs);
export const fatal = (subsystem, ...inputs) => parse(subsystem, 'color: #ff0000', inputs);
