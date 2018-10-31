import fetch from 'isomorphic-fetch';
import cookie from 'cookie';
import url from 'url';
import * as A from 'constants/auth';
import getRedirectInfo from './parseUrl';
import { addAuthorizationHeader } from '../fetch';
import parseEndpointConfig from './parseEndpointConfig';

const parseHeaders = (headers) => {
  // set header for each key in `tokenFormat` config
  const newHeaders = {};

  // set flag to ensure that we don't accidentally nuke the headers
  // if the response tokens aren't sent back from the API
  let blankHeaders = true;

  // set header key + val for each key in `tokenFormat` config
  // TODO: get actual config value
  ['access-token', 'token-type', 'client',
    'expiry', 'uid', 'config', 'endpointKey'
  ].forEach(key => {
    // normalize -- sometimes headers come back in array form
    newHeaders[key] = [].concat(headers[key]).pop();
    if (newHeaders[key]) {
      blankHeaders = false;
    }
  });

  // persist headers for next request
  if (!blankHeaders) { return newHeaders; }
  return {};
};
//
// TODO: should always have custom typed promise errors
/* eslint-disable prefer-promise-reject-errors */

export const fetchToken = ({ rawEndpoints, cookies, currentLocation }) => {
  const { authRedirectHeaders } = getRedirectInfo(url.parse(currentLocation));

  return new Promise((resolve, reject) => {
    if (cookies || authRedirectHeaders) {
      const rawCookies = cookie.parse(cookies || '{}');
      const parsedCookies = JSON.parse(rawCookies.authHeaders || 'false');
      let firstTimeLogin;
      let mustResetPassword;
      let currentEndpointKey;
      let headers;
      let newHeaders;
      const { currentEndpoints, defaultEndpointKey } = parseEndpointConfig(rawEndpoints);

      if (authRedirectHeaders && authRedirectHeaders.uid && authRedirectHeaders['access-token']) {
        headers = parseHeaders(authRedirectHeaders);
        currentEndpointKey = authRedirectHeaders.endpointKey || null;
        mustResetPassword = JSON.parse(authRedirectHeaders.reset_password || 'false');
        firstTimeLogin = JSON.parse(authRedirectHeaders.account_confirmation_success || 'false');
      } else if (rawCookies && parsedCookies) {
        headers = parsedCookies;
        currentEndpointKey = JSON.parse(rawCookies[A.SAVED_CONFIG_KEY] || 'null');
        mustResetPassword = JSON.parse(parsedCookies.mustResetPassword || 'false');
        firstTimeLogin = JSON.parse(parsedCookies.firstTimeLogin || 'false');
      }

      if (!headers) {
        return reject({ reason: 'No creds', currentEndpoints, defaultEndpointKey });
      }

      const { apiUrl, auth: { validateToken } } = currentEndpoints[currentEndpointKey || defaultEndpointKey];
      const validationUrl = `${apiUrl}${validateToken}?unbatch=true`;

      return fetch(validationUrl, {
        headers: addAuthorizationHeader(headers['access-token'], headers)
      })
        .then((resp) => {
          newHeaders = parseHeaders(resp.headers.raw());
          return resp.json();
        })
        .then((json) => {
          if (json.success) {
            return resolve({
              headers: newHeaders,
              user: json.data,
              mustResetPassword,
              firstTimeLogin,
              currentEndpoints,
              currentEndpointKey,
              defaultEndpointKey
            });
          }
          return reject({
            reason: json.errors,
            mustResetPassword,
            firstTimeLogin,
            currentEndpoints,
            defaultEndpointKey
          });
        })
        .catch(reason => (
          reject({
            reason,
            firstTimeLogin,
            mustResetPassword,
            currentEndpoints,
            defaultEndpointKey
          })
        ));
    }
    const { currentEndpoints, defaultEndpointKey } = parseEndpointConfig(rawEndpoints);
    return reject({
      reason: 'No creds',
      currentEndpoints,
      defaultEndpointKey
    });
  });
};

/* eslint-enable prefer-promise-reject-errors */

const verifyAuth = (rawEndpoints, { isServer, cookies, currentLocation }) =>
  new Promise((resolve, reject) => {
    if (isServer) {
      return fetchToken({ rawEndpoints, cookies, currentLocation })
        .then(res => resolve(res))
        .catch(res => reject(res));
    }
    return resolve();
    // TODO: deal with localStorage
    // Auth.validateToken(getCurrentEndpointKey())
    // .then((user) => resolve(user.data), (err) => reject({reason: err}));
  });

export default verifyAuth;
