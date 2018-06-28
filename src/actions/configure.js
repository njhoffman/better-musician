import { push } from 'react-router-redux';
import extend from 'extend';
import {
  authenticateStart,
  authenticateComplete,
  authenticateError,
  setEndpointKeys
} from './auth';

import { ssAuthTokenUpdate } from './server';
import { applyConfig } from 'utils/auth/clientSettings';
import { destroySession } from 'utils/auth/sessionStorage';
import verifyAuth from 'utils/auth/verifyAuth';
import getRedirectInfo from 'utils/auth/parseUrl';

export const configure = (endpoints = {}, settings = {}) => {
  return dispatch => {
    // don't render anything for OAuth redirects
    if (settings.currentLocation && settings.currentLocation.match(/blank=true/)) {
      return Promise.resolve({ blank: true });
    }

    dispatch(authenticateStart());

    let promise, firstTimeLogin, mustResetPassword, user, headers;

    let { authRedirectPath, authRedirectHeaders } = getRedirectInfo(window.location);

    if (authRedirectPath) {
      dispatch(push({ pathname: authRedirectPath }));
    }

    if (authRedirectHeaders && authRedirectHeaders.uid && authRedirectHeaders['access-token']) {
      settings.initialCredentials = extend({}, settings.initialCredentials, authRedirectHeaders);
    }

    // if tokens were invalidated by server or from the settings, make sure
    // to clear browser credentials
    if (!settings.clientOnly && !settings.initialCredentials || settings.cleanSession) {
      destroySession();
    }

    promise = Promise.resolve(applyConfig({ dispatch, endpoints, settings }));

    return promise
      .then(user => {
        dispatch(authenticateComplete(user, endpoints));

        // if (firstTimeLogin) dispatch(showFirstTimeLoginSuccessModal());
        // if (mustResetPassword) dispatch(showPasswordResetSuccessModal());

        return user;
      })
      .catch(({ reason } = {}) => {
        dispatch(authenticateError([reason], endpoints));

        // if (firstTimeLogin) dispatch(showFirstTimeLoginErrorModal());
        // if (mustResetPassword) dispatch(showPasswordResetErrorModal());

        return Promise.resolve({ reason });
      });
  };
};
