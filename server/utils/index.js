const responseLog = require('./responseLog');
const requestLog =  require('./requestLog');
const webpackReporter = require('./webpackReporter');
const memwatchLogs = require('./memwatchLogs');

const proxyRequest = (sdc) =>
  (req, res, next) => {
    // other headers: content-length, accept, accept-encoding, cookie,
    const logger = req.logger.child({ subsystem: 'app:proxy' });
    if (req.url === '/health') {
      logger.debug(`❤ ${req._requestIp}`);
    } else {
      logger.debug({ _trace: { _request: req } },
        `${req.method.toUpperCase()} - ${req.url}`);
    }
    sdc.increment('app_proxy_request');
    if (next) { next(); }
  };

const appError = (sdc, logger) =>
  (type, err) => {
    sdc.increment((type === 'exception' ? 'app_uncaught_exception' : 'app_unhandled_rejection'));
    logger.error(err, `Unhandled ${type}: ${err.message}`);
  };

module.exports = ({ config, sdc, logger, sharedUtils }) => {
  const { heap, stats, leak } = memwatchLogs({ config, sdc, logger, sharedUtils });
  return {
    proxyRequestOutput: proxyRequest(sdc),
    appErrorLog:        appError(sdc, logger),
    responseLog:        responseLog(),
    requestLog:         requestLog(sdc, logger),
    webpackReporter:    webpackReporter(config, sharedUtils, heap),
    memwatchStatsLog:   stats,
    memwatchLeakLog:    leak
  };
};
