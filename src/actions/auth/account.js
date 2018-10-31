import {
  getDestroyAccountUrl,
  setCurrentEndpointKey,
  getDefaultEndpointKey,
  getPasswordResetUrl
}  from 'utils/auth/sessionStorage';
import fetch, { parseResponse } from 'utils/fetch';
import * as A from 'constants/auth';
import { storeCurrentEndpointKey } from 'actions/auth';

export const updatePasswordFormUpdate = (endpoint, key, value) =>
  ({ type: A.UPDATE_PASSWORD_FORM_UPDATE, endpoint, key, value });

export const updatePasswordStart = (endpoint) =>
  ({ type: A.UPDATE_PASSWORD_START, endpoint });

export const updatePasswordComplete = (endpoint, user) =>
  ({ type: A.UPDATE_PASSWORD_COMPLETE, endpoint, user });

export const updatePasswordError = (endpoint, errors) =>
  ({ type: A.UPDATE_PASSWORD_ERROR, endpoint, errors });

export const destroyAccountStart = (endpoint) =>
  ({ type: A.DESTROY_ACCOUNT_START, endpoint });

export const destroyAccountComplete = (message, endpoint) =>
  ({ type: A.DESTROY_ACCOUNT_COMPLETE, endpoint, message });

export const destroyAccountError = (errors, endpoint) =>
  ({ type: A.DESTROY_ACCOUNT_ERROR, endpoint, errors });

export const updatePassword = (body, endpoint) => dispatch => {
  dispatch(updatePasswordStart(endpoint));

  return fetch(getPasswordResetUrl(endpoint), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify(body)
  })
    .then(parseResponse)
    .then(({ user }) => dispatch(updatePasswordComplete(endpoint, user)))
    .catch(({ errors }) => dispatch(updatePasswordError(endpoint, errors)));
};

export const destroyAccount = (endpoint) => dispatch => {
  dispatch(destroyAccountStart(endpoint));

  return fetch(getDestroyAccountUrl(endpoint), { method: 'delete' })
    .then(parseResponse)
    .then(({ message }) => {
      dispatch(destroyAccountComplete(message, endpoint));

      // revert current session endpoint to default
      const defaultEndpointKey = getDefaultEndpointKey();

      // set in store
      dispatch(storeCurrentEndpointKey(defaultEndpointKey));

      // and in session
      setCurrentEndpointKey(defaultEndpointKey);
    })
    .catch(({ errors }) => dispatch(destroyAccountError(errors, endpoint)));
};
