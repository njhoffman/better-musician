import _ from 'lodash';
import * as A from 'constants/auth';
import extend from 'extend';
import fetch from 'utils/fetch';
import { setEndpointKeys } from 'actions/auth';
import parseEndpointConfig from './parseEndpointConfig';

import {
  getApiUrl,
  getCurrentSettings,
  setCurrentSettings,
  getInitialEndpointKey,
  setDefaultEndpointKey,
  setCurrentEndpoints,
  setCurrentEndpointKey,
  removeData,
  retrieveData,
  resetConfig,
  persistData
} from './sessionStorage';

const defaultSettings = {
  proxyIf:            () => false,
  proxyUrl:           '/proxy',
  forceHardRedirect:  false,
  storage:            'cookies',
  cookieExpiry:       14,
  cookiePath:         '/',
  initialCredentials: null,

  passwordResetSuccessUrl: () => window.location.href,
  confirmationSuccessUrl: () => window.location.href,

  tokenFormat: {
    'access-token': '{{ access-token }}',
    'token-type':   'Bearer',
    client:         '{{ client }}',
    expiry:         '{{ expiry }}',
    uid:            '{{ uid }}'
  },

  // convert from ruby time (seconds) to js time (millis)
  parseExpiry: (headers) => ((parseInt(headers.expiry, 10) * 1000) || null),
  handleLoginResponse: (resp) => resp.data,
  handleAccountUpdateResponse: (resp) => resp.data,
  handleTokenValidationResponse: (resp) => resp.data
};

// TODO: use promise patterns consistently
/* eslint-disable prefer-promise-reject-errors */

// save session configuration
export default ({ dispatch, endpoints = {}, settings = {}, reset = false } = {}) => {
  let currentEndpointKey = _.get(settings, 'initialCredentials.currentEndpointKey');

  if (reset) {
    resetConfig();
  }
  setCurrentSettings(extend({}, defaultSettings, settings));

  const { defaultEndpointKey, currentEndpoints } = parseEndpointConfig(endpoints, getInitialEndpointKey());

  if (!currentEndpointKey) {
    currentEndpointKey = defaultEndpointKey;
  }

  // persist default config key with session storage
  setDefaultEndpointKey(defaultEndpointKey);
  setCurrentEndpoints(currentEndpoints);

  dispatch(setEndpointKeys(Object.keys(currentEndpoints), currentEndpointKey, defaultEndpointKey));
  setCurrentEndpointKey(currentEndpointKey);

  const savedCreds = retrieveData(A.SAVED_CREDS_KEY);

  if (getCurrentSettings().initialCredentials) {
    // skip initial headers check (i.e. check was already done server-side)
    const { user, headers } = getCurrentSettings().initialCredentials;
    persistData(A.SAVED_CREDS_KEY, headers);
    return Promise.resolve(user);
  } else if (savedCreds) {
    // verify session credentials with API
    // TODO: replace with utility function
    return fetch(`${getApiUrl(currentEndpointKey)}${currentEndpoints[currentEndpointKey].auth.validateToken}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json().then(({ records }) => (records[0]));
        }
        removeData(A.SAVED_CREDS_KEY);
        return Promise.reject({ reason: 'No credentials.' });
      });
  }
  return Promise.reject({ reason: 'No credentials.' });
};
/* eslint-enable prefer-promise-reject-errors */
