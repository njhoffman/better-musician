import _ from 'lodash';
import originalFetch from "isomorphic-fetch";
import * as C from "./constants";
import extend from "extend";
import {
  getApiUrl,
  retrieveData,
  persistData,
  getTokenFormat,
  getSessionEndpointKey
} from "./sessionStorage";

import { init as initLog } from 'shared/logger';
const { debug } = initLog('auth:fetch');

const isApiRequest = (url) =>
  (url.match(getApiUrl(getSessionEndpointKey())));

const getAuthHeaders = (url) => {
  if (!isApiRequest(url)) {
    return {};
  }
  // fetch current auth headers from storage
  const currentHeaders = retrieveData(C.SAVED_CREDS_KEY) || {};
  const nextHeaders = {};

  // bust IE cache
  nextHeaders["If-Modified-Since"] = "Mon, 26 Jul 1997 05:00:00 GMT";

  // set header for each key in `tokenFormat` config
  for (var key in getTokenFormat()) {
    nextHeaders[key] = currentHeaders[key];
  }
  return addAuthorizationHeader(currentHeaders['access-token'], nextHeaders);
}

const updateAuthCredentials = (resp) => {
  // check config apiUrl matches the current response url
  if (isApiRequest(resp.url)) {
    // set header for each key in `tokenFormat` config
    const newHeaders = {};

    // set flag to ensure that we don't accidentally nuke the headers
    // if the response tokens aren't sent back from the API
    let blankHeaders = true;

    // set header key + val for each key in `tokenFormat` config
    for (var key in getTokenFormat()) {
      newHeaders[key] = resp.headers.get(key);

      if (newHeaders[key]) {
        blankHeaders = false;
      }
    }

    // persist headers for next request
    if (!blankHeaders) {
      persistData(C.SAVED_CREDS_KEY, newHeaders);
    }
  }

  return resp;
}

export const addAuthorizationHeader = (accessToken, headers) =>
  Object.assign({}, headers, { Authorization: `Bearer ${accessToken}` });

export default (url, options = {}) => {
  if (!options.headers) {
    options.headers = {}
  }
  extend(options.headers, getAuthHeaders(url));
  debug(`Fetching ${url}`, options.headers);
  return originalFetch(url, options)
    .then(resp => {
      debug(`Fetch response: ${resp.status} ${resp.statusText}`);
      if (!_.isEmpty(resp.headers) || !_.isEmpty(resp.body)) {
        debug(_.pick(resp, ['body', 'headers']));
      }
      return updateAuthCredentials(resp);
    });
}
