import * as A from 'constants/auth';
import extend from 'extend';
import fetch from 'utils/fetch';
import parseEndpointConfig from './parseEndpointConfig';

import { setEndpointKeys } from 'actions/auth';
import {
  getApiUrl,
  getCurrentSettings,
  setCurrentSettings,
  getInitialEndpointKey,
  setDefaultEndpointKey,
  setCurrentEndpoint,
  setCurrentEndpointKey,
  removeData,
  retrieveData,
  resetConfig,
  persistData
} from './sessionStorage';

// can't use "window" with node app
// const root = Function('return this')() || (42, eval)('this');

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
  parseExpiry: (headers) => ((parseInt(headers['expiry'], 10) * 1000) || null),
  handleLoginResponse: (resp) => resp.data,
  handleAccountUpdateResponse: (resp) => resp.data,
  handleTokenValidationResponse: (resp) => resp.data
};

// save session configuration
export const applyConfig = ({ dispatch, endpoints = {}, settings = {}, reset = false } = {}) => {
  let currentEndpointKey;

  if (reset) {
    resetConfig();
  }

  if (settings.initialCredentials) {
    currentEndpointKey = settings.initialCredentials.currentEndpointKey;
  }

  setCurrentSettings(extend({}, defaultSettings, settings));

  let {
    defaultEndpointKey,
    currentEndpoint
  } = parseEndpointConfig(endpoints, getInitialEndpointKey());

  if (!currentEndpointKey) {
    currentEndpointKey = defaultEndpointKey;
  }

  // persist default config key with session storage
  setDefaultEndpointKey(defaultEndpointKey);
  setCurrentEndpoint(currentEndpoint);

  dispatch(setEndpointKeys(Object.keys(currentEndpoint), currentEndpointKey, defaultEndpointKey));
  setCurrentEndpointKey(currentEndpointKey);

  let savedCreds = retrieveData(A.SAVED_CREDS_KEY);

  if (getCurrentSettings().initialCredentials) {
    // skip initial headers check (i.e. check was already done server-side)
    let { user, headers } = getCurrentSettings().initialCredentials;
    persistData(A.SAVED_CREDS_KEY, headers);
    return Promise.resolve(user);
  } else if (savedCreds) {
    // verify session credentials with API
    return fetch(`${getApiUrl(currentEndpointKey)}${currentEndpoint[currentEndpointKey].tokenValidationPath}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json().then(({ data }) => (data));
        }
        removeData(A.SAVED_CREDS_KEY);
        return Promise.reject({ reason: 'No credentials.' });
      });
  } else {
    return Promise.reject({ reason: 'No credentials.' });
  }
};
