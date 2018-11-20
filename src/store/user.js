import * as AUTH from 'constants/auth';
import * as API from 'constants/api';

const initialState = {
  attributes: null,
  isSignedIn: false,
  firstTimeLogin: false,
  mustResetPassword: false
};

const ACTION_HANDLERS = {
  [API.PROFILE_UPDATE_COMPLETE]: (state, { payload }) => ({
    ...state,
    isSignedIn: true,
    attributes: payload
  }),

  [AUTH.AUTHENTICATE_COMPLETE]: (state, { payload }) => ({
    ...state,
    isSignedIn: true,
    attributes: payload.user
  }),

  [AUTH.SS_TOKEN_VALIDATION_COMPLETE]: (state, { user, mustResetPassword, firstTimeLogin }) => ({
    ...state,
    attributes: user,
    isSignedIn: true,
    firstTimeLogin,
    mustResetPassword
  }),

  // if registration does not require confirmation, user will be signed in at this point.
  [AUTH.EMAIL_SIGN_UP_COMPLETE]: (state, { endpoint, user }) => (
    user.uid ? ({
      ...state,
      attributes: user,
      isSignedIn: true
    }) : state
  ),

  [AUTH.SS_AUTH_TOKEN_UPDATE]: (state, { user, mustResetPassword, firstTimeLogin }) => ({
    ...state,
    mustResetPassword,
    firstTimeLogin,
    isSignedIn: Boolean(user),
    attributes: user
  }),

  [AUTH.AUTHENTICATE_ERROR]:        (state) => ({ ...state, ...initialState }),
  [AUTH.SS_TOKEN_VALIDATION_ERROR]: (state) => ({ ...state, ...initialState }),
  [AUTH.SIGN_OUT_COMPLETE]:         (state) => ({ ...state, ...initialState }),
  [AUTH.SIGN_OUT_ERROR]:            (state) => ({ ...state, ...initialState }),
  [AUTH.DESTROY_ACCOUNT_COMPLETE]:  (state) => ({ ...state, ...initialState })
};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
