import {
  getEmailSignInUrl,
  setCurrentEndpointKey,
  getCurrentEndpointKey
} from 'utils/auth/sessionStorage';
import { storeCurrentEndpointKey } from '../auth';
import { CALL_API } from 'middleware/api';
import fetch, { parseResponse } from 'utils/fetch';
import * as A from 'constants/auth';

export function emailSignInFormUpdate(endpoint, key, value) {
  return { type: A.EMAIL_SIGN_IN_FORM_UPDATE, endpoint, key, value };
}
export function emailSignInStart(endpoint) {
  return { type: A.EMAIL_SIGN_IN_START, endpoint };
}

export function emailSignInComplete(endpoint, user) {
  return { type: A.EMAIL_SIGN_IN_COMPLETE, payload: { user, endpoint } };
}

export function emailSignInError(endpoint, errors) {
  return { type: A.EMAIL_SIGN_IN_ERROR, errors, endpoint };
}

export function emailSignIn(body, endpointKey) {
  return dispatch => {
    // save previous endpoint key in case of failure
    const prevEndpointKey = getCurrentEndpointKey();

    // necessary for fetch to recognize the response as an api request
    setCurrentEndpointKey(endpointKey);
    const currentEndpointKey = getCurrentEndpointKey();

    dispatch(storeCurrentEndpointKey(currentEndpointKey));

    const signInError = (errors) => {
      setCurrentEndpointKey(prevEndpointKey);
      dispatch(storeCurrentEndpointKey(prevEndpointKey));
      dispatch(emailSignInError(currentEndpointKey, errors));
    };

    const callApi = () => {
      return dispatch({
        [CALL_API]: {
          types: [
            A.EMAIL_SIGN_IN_START,
            (user) => dispatch(emailSignInComplete(currentEndpointKey, user)),
            (errors) => signInError
          ],
          method: 'POST',
          payload: JSON.stringify(body),
          endpoint: getEmailSignInUrl(currentEndpointKey).replace(`${window.location.origin}/api`, '')
        }
      });
    };
    return callApi();
  };
}
