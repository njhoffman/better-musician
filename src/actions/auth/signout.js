import {
  getSignOutUrl,
  destroySession
} from 'utils/auth/sessionStorage';

import * as A from 'constants/auth';
import { uiShowSnackbar } from 'actions/ui';
import { storeCurrentEndpointKey } from 'actions/auth';
import fetch, { parseResponse } from 'utils/fetch';

export const signOutStart = (endpoint) => ({ type: A.SIGN_OUT_START, endpoint });
export const signOutComplete = (endpoint, user) => ({ type: A.SIGN_OUT_COMPLETE, user, endpoint });
export const signOutError = (endpoint, errors) => ({ type: A.SIGN_OUT_ERROR, endpoint, errors });

export const signOut = (endpoint) => (dispatch) => {
  dispatch(signOutStart(endpoint));

  return fetch(getSignOutUrl(endpoint), { method: 'delete' })
    .then(parseResponse)
    .then((user) => {
      dispatch(uiShowSnackbar('You have successfully logged out of your account.', 'success'));
      dispatch(signOutComplete(endpoint, user));
      dispatch(storeCurrentEndpointKey('default'));
      destroySession();
    })
    .catch(({ errors }) => {
      dispatch(signOutError(endpoint, errors));
      dispatch(storeCurrentEndpointKey('default'));
      destroySession();
      throw errors;
    });
};
