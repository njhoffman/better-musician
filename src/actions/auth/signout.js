import {
  getSignOutUrl,
  destroySession,
} from 'utils/auth/sessionStorage';

import * as A from 'constants/auth';
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
