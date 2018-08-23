import * as A from 'constants/auth';

const initialState = {
  attributes: null,
  isSignedIn: false,
  firstTimeLogin: false,
  mustResetPassword: false
};

const ACTION_HANDLERS = {
  [A.AUTHENTICATE_COMPLETE]: (state, { payload }) => ({
    ...state,
    isSignedIn: true,
    attributes: payload.user
  }),

  [A.SS_TOKEN_VALIDATION_COMPLETE]: (state, { user, mustResetPassword, firstTimeLogin }) => ({
    ...state,
    attributes: user,
    isSignedIn: true,
    firstTimeLogin,
    mustResetPassword
  }),

  [A.EMAIL_SIGN_IN_COMPLETE]: (state, { payload }) => ({
    ...state,
    attributes: payload.user,
    isSignedIn: true
  }),

  // if registration does not require confirmation, user will be signed in at this point.
  [A.EMAIL_SIGN_UP_COMPLETE]: (state, { endpoint, user }) => {
    return (user.uid ? ({
      ...state,
      attributes: user,
      isSignedIn: true
    }) : state);
  },

  [A.OAUTH_SIGN_IN_COMPLETE]: (state, { payload }) => ({
    ...state,
    attributes: payload.user,
    isSignedIn: true
  }),

  [A.SS_AUTH_TOKEN_UPDATE]: (state, { user, mustResetPassword, firstTimeLogin }) => ({
    ...state,
    mustResetPassword,
    firstTimeLogin,
    isSignedIn: Boolean(user),
    attributes: user
  }),

  [A.AUTHENTICATE_FAILURE]:     state => ({ ...state, ...initialState }),
  [A.SS_TOKEN_VALIDATION_ERROR]:  state => ({ ...state, ...initialState }),
  [A.SIGN_OUT_COMPLETE]:        state => ({ ...state, ...initialState }),
  [A.SIGN_OUT_ERROR]:           state => ({ ...state, ...initialState }),
  [A.DESTROY_ACCOUNT_COMPLETE]: state => ({ ...state, ...initialState })
};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
