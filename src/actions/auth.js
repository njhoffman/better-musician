import {
  getSignOutUrl,
  destroySession,
  getEmailSignInUrl,
  getCurrentEndpointKey
} from 'utils/auth/sessionStorage';

import fetch, { parseResponse } from 'utils/fetch';

export const AUTHENTICATE_START    = 'AUTHENTICATE_START';
export const AUTHENTICATE_COMPLETE = 'AUTHENTICATE_COMPLETE';
export const AUTHENTICATE_ERROR    = 'AUTHENTICATE_ERROR';

export const SET_ENDPOINT_KEYS = 'SET_ENDPOINT_KEYS';
export const STORE_CURRENT_ENDPOINT_KEY = 'STORE_CURRENT_ENDPOINT_KEY';

export const CONFIGURE_START = 'CONFIGURE_START';
export const CONFIGURE_COMPLETE = 'CONFIGURE_COMPLETE';

export const SIGN_OUT_START    = 'SIGN_OUT_START';
export const SIGN_OUT_COMPLETE = 'SIGN_OUT_COMPLETE';
export const SIGN_OUT_ERROR    = 'SIGN_OUT_ERROR';

export const configureStart = () => ({ type: CONFIGURE_START });
export const configureComplete = (config) => ({ type: CONFIGURE_COMPLETE, payload: config });

export const authenticateStart = () => ({ type: AUTHENTICATE_START });
export const authenticateComplete = (user, endpoints) => ({
  type: AUTHENTICATE_COMPLETE,
  payload: { user, endpoints }
});
export const authenticateError = (errors, endpoints) => ({
  type: AUTHENTICATE_ERROR,
  payload: { errors, endpoints }
});

export const setEndpointKeys = (endpointKeys, currentEndpointKey, defaultEndpointKey) => ({
  type: SET_ENDPOINT_KEYS, endpointKeys, currentEndpointKey, defaultEndpointKey
});

export const storeCurrentEndpointKey = (currentEndpointKey) => ({
  type: STORE_CURRENT_ENDPOINT_KEY, currentEndpointKey
});

export const signOutStart = (endpoint) => ({ type: SIGN_OUT_START, endpoint });
export const signOutComplete = (endpoint, user) => ({ type: SIGN_OUT_COMPLETE, user, endpoint });
export const signOutError = (endpoint, errors) => ({ type: SIGN_OUT_ERROR, endpoint, errors });

export const signOut = (endpoint) => (dispatch) => {
  dispatch(signOutStart(endpoint));

  return fetch(getSignOutUrl(endpoint), { method: 'delete' })
    .then(parseResponse)
    .then((user) => {
      dispatch(signOutComplete(endpoint, user));
      dispatch(storeCurrentEndpointKey(null));
      destroySession();
    })
    .catch(({ errors }) => {
      dispatch(signOutError(endpoint, errors));
      dispatch(storeCurrentEndpointKey(null));
      destroySession();
      throw errors;
    });
};
