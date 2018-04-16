
module.exports = () =>
  (req, res, time) => {
    const logger = req._isProxy
      ? req.logger.child({ subsystem: 'app:proxy' })
      : req.logger.child({ subsystem: 'app:server' });

    const fmtTime = `${time.toFixed(2)}ms`;
    if (req.url === '/health') {
      logger.debug(`❤ ${req._requestIp}`);
    } else {
      // res.locals?
      logger.info({ _response: { url: req.url, code: res.statusCode, time: fmtTime } },
        `Response to ${req.url}: ${res.statusCode} in ${fmtTime}`);
    }
    res.setHeader('X-Response-Time', fmtTime);
  };
