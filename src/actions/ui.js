import * as UI from 'constants/ui';
import { injectReducer } from 'store/reducers';


export const uiHideDrawerMenu = () => ({ type: UI.DRAWER_MENU_HIDE });
export const uiShowDrawerMenu = () => ({ type: UI.DRAWER_MENU_SHOW });
export const uiToggleDrawerMenu = () => ({ type: UI.DRAWER_MENU_TOGGLE });
export const uiSnackbarExit = (moreMessage) => ({ type: UI.SNACKBAR_EXIT });
export const uiHideSnackbar = () => ({ type: UI.SNACKBAR_HIDE });
export const uiShowSnackbar = (message, variant, title, styleVariant) => (dispatch) => {
  dispatch({
    type: UI.SNACKBAR_SHOW,
    payload: message,
    meta: { variant, title, styleVariant }
  });
};

export const uiHideModal = () => ({ type: UI.MODAL_HIDE });
export const uiModalExit = () => ({ type: UI.MODAL_EXIT });

export const uiShowModal = (name, viewType, meta) => ({
  type: UI.MODAL_SHOW,
  payload: name,
  meta: { variant: viewType, ...meta }
});

export const uiUpdateModal = (name, meta) => (dispatch) => {
  dispatch({
    type: UI.MODAL_UPDATE,
    payload: name,
    meta
  });
};


export const uiShowSongModal = (type) => (dispatch) => {
  dispatch(uiShowModal(UI.SONG_MODAL, type, { currentTab: 'main-fields' }));
};

export const uiChangeSongModalView = (type) => (dispatch) => {
  dispatch(uiShowModal(UI.SONG_MODAL, type));
};

export const uiWindowResize = (clientInfo) => (dispatch) => {
  dispatch({
    type: UI.WINDOW_RESIZE,
    payload: { clientInfo }
  });
};

export const initViewStart = ({ routeName, store, history }) => {
  store.dispatch({ type: UI.INIT_VIEW_START, payload: routeName });

  /* eslint-disable global-require, import/no-dynamic-require */
  injectReducer({
    key: `${routeName}View`,
    reducer: require(`routes/${routeName}/modules/reducer`).default,
    store,
    history
  });
  /* eslint-enable global-require, import/no-dynamic-require */
};

export const initViewComplete = ({ routeName, pathname, isAuthenticated, dispatch }) => {
  dispatch({
    type: UI.INIT_VIEW_COMPLETE,
    payload: routeName,
    meta: { pathname, isAuthenticated }
  });
};

export const hideEmailSignInSuccessModal          = () => ({ type: UI.HIDE_EMAIL_SIGN_IN_SUCCESS_MODAL });
export const hideEmailSignInErrorModal            = () => ({ type: UI.HIDE_EMAIL_SIGN_IN_ERROR_MODAL });
export const hideOAuthSignInSuccessModal          = () => ({ type: UI.HIDE_OAUTH_SIGN_IN_SUCCESS_MODAL });
export const hideOAuthSignInErrorModal            = () => ({ type: UI.HIDE_OAUTH_SIGN_IN_ERROR_MODAL });
export const hideSignOutSuccessModal              = () => ({ type: UI.HIDE_SIGN_OUT_SUCCESS_MODAL });
export const hideSignOutErrorModal                = () => ({ type: UI.HIDE_SIGN_OUT_ERROR_MODAL });
export const hideEmailSignUpSuccessModal          = () => ({ type: UI.HIDE_EMAIL_SIGN_UP_SUCCESS_MODAL });
export const hideEmailSignUpErrorModal            = () => ({ type: UI.HIDE_EMAIL_SIGN_UP_ERROR_MODAL });
export const showFirstTimeLoginSuccessModal       = () => ({ type: UI.SHOW_FIRST_TIME_LOGIN_SUCCESS_MODAL });
export const showPasswordResetSuccessModal        = () => ({ type: UI.SHOW_PASSWORD_RESET_SUCCESS_MODAL });
export const hideFirstTimeLoginSuccessModal       = () => ({ type: UI.HIDE_FIRST_TIME_LOGIN_SUCCESS_MODAL });
export const hidePasswordResetSuccessModal        = () => ({ type: UI.HIDE_PASSWORD_RESET_SUCCESS_MODAL });
export const showFirstTimeLoginErrorModal         = () => ({ type: UI.SHOW_FIRST_TIME_LOGIN_ERROR_MODAL });
export const showPasswordResetErrorModal          = () => ({ type: UI.SHOW_PASSWORD_RESET_ERROR_MODAL });
export const hideFirstTimeLoginErrorModal         = () => ({ type: UI.HIDE_FIRST_TIME_LOGIN_ERROR_MODAL });
export const hidePasswordResetErrorModal          = () => ({ type: UI.HIDE_PASSWORD_RESET_ERROR_MODAL });
export const hidePasswordResetRequestSuccessModal = () => ({ type: UI.HIDE_REQUEST_PASSWORD_RESET_SUCCESS_MODAL });
export const hidePasswordResetRequestErrorModal   = () => ({ type: UI.HIDE_REQUEST_PASSWORD_RESET_ERROR_MODAL });
export const hideUpdatePasswordSuccessModal       = () => ({ type: UI.HIDE_UPDATE_PASSWORD_SUCCESS_MODAL });
export const hideUpdatePasswordErrorModal         = () => ({ type: UI.HIDE_UPDATE_PASSWORD_ERROR_MODAL });
export const hideDestroyAccountSuccessModal       = () => ({ type: UI.HIDE_DESTROY_ACCOUNT_SUCCESS_MODAL });
export const hideDestroyAccountErrorModal         = () => ({ type: UI.HIDE_DESTROY_ACCOUNT_ERROR_MODAL });
