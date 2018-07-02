import * as A from 'constants/auth';
import fetch, { parseResponse } from 'utils/fetch';

export const configureStart = () => ({ type: A.CONFIGURE_START });
export const configureComplete = (config) => ({ type: A.CONFIGURE_COMPLETE, payload: config });

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
  type: A.CURRENT_ENDPOINT_KEY, currentEndpointKey
});
