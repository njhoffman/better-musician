import * as AUTH from 'constants/auth';

export const authenticateStart = () => ({ type: AUTH.AUTHENTICATE_START });

export const authenticateComplete = (user, endpoints) => ({
  type: AUTH.AUTHENTICATE_COMPLETE,
  payload: { user, endpoints }
});

export const authenticateError = (errors, endpoints) => ({
  type: AUTH.AUTHENTICATE_ERROR,
  payload: { errors, endpoints }
});

export const setEndpointKeys = (endpointKeys, currentEndpointKey, defaultEndpointKey) => ({
  type: AUTH.ENDPOINT_KEYS,
  payload: { endpointKeys, currentEndpointKey, defaultEndpointKey }
});

export const storeCurrentEndpointKey = (currentEndpointKey) => ({
  type: AUTH.CURRENT_ENDPOINT_KEY, payload: currentEndpointKey
});

export const ssAuthTokenUpdate = ({ user, headers, mustResetPassword, firstTimeLogin, endpointKey }) => ({
  type: AUTH.SS_AUTH_TOKEN_UPDATE,
  user,
  headers,
  mustResetPassword,
  firstTimeLogin,
  endpointKey
});
