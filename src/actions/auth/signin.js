import {
  getEmailSignInUrl,
  setCurrentEndpointKey,
  getCurrentEndpointKey,
  getTokenValidationPath,
  getOAuthUrl,
  persistData
} from 'utils/auth/sessionStorage';
import { storeCurrentEndpointKey } from './auth';
import { CALL_API } from 'middleware/api';
import fetch, { parseResponse } from 'utils/fetch';
import { getAllParams, normalizeTokenKeys } from 'utils/auth/parseUrl';
import _openPopup from 'utils/popup';
import { uiShowSnackbar } from 'actions/ui';
import * as A from 'constants/auth';

export const emailSignInFormUpdate = (endpoint, key, value) => ({
  type: A.EMAIL_SIGN_IN_FORM_UPDATE,
  endpoint,
  key,
  value
});

export const emailSignInStart = (endpoint) => ({
  type: A.EMAIL_SIGN_IN_START,
  payload: { endpoint }
});

export const emailSignInComplete = (endpoint, user) => (dispatch) => {
  dispatch(uiShowSnackbar('You are now signed in.', 'success', 'Success'));

  dispatch({
    type: A.EMAIL_SIGN_IN_COMPLETE,
    payload: { user, endpoint }
  });
};

export const emailSignInError = (endpoint, errors) => ({
  type: A.EMAIL_SIGN_IN_ERROR,
  payload: { errors },
  meta: { endpoint }
});

export const emailSignIn = (body, endpointKey) => {
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
            ({ data }) => emailSignInComplete(currentEndpointKey, data),
            (errors) => signInError(errors)
          ],
          method: 'POST',
          payload: JSON.stringify(body),
          endpoint: getEmailSignInUrl(currentEndpointKey)
        }
      });
    };
    return callApi();
  };
};

// oAuth signin
export const oAuthSignInStart      = (provider, endpoint) => ({ type: A.OAUTH_SIGN_IN_START, provider, endpoint });
export const oAuthSignInComplete   = (user, endpoint) => ({ type: A.OAUTH_SIGN_IN_COMPLETE, user, endpoint });
export const oAuthSignInError      = (errors, endpoint) => ({ type: A.OAUTH_SIGN_IN_ERROR, errors, endpoint });

// hook for rewire
var openPopup = _openPopup;
const listenForCredentials = (endpointKey, popup, provider, resolve, reject) => {
  if (!resolve) {
    return new Promise((resolve, reject) => {
      listenForCredentials(endpointKey, popup, provider, resolve, reject);
    });
  } else {
    let creds;

    try {
      creds = getAllParams(popup.location);
    } catch (err) { throw Error(err); }

    if (creds && creds.uid) {
      popup.close();
      persistData(A.SAVED_CREDS_KEY, normalizeTokenKeys(creds));
      fetch(getTokenValidationPath(endpointKey))
        .then(parseResponse)
        .then(({ data }) => resolve(data))
        .catch(({ errors }) => reject({ errors }));
    } else if (popup.closed) {
      reject({ errors: 'Authentication was cancelled.' });
    } else {
      setTimeout(() => {
        listenForCredentials(endpointKey, popup, provider, resolve, reject);
      }, 0);
    }
  }
};

const authenticate = ({ endpointKey, provider, url, tab = false }) => {
  let name = (tab) ? '_blank' : provider;
  let popup = openPopup(provider, url, name);
  return listenForCredentials(endpointKey, popup, provider);
};

export const oAuthSignIn = ({ provider, params, endpointKey }) => {
  return dispatch => {
    // save previous endpoint key in case of failure
    var prevEndpointKey = getCurrentEndpointKey();

    // necessary for `fetch` to recognize the response as an api request
    setCurrentEndpointKey(endpointKey);
    dispatch(storeCurrentEndpointKey(endpointKey));

    var currentEndpointKey = getCurrentEndpointKey();

    dispatch(oAuthSignInStart(provider, currentEndpointKey));

    let url = getOAuthUrl({ provider, params, currentEndpointKey });

    return authenticate({ endpointKey, provider, url })
      .then(user => dispatch(oAuthSignInComplete(user, currentEndpointKey)))
      .catch(({ errors }) => {
        // revert endpoint key to what it was before failed request
        setCurrentEndpointKey(prevEndpointKey);
        dispatch(storeCurrentEndpointKey(prevEndpointKey));
        dispatch(oAuthSignInError(errors, currentEndpointKey));
        throw errors;
      });
  };
};
