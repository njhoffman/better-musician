import * as A from 'constants/ui';
import { injectReducer } from 'store/reducers';
import { fetchSongs } from 'store/api';

export const uiHideDrawerMenu   = () => ({ type: A.UI_HIDE_DRAWER_MENU });
export const uiToggleDrawerMenu = () => ({ type: A.UI_TOGGLE_DRAWER_MENU });
export const uiShowSnackbar     = () => ({ type: A.UI_SHOW_SNACKBAR });
export const uiHideSnackbar     = () => ({ type: A.UI_HIDE_SNACKBAR });
export const uiHideModal        = () => ({ type: A.UI_HIDE_MODAL });
export const uiShowModal        = (type, viewType) => ({
  type: A.UI_SHOW_MODAL,
  meta: { type, props: { action: viewType } }
});

export const initView = (store, history, route) => {
  store.dispatch({ type: A.INIT_VIEW_START, payload: route });
  injectReducer({
    key: `${route}View`,
    reducer: require(`routes/${route}/modules/reducer`).default,
    store,
    history
  });
  // TODO: have this as upstream route property
  if (['songs', 'fields', 'settings', 'stats'].indexOf(route.toLowerCase()) !== -1) {
    fetchSongs(store);
  }
  store.dispatch({ type: A.INIT_VIEW_COMPLETE, payload: route });
};

export const hideEmailSignInSuccessModal          = () => ({ type: A.HIDE_EMAIL_SIGN_IN_SUCCESS_MODAL });
export const hideEmailSignInErrorModal            = () => ({ type: A.HIDE_EMAIL_SIGN_IN_ERROR_MODAL });
export const hideOAuthSignInSuccessModal          = () => ({ type: A.HIDE_OAUTH_SIGN_IN_SUCCESS_MODAL });
export const hideOAuthSignInErrorModal            = () => ({ type: A.HIDE_OAUTH_SIGN_IN_ERROR_MODAL });
export const hideSignOutSuccessModal              = () => ({ type: A.HIDE_SIGN_OUT_SUCCESS_MODAL });
export const hideSignOutErrorModal                = () => ({ type: A.HIDE_SIGN_OUT_ERROR_MODAL });
export const hideEmailSignUpSuccessModal          = () => ({ type: A.HIDE_EMAIL_SIGN_UP_SUCCESS_MODAL });
export const hideEmailSignUpErrorModal            = () => ({ type: A.HIDE_EMAIL_SIGN_UP_ERROR_MODAL });
export const showFirstTimeLoginSuccessModal       = () => ({ type: A.SHOW_FIRST_TIME_LOGIN_SUCCESS_MODAL });
export const showPasswordResetSuccessModal        = () => ({ type: A.SHOW_PASSWORD_RESET_SUCCESS_MODAL });
export const hideFirstTimeLoginSuccessModal       = () => ({ type: A.HIDE_FIRST_TIME_LOGIN_SUCCESS_MODAL });
export const hidePasswordResetSuccessModal        = () => ({ type: A.HIDE_PASSWORD_RESET_SUCCESS_MODAL });
export const showFirstTimeLoginErrorModal         = () => ({ type: A.SHOW_FIRST_TIME_LOGIN_ERROR_MODAL });
export const showPasswordResetErrorModal          = () => ({ type: A.SHOW_PASSWORD_RESET_ERROR_MODAL });
export const hideFirstTimeLoginErrorModal         = () => ({ type: A.HIDE_FIRST_TIME_LOGIN_ERROR_MODAL });
export const hidePasswordResetErrorModal          = () => ({ type: A.HIDE_PASSWORD_RESET_ERROR_MODAL });
export const hidePasswordResetRequestSuccessModal = () => ({ type: A.HIDE_REQUEST_PASSWORD_RESET_SUCCESS_MODAL });
export const hidePasswordResetRequestErrorModal   = () => ({ type: A.HIDE_REQUEST_PASSWORD_RESET_ERROR_MODAL });
export const hideUpdatePasswordSuccessModal       = () => ({ type: A.HIDE_UPDATE_PASSWORD_SUCCESS_MODAL });
export const hideUpdatePasswordErrorModal         = () => ({ type: A.HIDE_UPDATE_PASSWORD_ERROR_MODAL });
export const hideDestroyAccountSuccessModal       = () => ({ type: A.HIDE_DESTROY_ACCOUNT_SUCCESS_MODAL });
export const hideDestroyAccountErrorModal         = () => ({ type: A.HIDE_DESTROY_ACCOUNT_ERROR_MODAL });
