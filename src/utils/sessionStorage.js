import Cookies from "browser-cookies";
import * as C from "./constants";

// even though this code shouldn't be used server-side, node will throw
// errors if "window" is used
const root = Function("return this")() || (42, eval)("this");

// stateful variables that persist throughout session
root.authState = {
  currentSettings:    {},
  currentEndpoint:    {},
  defaultEndpointKey: null
}

const unescapeQuotes = (val) => val && val.replace(/("|')/g, "");

// TODO: make this really work
export const getSessionEndpointKey = (k) => {
  let key = k || getCurrentEndpointKey();
  if (!key) {
    throw "You must configure redux-auth before use.";
  } else {
    return key;
  }
}

export const getCurrentSettings = () => root.authState.currentSettings;
export const setCurrentSettings = (s) => (root.authState.currentSettings = s);

export const getCurrentEndpoint = () => root.authState.currentEndpoint;
export const setCurrentEndpoint = (e) => (root.authState.currentEndpoint = e);

export const getCurrentEndpointKey = () => (retrieveData(C.SAVED_CONFIG_KEY) || getDefaultEndpointKey());
export const setDefaultEndpointKey = (k) => (persistData(C.DEFAULT_CONFIG_KEY, k));

export const getDefaultEndpointKey = () => retrieveData(C.DEFAULT_CONFIG_KEY);
export const setCurrentEndpointKey = (k) => (persistData(C.SAVED_CONFIG_KEY, k || getDefaultEndpointKey()));

// reset stateful variables
export const resetConfig = () => {
  root.authState = root.authState || {};
  root.authState.currentSettings    = {};
  root.authState.currentEndpoint    = {};
  destroySession();
}

export const destroySession = () => {
  var sessionKeys = [
    C.SAVED_CREDS_KEY,
    C.SAVED_CONFIG_KEY
  ];

  for (var key in sessionKeys) {
    key = sessionKeys[key];

    // kill all local storage keys
    if (root.localStorage) {
      root.localStorage.removeItem(key);
    }

    // remove from base path in case config is not specified
    Cookies.erase(key, {
      path: root.authState.currentSettings.cookiePath || "/"
    });
  }
}

export const getInitialEndpointKey = () =>
  unescapeQuotes(
    Cookies.get(C.SAVED_CONFIG_KEY) ||
    (root.localStorage && root.localStorage.getItem(C.SAVED_CONFIG_KEY))
  );

export const getSessionEndpoint = (k) => getCurrentEndpoint()[getSessionEndpointKey(k)];

// only should work for current session
export const getDestroyAccountUrl = (endpointKey) =>
  `${getApiUrl(endpointKey)}${getSessionEndpoint(endpointKey).accountDeletePath}`

// only should work for current session
export const getSignOutUrl = (endpointKey) =>
  `${getApiUrl(endpointKey)}${getSessionEndpoint(endpointKey).signOutPath}`

export const getEmailSignInUrl = (endpointKey) =>
  `${getApiUrl(endpointKey)}${getSessionEndpoint(endpointKey).emailSignInPath}`

export const getEmailSignUpUrl = (endpointKey) =>
  `${getApiUrl(endpointKey)}${getSessionEndpoint(endpointKey).emailRegistrationPath}?config_name=${endpointKey}`

export const getPasswordResetRequestUrl = (endpointKey) =>
  `${getApiUrl(endpointKey)}${getSessionEndpoint(endpointKey).passwordResetPath}?config_name=${endpointKey}`

export const getPasswordUpdateUrl = (endpointKey) =>
  `${getApiUrl(endpointKey)}${getSessionEndpoint(endpointKey).passwordUpdatePath}`

export const getTokenValidationPath = (endpointKey) =>
  `${getApiUrl(endpointKey)}${getSessionEndpoint(endpointKey).tokenValidationPath}`;

export const getOAuthUrl = ({provider, params, endpointKey}) => {
  var oAuthUrl = getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).authProviderPaths[provider] +
    "?auth_origin_url="+encodeURIComponent(root.location.href) +
    "&config_name="+encodeURIComponent(getSessionEndpointKey(endpointKey));

  if (params) {
    for(var key in params) {
      oAuthUrl += "&";
      oAuthUrl += encodeURIComponent(key);
      oAuthUrl += "=";
      oAuthUrl += encodeURIComponent(params[key]);
    }
  }

  return oAuthUrl;
}

export const getConfirmationSuccessUrl = () => root.authState.currentSettings.confirmationSuccessUrl();
export const getPasswordResetRedirectUrl = () => root.authState.currentSettings.confirmationSuccessUrl();
export const getApiUrl = (key) => root.authState.currentEndpoint[getSessionEndpointKey(key)].apiUrl;
export const getTokenFormat = () => root.authState.currentSettings.tokenFormat;

export const removeData = (key) => {
  switch(root.authState.currentSettings.storage) {
    case "localStorage":
      root.localStorage.removeItem(key);
      break;
    default:
      Cookies.erase(key);
  }
}

export const persistData = (key, val) => {
  val = JSON.stringify(val);
  switch (root.authState.currentSettings.storage) {
    case "localStorage":
      root.localStorage.setItem(key, val);
      break;
    default:
      Cookies.set(key, val, {
        expires: root.authState.currentSettings.cookieExpiry,
        path:    root.authState.currentSettings.cookiePath
      });
      break;
  }
};

export const retrieveData = (key, storage) => {
  let val = null;
  switch (storage || root.authState.currentSettings.storage) {
    case "localStorage":
      val = root.localStorage && root.localStorage.getItem(key);
      break;
    default:
      val = Cookies.get(key);
      break;
  }
  // if value is a simple string, the parser will fail. in that case, simply
  // unescape the quotes and return the string.
  try {
    // return parsed json response
    return JSON.parse(val);
  } catch (err) {
    // unescape quotes
    return unescapeQuotes(val);
  }
};
