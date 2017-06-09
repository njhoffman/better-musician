const pjson = require('prettyjson-256');

let subsystem = 'default';
export const init = (ss) => {
  subsystem = ss;
  return {
    debug, info, warn, error, log
  };
};

export const debug = () => {};
export const info = () => {};
export const warn = () => {};
export const error = () => {};

export const log = (...messages) => {
  if (__TEST__) return;

  if (messages.length > 1) {
    messages = messages.map((msg) => {
      let rendMsg = pjson.render(msg, 5);
      if (rendMsg.indexOf('\n') !== -1) {
        rendMsg = `\n${rendMsg}\n`;
      }
      return rendMsg;
    }).join('\n');
    messages = `\n${messages}\n`;
  } else {
    messages = messages[0];
  }
  console.log(`${messages}`);
};


