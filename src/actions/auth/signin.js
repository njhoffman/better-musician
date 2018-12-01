import {
  getEmailSignInUrl,
  setCurrentEndpointKey,
  getCurrentEndpointKey,
  getTokenValidationPath,
  getOAuthUrl,
  persistData
} from 'utils/auth/sessionStorage';
import { CALL_API } from 'middleware/api';
import fetch, { parseResponse } from 'utils/fetch';
import { getAllParams, normalizeTokenKeys } from 'utils/auth/parseUrl';
import _openPopup from 'utils/popup';
import * as AUTH from 'constants/auth';
import { uiShowSnackbar } from 'actions/ui';
import { fetchSongs } from 'actions/api';
import { authenticateComplete, storeCurrentEndpointKey } from 'actions/auth';

export const emailSignInFormUpdate = (endpoint, key, value) => ({
  type: AUTH.EMAIL_SIGN_IN_FORM_UPDATE,
  endpoint,
  key,
  value
});

export const emailSignInComplete = (endpoint, { records, changes }) => (dispatch, getState) => {
  const { config: { endpoints } } = getState();
  dispatch(uiShowSnackbar('You are now signed in.', 'success', 'Success'));
  dispatch(authenticateComplete(records, endpoints));
  dispatch({
    type: AUTH.EMAIL_SIGN_IN_COMPLETE,
    payload: { user: records, endpoint }
  });
  fetchSongs({ dispatch });
};

export const emailSignInError = (endpoint, errors) => ({
  type: AUTH.EMAIL_SIGN_IN_ERROR,
  payload: { errors },
  meta: { endpoint }
});

export const emailSignIn = (body, endpointKey) => (dispatch) => {
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

  return dispatch({
    [CALL_API]: {
      types: [
        AUTH.EMAIL_SIGN_IN_START,
        (data) => emailSignInComplete(currentEndpointKey, data),
        (errors) => signInError(errors)
      ],
      method: 'POST',
      payload: JSON.stringify(body),
      endpoint: getEmailSignInUrl(currentEndpointKey)
    }
  });
};

// oAuth signin
export const oAuthSignInStart = (provider, endpoint) =>
  ({ type: AUTH.OAUTH_SIGN_IN_START, provider, endpoint });

export const oAuthSignInComplete = ({ records, changes }, endpoint) =>
  ({ type: AUTH.OAUTH_SIGN_IN_COMPLETE, records, endpoint });

export const oAuthSignInError = (errors, endpoint) =>
  ({ type: AUTH.OAUTH_SIGN_IN_ERROR, errors, endpoint });

// hook for rewire
const openPopup = _openPopup;
const listenForCredentials = (endpointKey, popup, provider, resolve, reject) => {
  if (!resolve) {
    return new Promise((listenerResolve, listenerReject) => {
      listenForCredentials(
        endpointKey,
        popup,
        provider,
        listenerResolve,
        listenerReject
      );
    });
  }
  let creds;

  try {
    creds = getAllParams(popup.location);
  } catch (err) { throw Error(err); }

  if (creds && creds.uid) {
    popup.close();
    persistData(AUTH.SAVED_CREDS_KEY, normalizeTokenKeys(creds));
    return fetch(getTokenValidationPath(endpointKey))
      .then(parseResponse)
      .then(({ data }) => resolve(data))
      .catch(({ errors }) => reject({ errors }));
  } else if (popup.closed) {
    return reject({ errors: 'Authentication was cancelled.' });
  }
  return setTimeout(() => {
    listenForCredentials(endpointKey, popup, provider, resolve, reject);
  }, 0);
};

const authenticate = ({ endpointKey, provider, url, tab = false }) => {
  const name = (tab) ? '_blank' : provider;
  const popup = openPopup(provider, url, name);
  return listenForCredentials(endpointKey, popup, provider);
};

export const oAuthSignIn = ({ provider, params, endpointKey }) => dispatch => {
  // save previous endpoint key in case of failure
  const prevEndpointKey = getCurrentEndpointKey();

  // necessary for `fetch` to recognize the response as an api request
  setCurrentEndpointKey(endpointKey);
  dispatch(storeCurrentEndpointKey(endpointKey));

  const currentEndpointKey = getCurrentEndpointKey();

  dispatch(oAuthSignInStart(provider, currentEndpointKey));

  const url = getOAuthUrl({ provider, params, currentEndpointKey });

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
