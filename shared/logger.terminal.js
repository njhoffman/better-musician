const bunyan = require('bunyan');
const uuid = require('node-uuid');
const _ = require('lodash');
const { serializers } = require('./logger.utils');

// const pjson = require('prettyjson-256');
// let subsystem = 'default';
// export const init = (ss) => {
//   subsystem = ss;
//   return {
//     debug, info, warn, error, log
//   };
// };
//
// export const debug = () => {};
// export const info = () => {};
// export const warn = () => {};
// export const error = () => {};
//
// export const log = (...messages) => {
//   if (__TEST__) return;
//
//   if (messages.length > 1) {
//     messages = messages.map((msg) => {
//       let rendMsg = pjson.render(msg, 5);
//       if (rendMsg.indexOf('\n') !== -1) {
//         rendMsg = `\n${rendMsg}\n`;
//       }
//       return rendMsg;
//     }).join('\n');
//     messages = `\n${messages}\n`;
//   } else {
//     messages = messages[0];
//   }
//   console.log(`${messages}`);
// };
//
let loggerInstance, logParent;


const isTestEnv = process.env.NODE_ENV === 'test';
const logName = process.env['_APP_NAME_'] ? process.env['_APP_NAME_'] : 'Instrumental';
const logConfig = {
  name: logName,
  streams: [{
    stream: process.stdout,
    level: 'trace'
  }],
  serializers: bunyan.stdSerializers
};

const preprocess = (log, level, ...msg) => {
  // add global properties
  if (_.isObjectLike(msg[0])) {
    msg[0]._logId = uuid.v4();
  } else {
    msg.unshift({
      _logId: uuid.v4()
    });
  }

  // add property to indicate to log viewer what level to filter object
  const logLevels = {
    silly : 7,
    trace : 6,
    debug : 5,
    info  : 4,
    warn  : 3,
    error : 2,
    fatal : 1
  };
  _.keys(logLevels).forEach(key => {
    if (_.has(msg[0], `_${key}`)) {
      const msgObj = _.cloneDeep(msg[0][`_${key}`]);
      msgObj._log_level = logLevels[key];
      _.merge(msg[0], msgObj);
      delete msg[0][`_${key}`];
    }
  });

  // apply serializers
  _.each(_.keys(msg[0]), (key) => {
    const obj = _.cloneDeep(msg[0][key]);
    if (_.has(serializers, key)) {
      delete msg[0][key];
      _.merge(msg[0], serializers[key](obj));
    }
  });

  if (!isTestEnv) {
    log[level](...msg);
  }
};

const createInstance = (log) => {
  return {
    _dbg:    preprocess.bind(undefined, log, 'fatal'),
    silly:   preprocess.bind(undefined, log, 'silly'),
    trace:   preprocess.bind(undefined, log, 'trace'),
    debug:   preprocess.bind(undefined, log, 'debug'),
    info:    preprocess.bind(undefined, log, 'info'),
    warn:    preprocess.bind(undefined, log, 'warn'),
    error:   preprocess.bind(undefined, log, 'error'),
    fatal:   preprocess.bind(undefined, log, 'fatal'),
    streams: log.streams,
    parent:  log
  };
};

const logger = (subsystem, extra = {}) => {
  const childParams = _.merge(extra, { subsystem });
  if (loggerInstance) {
    loggerInstance = createInstance(loggerInstance.parent.child(childParams));
    loggerInstance.child = (args) => logger(config, args.subsystem || subsystem, _.merge(extra, args));
    return loggerInstance;
  }
  //
  // if (config && config.logging) {
  //   if (config.logging.level) {
  //     logConfig.streams[0].level = config.logging.level;
  //   }
  //   if (config.logging.file && config.logging.file.path) {
  //     logConfig.streams.push(config.logging.file);
  //   }
  // }

  // TODO: fork bunyan and handle this in there
  logParent = bunyan.createLogger(logConfig).child(childParams);
  loggerInstance = createInstance(logParent);
  // loggerInstance.child = (args) => logger(config, args.subsystem || subsystem, _.merge(extra, args));
  loggerInstance.child = (args) => logger(args.subsystem || subsystem, _.merge(extra, args));

  // if (config && config.logging) {
  //   loggerInstance.debug({ data: config.logging }, 'loaded logger configuration');
  // }
  return loggerInstance;
};

module.exports = logger;
