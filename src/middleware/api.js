import fetch from 'utils/fetch';
import { init as initLog } from 'shared/logger';
import { padRight } from 'shared/util';
import _ from 'lodash';
import webpackVariables from 'webpackVariables';

const {
  /* error,  */
  warn,
  log,
  trace
} = initLog('middlewareApi');

// TODO: make api return nested data, implement normalizing here

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

const makeFormData = (FormData, data, name = '') => {
  if (typeof data === 'object') {
    Object.keys(data).forEach(key => {
      let val = data[key];
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

const apiFetch = (endpoint, options) => {
  endpoint = __API_URL__ + endpoint;
  log(`Fetching: ${endpoint}`);
  trace('Options', options);
  if (typeof options.body === 'object' && Object.keys(options.body).length > 0) {
    let formData = new FormData();
    makeFormData(formData, options.body);
    options.body = formData;
  }
  return fetch(endpoint, options)
    .then(response =>
      response.json()
        .then(json => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json.data;
        })
    );
};

export const actionLogger = (store) => next => action => {
  // meta.form, meta.field
  const { warn, trace } = initLog('api-action');
  if (_.isUndefined(action)) {
    warn('undefined action');
  } else {
    const callApi = action[CALL_API] || false;
    trace(`Action: ${padRight(callApi ? 'CALL_API' : action.type)}`,
      { _action: { ...action, ...{ callApi } } });
    apiHandler(store, action, next);
  }
};

const apiHandler = (store, action, next) => {
  if (_.isUndefined(action)) {
    return;
  } else if (_.isUndefined(action[CALL_API])) {
    return next(action);
  }

  const callApi = action[CALL_API];

  let { endpoint, method = 'GET' } = callApi;
  const { types, payload } = callApi;

  log(`Call to API: ${types[0]}`);

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => (typeof type === 'string' || typeof type === 'function'))) {
    throw new Error('Expected action types to be strings or functions.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, failureType ] = types;

  next(actionWith({ type: requestType }));

  const responseSuccess = (response) => {
    log(`Fetch Success: ${JSON.stringify(response).length} characters returned`);
    // trace(response);
    if (response.errors && response.errors.length > 0) {
      // successful fetch but validation errors returned
      return responseFailure({ name: 'ValidationError', message: response.errors.join('\n') });
    } else {
      if (typeof successType === 'function') {
        return next(
          successType(response)
        );
      } else {
        return next(
          actionWith({
            payload: response,
            type: successType
          }));
      }
    }
  };

  const responseFailure = (err) => {
    if (err.name === 'ValidationError') {
      warn(`Validation Failure: ${err.message}`);
    } else {
      warn(`Fetch Failure: ${err.name} - ${err.message}`);
    }
    if (typeof failureType === 'function') {
      return next(
        failureType(err.message)
      );
    } else {
      return next(
        actionWith({
          payload: err,
          type: failureType
        }));
    }
  };

  const options = {
    method,
    body: payload
  };

  return apiFetch(endpoint, options)
    .then(responseSuccess, responseFailure);
};

export default (store) => next => action => apiHandler(store, action, next);
