import { getCurrentEndpointKey } from 'utils/auth/sessionStorage.js';

import * as A from 'constants/auth';

const initialState = {
  attributes: null,
  isSignedIn: false,
  firstTimeLogin: false,
  mustResetPassword: false,
  endpointKey: null
};

const ACTION_HANDLERS = {
  [A.AUTHENTICATE_COMPLETE]: (state, { payload }) => ({
    ...state,
    ...{
      isSignedIn: true,
      attributes: payload.user,
      endpointKey: getCurrentEndpointKey(),
      endpoints: payload.endpoints
    }
  }),

  [A.AUTHENTICATE_ERROR]: (state, { payload }) => ({
    ...state,
    endpoints: payload.endpoints
  }),

  [A.SS_TOKEN_VALIDATION_COMPLETE]: (state, { user, mustResetPassword, firstTimeLogin }) => ({
    ...state,
    ...{
      attributes: user,
      isSignedIn: true,
      firstTimeLogin,
      mustResetPassword
    }
  }),

  [A.CURRENT_ENDPOINT_KEY]: (state, { currentEndpointKey }) =>
    ({ ...state, ...{ currentEndpointKey } }),

  [A.ENDPOINT_KEYS]: (state, { payload: { currentEndpointKey } }) =>
    ({ ...state, ...{ endpointKey: currentEndpointKey } }),

  [A.EMAIL_SIGN_IN_COMPLETE]: (state, { payload }) =>
    ({ ...state,
      ...{
        attributes: payload.user,
        isSignedIn: true,
        endpointKey: payload.endpoint
      } }),

  // if registration does not require confirmation, user will be signed in at this point.
  [A.EMAIL_SIGN_UP_COMPLETE]: (state, { endpoint, user }) => {
    return (user.uid) ? ({ ...state,
      ...{
        attributes: user,
        isSignedIn: true,
        endpointKey: endpoint
      } }) : state;
  },

  [A.OAUTH_SIGN_IN_COMPLETE]: (state, { payload }) =>
    ({ ...state,
      ...{
        attributes: payload.user,
        isSignedIn: true,
        endpointKey: payload.endpoint
      } }),

  [A.SS_AUTH_TOKEN_UPDATE]: (state, { user, mustResetPassword, firstTimeLogin }) =>
    ({ ...state,
      ...{
        mustResetPassword,
        firstTimeLogin,
        isSignedIn: !!user,
        attributes: user
      } }),

  [A.AUTHENTICATE_FAILURE]:     state => ({ ...state, ...initialState }),
  [A.SS_TOKEN_VALIDATION_ERROR]:  state => ({ ...state, ...initialState }),
  [A.SIGN_OUT_COMPLETE]:        state => ({ ...state, ...initialState }),
  [A.SIGN_OUT_ERROR]:           state => ({ ...state, ...initialState }),
  [A.DESTROY_ACCOUNT_COMPLETE]: state => ({ ...state, ...initialState })
};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
