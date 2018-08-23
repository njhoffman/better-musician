import _ from 'lodash';
import Cookies from 'browser-cookies';
import * as A from 'constants/auth';

import { init as initLog } from 'shared/logger';
const { debug } = initLog('auth-session');

// even though this code shouldn't be used server-side, node will throw
// errors if "window" is used
// const root = Function('return this')() || (42, eval)('this');

// stateful variables that persist throughout session
window.authState = {
  currentSettings: {},
  currentEndpoints: {},
  defaultEndpointKey: null
};

const unescapeQuotes = (val) => val && val.replace(/("|')/g, '');

export const getSessionEndpointKey = (k) => {
  const key = k || getCurrentEndpointKey();
  if (!key) {
    throw new Error('Authorization is not configured');
  }
  return key;
};

export const getCurrentSettings    = () => window.authState.currentSettings;
export const setCurrentSettings    = (s) => (window.authState.currentSettings = s);
export const getCurrentEndpoints    = () => window.authState.currentEndpoints;
export const setCurrentEndpoints    = (e) => (window.authState.currentEndpoints = e);
export const getCurrentEndpointKey = () => (retrieveData(A.SAVED_CONFIG_KEY) || getDefaultEndpointKey());
export const setCurrentEndpointKey = (k) => (persistData(A.SAVED_CONFIG_KEY, k || getDefaultEndpointKey()));
export const getDefaultEndpointKey = () => retrieveData(A.DEFAULT_CONFIG_KEY);
export const setDefaultEndpointKey = (k) => (persistData(A.DEFAULT_CONFIG_KEY, k));
export const getSessionEndpoints    = (k) => getCurrentEndpoints()[getSessionEndpointKey(k)];

export const getInitialEndpointKey = () =>
  unescapeQuotes(
    Cookies.get(A.SAVED_CONFIG_KEY) ||
    (window.localStorage && window.localStorage.getItem(A.SAVED_CONFIG_KEY))
  );

// only should work for current session
const getUrl = (endpointKey, path) => `${getApiUrl(endpointKey)}${_.get(getSessionEndpoints(endpointKey), path)}`;

export const getApiUrl = (key) =>
  window.authState.currentEndpoints[getSessionEndpointKey(key)].apiUrl;

export const getDestroyAccountUrl        = (eKey) => getUrl(eKey, 'accountDeletePath');
export const getSignOutUrl               = (eKey) => getUrl(eKey, 'auth.logout');
export const getEmailSignInUrl           = (eKey) => getUrl(eKey, 'auth.login');
export const getEmailSignUpUrl           = (eKey) => getUrl(eKey, 'emailRegistrationPath') + `?config_name=${eKey}`;
export const getPasswordResetUrl         = (eKey) => getUrl(eKey, 'passwordResetPath') + `?config_name=${eKey}`;
export const getPasswordUpdateUrl        = (eKey) => getUrl(eKey, 'passwordUpdatePath');
export const getTokenValidationPath      = (eKey) => getUrl(eKey, 'auth.validateToken');
export const getConfirmationSuccessUrl   = () => window.authState.currentSettings.confirmationSuccessUrl();
export const getPasswordResetRedirectUrl = () => window.authState.currentSettings.confirmationSuccessUrl();
export const getTokenFormat              = () => window.authState.currentSettings.tokenFormat;

export const getOAuthUrl = ({ provider, params, endpointKey }) => {
  let oAuthUrl = getApiUrl(endpointKey) + getSessionEndpoints(endpointKey).authProviderPaths[provider] +
    '?auth_origin_url=' + encodeURIComponent(window.location.href) +
    '&config_name=' + encodeURIComponent(getSessionEndpointKey(endpointKey));

  if (params) {
    for (var key in params) {
      oAuthUrl += '&';
      oAuthUrl += encodeURIComponent(key);
      oAuthUrl += '=';
      oAuthUrl += encodeURIComponent(params[key]);
    }
  }

  return oAuthUrl;
};

// reset stateful variables
export const resetConfig = () => {
  window.authState = {};
  window.authState.currentSettings = {};
  window.authState.currentEndpoints = {};
  destroySession();
};

export const destroySession = () => {
  var sessionKeys = [
    A.SAVED_CREDS_KEY,
    A.SAVED_CONFIG_KEY
  ];

  debug('Destroying session');
  for (var key in sessionKeys) {
    key = sessionKeys[key];

    // kill all local storage keys
    window.localStorage && window.localStorage.removeItem(key);

    // remove from base path in case config is not specified
    Cookies.erase(key, {
      path: window.authState.currentSettings.cookiePath || '/'
    });
  }
};

export const removeData = (key) => {
  const { storage } = window.authState.currentSettings;
  if (storage === 'cookies') {
    Cookies.erase(key);
  } else {
    window.localStorage.removeItem(key);
  }
  debug(
    `Removing key ${storage}: ${key}`,
    { _sessionGet: { key, storage } }
  );
};

export const persistData = (key, val) => {
  const { cookiePath, storage, cookieExpiry } = window.authState.currentSettings;
  const sVal = JSON.stringify(val);
  debug(
    `Saving session to ${storage}: ${key}`,
    { _sessionSave: { key, val, storage } }
  );
  if (storage === 'cookies') {
    Cookies.set(key, sVal, {
      expires: cookieExpiry,
      path:    cookiePath
    });
  } else {
    window.localStorage.setItem(key, sVal);
  }
};

export const retrieveData = (key) => {
  const { storage } = window.authState.currentSettings;
  const val = storage === 'cookies' ? Cookies.get(key) : window.localStorage.getItem(key);
  let parsedVal;
  // if value is a simple string, the parser will fail, just return the string
  try {
    parsedVal = JSON.parse(val);
  } catch (e) {
    parsedVal = unescapeQuotes(val);
  }
  debug(
    `Getting "${key}" from ${storage}`,
    { _sessionGet: { key, parsedVal, storage } }
  );

  return parsedVal;
};
