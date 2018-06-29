import { getEmailSignUpUrl, getConfirmationSuccessUrl }  from 'utils/auth/sessionStorage';
import extend from 'extend';
import fetch, { parseResponse } from 'utils/fetch';
import * as A from 'constants/auth';

export const emailSignUpFormUpdate = (endpoint, key, value) => ({ type: A.EMAIL_SIGN_UP_FORM_UPDATE, endpoint, key, value });
export const emailSignUpStart      = (endpoint)             => ({ type: A.EMAIL_SIGN_UP_START, endpoint });
export const emailSignUpComplete   = (user, endpoint)       => ({ type: A.EMAIL_SIGN_UP_COMPLETE, user, endpoint });
export const emailSignUpError      = (errors, endpoint)     => ({ type: A.EMAIL_SIGN_UP_ERROR, errors, endpoint });

export const emailSignUp = (body, endpointKey) => {
  return dispatch => {
    dispatch(emailSignUpStart(endpointKey));

    return fetch(getEmailSignUpUrl(endpointKey), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(extend(body, {
        confirm_success_url: getConfirmationSuccessUrl()
      }))
    })
      .then(parseResponse)
      .then(({ data }) => dispatch(emailSignUpComplete(data, endpointKey)))
      .catch(({ errors }) => {
        dispatch(emailSignUpError(errors, endpointKey));
        throw errors;
      });
  };
}
