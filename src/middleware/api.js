import { fetch } from 'redux-auth';
import { init as initLog } from 'shared/logger';
import webpackVariables from 'webpackVariables';

const { error, log, trace } = initLog('middlewareApi');

// TODO: make api return nested data, implement normalizing here

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

const apiFetch = (endpoint, options) => {
  endpoint = webpackVariables.apiUrl + endpoint;
  if (options.body) {
    let formData = new FormData();
    Object.keys(options.body).forEach(key => {
      if (Array.isArray(options.body[key])) {
        options.body[key].forEach(item => {
          formData.append(key, item);
        });
      } else if (typeof options.body[key] === 'object') {
        // supported up to 1 level nested object depth for now
        Object.keys(options.body[key]).forEach(ok => {
          formData.set(key + '.' + ok, options.body[key][ok]);
        });
      } else {
        formData.set(key, options.body[key]);
      }
    });
    options.body = formData;
  }
  log(`Fetching: ${endpoint}`);
  trace('Options', options);
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

export default (store) => next => action => {
  const callApi = action[CALL_API];
  if (typeof callApi === 'undefined') {
    return next(action);
  }

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
  };

  const responseFailure = (err) => {
    error(`Fetch Failure: ${err.name}: ${err.message}`);
    return next(
      actionWith({
        type: failureType,
        error: err.message || 'Something bad happened'
      }));
  };

  const options = {
    method,
    body: payload
  };

  return apiFetch(endpoint, options)
    .then(responseSuccess, responseFailure);
};
