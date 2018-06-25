import Cookies from 'browser-cookies';
import * as C from './constants';

import { init as initLog } from 'shared/logger';
const { debug } = initLog('auth-session');

// even though this code shouldn't be used server-side, node will throw
// errors if "window" is used
// const root = Function('return this')() || (42, eval)('this');

// stateful variables that persist throughout session
window.authState = {
  currentSettings:    {},
  currentEndpoint:    {},
  defaultEndpointKey: null
};

const unescapeQuotes = (val) => val && val.replace(/("|')/g, '');

// TODO: make this really work
export const getSessionEndpointKey = (k) => {
  let key = k || getCurrentEndpointKey();
  if (!key) {
    throw new Error('Authorization is not configured');
  }
  return key;
};

export const getCurrentSettings = () => window.authState.currentSettings;
export const setCurrentSettings = (s) => (window.authState.currentSettings = s);

export const getCurrentEndpoint = () => window.authState.currentEndpoint;
export const setCurrentEndpoint = (e) => (window.authState.currentEndpoint = e);

export const getCurrentEndpointKey = () => (retrieveData(C.SAVED_CONFIG_KEY) || getDefaultEndpointKey());
export const setCurrentEndpointKey = (k) => (persistData(C.SAVED_CONFIG_KEY, k || getDefaultEndpointKey()));

export const getDefaultEndpointKey = () => retrieveData(C.DEFAULT_CONFIG_KEY);
export const setDefaultEndpointKey = (k) => (persistData(C.DEFAULT_CONFIG_KEY, k));

export const getInitialEndpointKey = () =>
  unescapeQuotes(
    Cookies.get(C.SAVED_CONFIG_KEY) ||
    (window.localStorage && window.localStorage.getItem(C.SAVED_CONFIG_KEY))
  );

export const getSessionEndpoint = (k) => getCurrentEndpoint()[getSessionEndpointKey(k)];

// only should work for current session
const getUrl = (endpointKey, path) =>
  `${getApiUrl(endpointKey)}${getSessionEndpoint(endpointKey)[path]}`;

export const getDestroyAccountUrl = (ek) => getUrl(ek, 'accountDeletePath');
export const getSignOutUrl = (ek) => getUrl(ek, 'signOutPath');
export const getEmailSignInUrl = (ek) => getUrl(ek, 'emailSignInPath');
export const getEmailSignUpUrl = (ek) => getUrl(ek, 'emailRegistrationPath') + `?config_name=${ek}`;
export const getPasswordResetUrl = (ek) => getUrl(ek, 'passwordResetPath') + `?config_name=${ek}`;
export const getPasswordUpdateUrl = (ek) => getUrl(ek, 'passwordUpdatePath');
export const getTokenValidationPath = (ek) => getUrl(ek, 'tokenValidationPath');

export const getOAuthUrl = ({ provider, params, endpointKey }) => {
  let oAuthUrl = getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).authProviderPaths[provider] +
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

export const getConfirmationSuccessUrl = () => window.authState.currentSettings.confirmationSuccessUrl();
export const getPasswordResetRedirectUrl = () => window.authState.currentSettings.confirmationSuccessUrl();
export const getApiUrl = (key) => window.authState.currentEndpoint[getSessionEndpointKey(key)].apiUrl;
export const getTokenFormat = () => window.authState.currentSettings.tokenFormat;

// reset stateful variables
export const resetConfig = () => {
  window.authState = root.authState || {};
  window.authState.currentSettings = {};
  window.authState.currentEndpoint = {};
  destroySession();
};

export const destroySession = () => {
  var sessionKeys = [
    C.SAVED_CREDS_KEY,
    C.SAVED_CONFIG_KEY
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
  const { cookiePath, storage } = window.authState.currentSettings;
  const sVal = JSON.stringify(val);
  debug(
    `Saving session to ${storage}: ${key}`,
    { _sessionSave: { key, val, storage } }
  );
  if (storage === 'cookies') {
    Cookies.set(key, sVal, {
      expires: window.authState.currentSettings.cookieExpiry,
      path:    window.authState.currentSettings.cookiePath
    });
  } else {
    window.localStorage.setItem(key, sVal);
  }
};

export const retrieveData = (key) => {
  const { cookiePath, storage } = window.authState.currentSettings;
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
