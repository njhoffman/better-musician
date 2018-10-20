// import fetch from 'utils/fetch';
import { init as initLog } from 'shared/logger';
import { padRight } from 'shared/util';
import _ from 'lodash';
import { persistData, retrieveData, getTokenFormat } from 'utils/auth/sessionStorage';
import { SAVED_CREDS_KEY } from 'constants/auth';

const {
  /* error,  */
  warn,
  info,
  trace
} = initLog('middlewareApi');

// TODO: make api return nested data, implement normalizing here

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

const makeFormData = (FormData, data, name = '') => {
  if (typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      const val = data[key];
      if (name === '') {
        makeFormData(FormData, val, key);
      } else {
        makeFormData(FormData, val, `${name}[${key}]`);
      }
    });
  } else {
    FormData.append(name, data);
  }
};
export const addAuthorizationHeader = (accessToken, headers) => Object.assign(
  {},
  headers,
  { Authorization: `Bearer ${accessToken}` }
);

const getAuthHeaders = (url) => {
  // fetch current auth headers from storage
  const currentHeaders = retrieveData(SAVED_CREDS_KEY) || {};
  const nextHeaders = {};

  // bust IE cache
  nextHeaders['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

  // set header for each key in `tokenFormat` config
  Object.keys(getTokenFormat()).forEach((key) => {
    nextHeaders[key] = currentHeaders[key];
  });

  return addAuthorizationHeader(currentHeaders['access-token'], nextHeaders);
};

export const parseResponse = (response) => {
  const json = response.json();
  if (response.status >= 200 && response.status < 300) {
    return json;
  }
  return json.then((err) => Promise.reject(err.errors ? err.errors : err));
};

const updateAuthCredentials = (resp) => {
  // check config apiUrl matches the current response url
  // set header for each key in `tokenFormat` config
  const newHeaders = {};

  // set flag to ensure that we don't accidentally nuke the headers
  // if the response tokens aren't sent back from the API
  let blankHeaders = true;

  // set header key + val for each key in `tokenFormat` config
  Object.keys(getTokenFormat()).forEach((key) => {
    newHeaders[key] = resp.headers.get(key);

    if (newHeaders[key]) {
      blankHeaders = false;
    }
  });

  // persist headers for next request
  if (!blankHeaders) {
    persistData(SAVED_CREDS_KEY, newHeaders);
  }

  return resp;
};

const apiFetch = (endpoint, options) => {
  // endpoint = __API_URL__ + endpoint;
  const endpointPath = endpoint.replace('localhost', window.location.hostname);
  const fetchOptions = options;
  if (typeof options.body === 'object' && Object.keys(options.body).length > 0) {
    const formData = new FormData();
    makeFormData(formData, fetchOptions.body);
    fetchOptions.body = formData;
  }
  info(`Fetching: ${endpointPath}`);
  trace('Options', fetchOptions);
  return fetch(endpointPath, fetchOptions);
};

const validateCall = ({ endpoint, types, method, payload }) => {
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every((type) => (typeof type === 'string' || typeof type === 'function'))) {
    throw new Error('Expected action types to be strings or functions.');
  }
  if (method === 'GET' && payload) {
    throw new Error('Sent body with GET request to CALL_API, must use POST or PUT.');
  }
};

const apiHandler = (store, action, next) => {
  if (_.isUndefined(action)) {
    return next();
  } else if (_.isUndefined(action[CALL_API])) {
    // not an API call, pass it through
    return next(action);
  }

  const callApi = action[CALL_API];
  const { endpoint, method = 'GET' } = callApi;
  const { types, payload } = callApi;
  const [requestType, successType, failureType] = types;
  info(`Call to API: ${types[0]}`, { _action: { ...action[CALL_API], callApi: true } });

  const endpointPath = typeof endpoint === 'function' ? endpoint(store.getState()) : endpoint;

  validateCall({ endpoint: endpointPath, types, method, payload });

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  next(actionWith({ type: requestType }));

  const responseFailure = (err) => {
    if (err.name === 'ValidationError') {
      warn(`Validation Failure: ${err.message}`);
    } else {
      warn(`${err && err.name ? err.name : 'Fetch Error'} - ${err.message}`);
    }

    if (typeof failureType === 'function') {
      return next(
        failureType(err)
      );
    }
    return next(
      actionWith({
        payload: err,
        type: failureType
      })
    );
  };

  const responseSuccess = ({ data }) => {
    info(`Fetch success: ${JSON.stringify(data).length} characters returned`);
    if (data.errors && data.errors.length > 0) {
      // successful fetch but validation errors returned
      return responseFailure({
        name: 'ValidationError',
        message: data.errors.map((e) => e.message).join('\n')
      });
    }
    if (typeof successType === 'function') {
      return next(
        successType(data)
      );
    }
    return next(
      actionWith({
        payload: data,
        type: successType
      })
    );
  };

  const options = {
    method,
    headers: getAuthHeaders(endpointPath),
    body: _.isObject(payload) ? JSON.stringify(payload) : payload
  };

  return apiFetch(endpointPath, options)
    .then((resp) => updateAuthCredentials(resp))
    .then((resp) => parseResponse(resp))
    .then(responseSuccess, responseFailure);
};

export const actionLogger = (store) => (next) => (action) => {
  // meta.form, meta.field
  const { warn: warnAction, trace: traceAction } = initLog('api-action');
  if (_.isUndefined(action)) {
    warnAction('undefined action');
  } else {
    traceAction(`Action: ${padRight(action.type)}`, { _action: { ...action } });
    apiHandler(store, action, next);
  }
};

export default (store) => (next) => (action) => apiHandler(store, action, next);
