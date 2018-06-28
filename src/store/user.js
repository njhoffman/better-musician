import { getCurrentEndpointKey } from 'utils/auth/sessionStorage.js';

import {
  AUTHENTICATE_COMPLETE,
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_ERROR,
  EMAIL_SIGN_IN_COMPLETE,
  EMAIL_SIGN_UP_COMPLETE,
  OAUTH_SIGN_IN_COMPLETE,
  SIGN_OUT_COMPLETE,
  SIGN_OUT_ERROR,
  DESTROY_ACCOUNT_COMPLETE,
  SS_AUTH_TOKEN_UPDATE,
  SS_TOKEN_VALIDATION_COMPLETE,
  SS_TOKEN_VALIDATION_ERROR,
  STORE_CURRENT_ENDPOINT_KEY,
  SET_ENDPOINT_KEYS
} from 'constants/auth';

const initialState = {
  attributes: null,
  isSignedIn: false,
  firstTimeLogin: false,
  mustResetPassword: false,
  endpointKey: null
};

const ACTION_HANDLERS = {
  [AUTHENTICATE_COMPLETE]: (state, { payload }) => ({
    ...state,
    ...{
      isSignedIn: true,
      attributes: payload.user,
      endpointKey: getCurrentEndpointKey(),
      endpoints: payload.endpoints
    }
  }),

  [AUTHENTICATE_ERROR]: (state, { payload }) => ({
    ...state,
    endpoints: payload.endpoints
  }),

  [SS_TOKEN_VALIDATION_COMPLETE]: (state, { user, mustResetPassword, firstTimeLogin }) => ({
    ...state,
    ...{
      attributes: user,
      isSignedIn: true,
      firstTimeLogin,
      mustResetPassword
    }
  }),

  [STORE_CURRENT_ENDPOINT_KEY]: (state, { currentEndpointKey }) =>
    ({ ...state, ...{ currentEndpointKey } }),

  [SET_ENDPOINT_KEYS]: (state, { currentEndpointKey }) =>
    ({ ...state, ...{ endpointKey: currentEndpointKey } }),

  [EMAIL_SIGN_IN_COMPLETE]: (state, { payload }) =>
    ({ ...state,
      ...{
        attributes: payload.user,
        isSignedIn: true,
        endpointKey: payload.endpoint
      } }),

  // if registration does not require confirmation, user will be signed in at this point.
  [EMAIL_SIGN_UP_COMPLETE]: (state, { endpoint, user }) => {
    return (user.uid) ? ({ ...state,
      ...{
        attributes: user,
        isSignedIn: true,
        endpointKey: endpoint
      } }) : state;
  },

  [OAUTH_SIGN_IN_COMPLETE]: (state, { payload }) =>
    ({ ...state,
      ...{
        attributes: payload.user,
        isSignedIn: true,
        endpointKey: payload.endpoint
      } }),

  [SS_AUTH_TOKEN_UPDATE]: (state, { user, mustResetPassword, firstTimeLogin }) =>
    ({ ...state,
      ...{
        mustResetPassword,
        firstTimeLogin,
        isSignedIn: !!user,
        attributes: user
      } }),

  [AUTHENTICATE_FAILURE]:     state => ({ ...state, ...initialState }),
  [SS_TOKEN_VALIDATION_ERROR]:  state => ({ ...state, ...initialState }),
  [SIGN_OUT_COMPLETE]:        state => ({ ...state, ...initialState }),
  [SIGN_OUT_ERROR]:           state => ({ ...state, ...initialState }),
  [DESTROY_ACCOUNT_COMPLETE]: state => ({ ...state, ...initialState })
};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
