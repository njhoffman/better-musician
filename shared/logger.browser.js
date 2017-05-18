const pjson = require('prettyjson-256');
const { isArray, flattenDepth } = require('lodash');

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

export const trace = (subsystem, ...inputs) => {
  inputs = inputs.map((input, i) => {
    const startIndent = (i > 0 || typeof input === 'object' ? 4 : 0);
    return pjson.render(input, startIndent);
  });
  inputs.forEach(input => {
    //TODO: Hack but this is a pain in the ass to figure out
    let parsedMessage = '';
    let parseTmp = '';
    input[0].forEach(msgItem => {
      if (/^\s+(\-|.+:)\s+/.test(msgItem)) {
        parsedMessage += '\n' + parseTmp;
        parseTmp = msgItem;
      } else {
        parseTmp += msgItem;
      }
    });
    console.log('%c ' + subsystem + parsedMessage, 'color: #44ddbb',   ...input[1]);
  });
};

export const debug = (subsystem, ...messages) => {
  messages.forEach((msg) => {
    let rendMsg = pjson.render(msg, 5);
    rendMsg.unshift('%c ' + subsystem + ',color: #66CCEE');
    rendMsg.forEach(line => {
      var colorRE = /\s*%c.*?(,color: #\w{6})/g;
      if (colorRE.test(line)) {
        let beginning = [];
        let end = [];
        if (!line.match) debugger;
        line.match(colorRE).forEach(match => {
          beginning.push(match.split(',')[0]);
          end.push(match.split(',')[1]);
        });
        console.log(beginning.join(''), ...end);
      } else {
        console.log(...line);
      }
    });
  });
};

export const info = (subsystem, messages) => {
  console.log('%c ' + subsystem, 'color: #88bbdd',  messages);
};

export const log = (subsystem, messages) => {
  console.log('%c ' + subsystem, 'color: #44ddbb',  messages);
};

export const warn = () => {};

export const error = () => {};

export const fatal = () => {};



