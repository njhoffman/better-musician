import {getEmailSignUpUrl, getConfirmationSuccessUrl}  from "../utils/session-storage";
import {parseResponse} from "../utils/handle-fetch-response";
import extend from "extend";
import fetch from "../utils/fetch";

export const EMAIL_SIGN_UP_START       = "EMAIL_SIGN_UP_START";
export const EMAIL_SIGN_UP_COMPLETE    = "EMAIL_SIGN_UP_COMPLETE";
export const EMAIL_SIGN_UP_ERROR       = "EMAIL_SIGN_UP_ERROR";
export const EMAIL_SIGN_UP_FORM_UPDATE = "EMAIL_SIGN_UP_FORM_UPDATE";

export function emailSignUpFormUpdate(endpoint, key, value) {
  return { type: EMAIL_SIGN_UP_FORM_UPDATE, endpoint, key, value };
}
export function emailSignUpStart(endpoint) {
  return { type: EMAIL_SIGN_UP_START, endpoint };
}
export function emailSignUpComplete(user, endpoint) {
  return { type: EMAIL_SIGN_UP_COMPLETE, user, endpoint };
}
export function emailSignUpError(errors, endpoint) {
  return { type: EMAIL_SIGN_UP_ERROR, errors, endpoint };
}
export function emailSignUp(body, endpointKey) {
  return dispatch => {
    dispatch(emailSignUpStart(endpointKey));

    return fetch(getEmailSignUpUrl(endpointKey), {
      headers: {
        "Accept":                      "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type":                "application/json"
      },
      // mode: 'no-cors',
      method: "POST",
      body: JSON.stringify(extend(body, {
        confirm_success_url: getConfirmationSuccessUrl()
      }))
    })
      .then(parseResponse)
      .then(({data}) => dispatch(emailSignUpComplete(data, endpointKey)))
      .catch(res => {

        if (res.errors) {
          dispatch(emailSignUpError(res.errors, endpointKey))
        } else {
          debugger;
          throw res;
        }
      });
  };
}
