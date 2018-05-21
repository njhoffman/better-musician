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

export const EMAIL_SIGN_IN_START       = 'EMAIL_SIGN_IN_START';
export const EMAIL_SIGN_IN_COMPLETE    = 'EMAIL_SIGN_IN_COMPLETE';
export const EMAIL_SIGN_IN_ERROR       = 'EMAIL_SIGN_IN_ERROR';
export const EMAIL_SIGN_IN_FORM_UPDATE = 'EMAIL_SIGN_IN_FORM_UPDATE';

export const SIGN_OUT_START    = 'SIGN_OUT_START';
export const SIGN_OUT_COMPLETE = 'SIGN_OUT_COMPLETE';
export const SIGN_OUT_ERROR    = 'SIGN_OUT_ERROR';

export const configureStart = () => ({ type: CONFIGURE_START });
export const configureComplete = (config) => ({ type: CONFIGURE_COMPLETE, payload: config });

export const authenticateStart = () => ({ type: AUTHENTICATE_START });
export const authenticateComplete = (user) => ({ type: AUTHENTICATE_COMPLETE, payload: user });
export const authenticateError = (errors) => ({ type: AUTHENTICATE_ERROR, payload: errors });

export const setEndpointKeys = (endpoints, currentEndpointKey, defaultEndpointKey) => ({
  type: SET_ENDPOINT_KEYS, endpoints, currentEndpointKey, defaultEndpointKey
});

export const storeCurrentEndpointKey = (currentEndpointKey) => ({
  type: STORE_CURRENT_ENDPOINT_KEY, currentEndpointKey
});

export const emailSignInFormUpdate = (endpoint, key, value) =>
  ({ type: EMAIL_SIGN_IN_FORM_UPDATE, endpoint, key, value });

export const emailSignInStart = (endpoint) =>
  ({ type: EMAIL_SIGN_IN_START, endpoint });

export const emailSignInComplete = (endpoint, user) =>
  ({ type: EMAIL_SIGN_IN_COMPLETE, user, endpoint });

export const emailSignInError = (endpoint, errors) =>
  ({ type: EMAIL_SIGN_IN_ERROR, errors, endpoint });

export const emailSignIn = (body, endpointKey) => (dispatch) => {
  // save previous endpoint key in case of failure
  const prevEndpointKey = getCurrentEndpointKey();

  // necessary for fetch to recognize the response as an api request
  setCurrentEndpointKey(endpointKey);
  const currentEndpointKey = getCurrentEndpointKey();

  dispatch(storeCurrentEndpointKey(currentEndpointKey));
  dispatch(emailSignInStart(currentEndpointKey));

  return fetch(getEmailSignInUrl(currentEndpointKey), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(body)
  }).then(parseResponse)
    .then((user) => dispatch(emailSignInComplete(currentEndpointKey, user)))
    .catch((errors) => {
      // revert endpoint key to what it was before failed request
      setCurrentEndpointKey(prevEndpointKey);
      dispatch(storeCurrentEndpointKey(prevEndpointKey));
      dispatch(emailSignInError(currentEndpointKey, errors));
      throw errors;
    });
};

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
