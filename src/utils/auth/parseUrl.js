import querystring from 'querystring';
import extend from 'extend';

export const normalizeTokenKeys = (params) => {
  // normalize keys
  const parsed = { ...params };
  if (parsed.token) {
    parsed['access-token'] = parsed.token;
    delete parsed.token;
  }
  if (parsed.auth_token) {
    parsed['access-token'] = parsed.auth_token;
    delete parsed.auth_token;
  }
  if (parsed.client_id) {
    parsed.client = parsed.client_id;
    delete parsed.client_id;
  }
  if (parsed.config) {
    parsed.endpointKey = parsed.config;
    delete parsed.config;
  }
  return parsed;
};

const getAnchorSearch = (location) => {
  const rawAnchor = location.anchor || '';
  const arr = rawAnchor.split('?');
  return (arr.length > 1) ? arr[1] : null;
};

const getSearchQs = (location) => {
  const rawQs = location.search || '';
  const qs = rawQs.replace('?', '');
  const qsObj = (qs) ? querystring.parse(qs) : {};
  return qsObj;
};

const getAnchorQs = (location) => {
  const anchorQs = getAnchorSearch(location);
  const anchorQsObj = (anchorQs) ? querystring.parse(anchorQs) : {};
  return anchorQsObj;
};

const stripKeys = (obj, keys) => {
  const stripped = { ...obj };
  Object.keys(obj, key => {
    delete stripped[key];
  });
  return stripped;
};

export function getAllParams(location) {
  return extend({}, getAnchorQs(location), getSearchQs(location));
}

const buildCredentials = (location, keys) => {
  const params = getAllParams(location);
  const authHeaders = {};

  Object.keys(keys).forEach(key => {
    authHeaders[key] = params[key];
  });
  return normalizeTokenKeys(authHeaders);
};

// this method is tricky. we want to reconstruct the current URL with the
// following conditions:
// 1. search contains none of the supplied keys
// 2. anchor search (i.e. `#/?key=val`) contains none of the supplied keys
// 3. all of the keys NOT supplied are presevered in their original form
// 4. url protocol, host, and path are preserved
const getLocationWithoutParams = (currentLocation, keys) => {
  // strip all values from both actual and anchor search params
  let newSearch   = querystring.stringify(stripKeys(getSearchQs(currentLocation), keys));
  const newAnchorQs = querystring.stringify(stripKeys(getAnchorQs(currentLocation), keys));
  let newAnchor   = (currentLocation.hash || '').split('?')[0];

  if (newSearch) {
    newSearch = `?${newSearch}`;
  }

  if (newAnchorQs) {
    newAnchor += `?${newAnchorQs}`;
  }

  if (newAnchor && !newAnchor.match(/^#/)) {
    newAnchor = `#/${newAnchor}`;
  }

  // reconstruct location with stripped auth keys
  const newLocation = currentLocation.pathname + newSearch + newAnchor;

  return newLocation;
};

export default function getRedirectInfo(currentLocation) {
  if (!currentLocation) {
    return {};
  }
  const authKeys = [
    'access-token',
    'token',
    'auth_token',
    'config',
    'client',
    'client_id',
    'expiry',
    'uid',
    'reset_password',
    'account_confirmation_success'
  ];

  const authRedirectHeaders = buildCredentials(currentLocation, authKeys);
  const authRedirectPath = getLocationWithoutParams(currentLocation, authKeys);

  if (authRedirectPath !== currentLocation) {
    return { authRedirectHeaders, authRedirectPath };
  }
  return {};
}
