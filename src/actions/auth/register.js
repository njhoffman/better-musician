import {
  getEmailSignUpUrl,
  setCurrentEndpointKey,
  getCurrentEndpointKey
} from 'utils/auth/sessionStorage';

import { CALL_API } from 'middleware/api';
import * as AUTH from 'constants/auth';
import { uiShowSnackbar } from 'actions/ui';
import { authenticateComplete, storeCurrentEndpointKey } from 'actions/auth';

export const emailSignUpFormUpdate = (endpoint, key, value) =>
  ({ type: AUTH.EMAIL_SIGN_UP_FORM_UPDATE, endpoint, key, value });


export const emailSignUpStart = (endpoint) => ({
  type: AUTH.EMAIL_SIGN_IN_START,
  payload: { endpoint }
});

export const emailSignUpComplete = (endpoint, user) => (dispatch, getState) => {
  const { config: { endpoints } } = getState();
  dispatch(uiShowSnackbar('You are now signed in.', 'success', 'Success'));
  dispatch(authenticateComplete(user, endpoints));
  dispatch({
    type: AUTH.EMAIL_SIGN_IN_COMPLETE,
    payload: { user, endpoint }
  });
  return Promise.resolve({ user, endpoint });
};

export const emailSignUpError = (endpoint, errors) => ({
  type: AUTH.EMAIL_SIGN_IN_ERROR,
  payload: { errors },
  meta: { endpoint }
});


export const emailSignUp = (body, endpointKey) => (dispatch) => {
  // save previous endpoint key in case of failure
  const prevEndpointKey = getCurrentEndpointKey();

  // necessary for fetch to recognize the response as an api request
  setCurrentEndpointKey(endpointKey);
  const currentEndpointKey = getCurrentEndpointKey();

  dispatch(storeCurrentEndpointKey(currentEndpointKey));

  const signUpError = (errors) => () => {
    setCurrentEndpointKey(prevEndpointKey);
    dispatch(storeCurrentEndpointKey(prevEndpointKey));
    dispatch(emailSignUpError(currentEndpointKey, errors));
    return Promise.reject(new Error(errors.message));
  };


  return dispatch({
    [CALL_API]: {
      types: [
        AUTH.EMAIL_SIGN_IN_START,
        (data) => emailSignUpComplete(currentEndpointKey, data),
        (errors) => signUpError(errors)
      ],
      method: 'POST',
      payload: JSON.stringify(body),
      endpoint: getEmailSignUpUrl(currentEndpointKey)
    }
  });
};
