const _ = require('lodash');
const uuid = require('uuid');
const useragent = require('useragent');
const geoip = require('geoip-lite');
const url = require('url');

module.exports = (sdc, logger) => (req, res, next) => {
  // other headers: content-length, accept, accept-encoding, cookie,
  const reqId = req.id || req.headers['X-Amx-Request-Id'] || uuid.v4();
  const method = req.method.toLowerCase();
  const pUrl = url.parse(req.url);
  const reqObj = { method };

  if (req.params) reqObj.data = _.omit(req.params, ['0', '1']);
  if (req.session && req.session.user) reqObj.user = req.session.user;
  if (req.sessionID) reqObj.sessionId = req.sessionID;
  reqObj.sourceIp = (req.headers['x-forwarded-for'] || req.connection.remoteAddress)
    .split(',')
    .shift()
    .replace('::ffff:', '');

  reqObj.userAgent = req['user-agent'];
  reqObj.url = `${pUrl.href.replace(pUrl.query, '').replace(pUrl.hash, '')}`;

  const loc = geoip.lookup(reqObj.sourceIp);
  let locDesc = !loc
    ? ''
    : ((loc.city ? `${loc.city}, ` : '')
      + (loc.region ? loc.region : '')
      + (loc.country && loc.country !== 'US' ? ` ${loc.country}` : ''));

  if (/^192.168|^172|^10/.test(reqObj.sourceIp)) {
    locDesc = 'Reserved';
  }

  const agent = useragent.parse(req.headers['user-agent']);

  const userDesc = _.has(reqObj, 'user.userGUID') ? `${reqObj.user.userID}:${reqObj.user.userName}` : '';
  req.logger = logger.child({
    subsystem:         'app:server',
    _requestId:        reqId,
    _requestIp:        reqObj.sourceIp,
    _requestLocation:  locDesc.trim(),
    _requestUser:      userDesc,
    _requestStart:     new Date().getTime(),
    _responseTime:     req.headers['X-Response-Time'],
    _requestUserAgent: agent.toString()
  });

  const reqParams = ['url', 'headers', 'body', 'cookies', 'params'];
  if (reqObj.url === '/health') {
    req.logger.debug(`❤ ${reqObj.sourceIp}`);
  } else {
    req.logger.trace(
      { _trace: { _request: _.pick(req, reqParams) } },
      `${req.method.toUpperCase()} - ${reqObj.url}`
    );
  }
  sdc.increment('app_request');
  return (_.isFunction(next) ? next() : () => {});
};
