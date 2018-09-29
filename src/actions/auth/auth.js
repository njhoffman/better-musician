import * as A from 'constants/auth';

export const authenticateStart = () => ({ type: A.AUTHENTICATE_START });
export const authenticateComplete = (user, endpoints) => ({
  type: A.AUTHENTICATE_COMPLETE,
  payload: { user, endpoints }
});
export const authenticateError = (errors, endpoints) => ({
  type: A.AUTHENTICATE_ERROR,
  payload: { errors, endpoints }
});

export const setEndpointKeys = (endpointKeys, currentEndpointKey, defaultEndpointKey) => ({
  type: A.ENDPOINT_KEYS,
  payload: { endpointKeys, currentEndpointKey, defaultEndpointKey }
});

export const storeCurrentEndpointKey = (currentEndpointKey) => ({
  type: A.CURRENT_ENDPOINT_KEY, payload: currentEndpointKey
});
