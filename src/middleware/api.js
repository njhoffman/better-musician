import fetch from 'store/auth/utils/fetch';

// TODO: make api return nested data, implement normalizing here

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const apiFetch = (endpoint, schema) => {

  endpoint = 'http://localhost:3000/api' + endpoint;
  return fetch(endpoint)
    .then(response =>
        response.json()
        .then(json => {
          if (!response.ok) {
            return Promise.reject(json)
          }
          return json.data;
        })
    )
}

export default (store) => next => action => {
	const callAPI = action[CALL_API]
	if (typeof callAPI === 'undefined') {
		return next(action);
	}

  let { endpoint } = callAPI;
  const { types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => (typeof type === 'string' || typeof type === 'function') )) {
    throw new Error('Expected action types to be strings or functions.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;

  next(actionWith({ type: requestType }));

  const responseSuccess = (response) => {
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

  const responseFailure = (error) =>
    next(
      actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }))

  console.info("Fetching: " + endpoint);
  return apiFetch(endpoint)
    .then(responseSuccess, responseFailure);
};


