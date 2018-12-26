import _ from 'lodash';
import { push } from 'react-router-redux';
import { deviceDetect } from 'react-device-detect';
import {
  ssAuthTokenUpdate,
  setEndpointKeys,
  authenticateStart,
  authenticateComplete,
  authenticateError
} from 'actions/auth';
import { configureLoad, fetchSongs, getApiVersion } from 'actions/api';
import { uiWindowResize } from 'actions/ui';
import applyAuthConfig from 'utils/auth/clientSettings';
import { destroySession } from 'utils/auth/sessionStorage';
import verifyAuth from 'utils/auth/verifyAuth';
import getRedirectInfo from 'utils/auth/parseUrl';
import { init as initLog } from 'shared/logger';

const { debug } = initLog('config');

const getClientWindowProps = () => {
  const {
    innerHeight, outerHeight, innerWidth, outerWidth
  } = window;

  const {
    availHeight, availLeft, availTop, availWidth, colorDepth, height, width
  } = window.screen;

  const {
    angle: orientationAngle,
    type: orientation
  } = window.screen.orientation;

  return {
    window: { innerHeight, outerHeight, innerWidth, outerWidth },
    screen: { availHeight, availLeft, availTop, availWidth, colorDepth, height, width, orientationAngle, orientation },
    device: deviceDetect(),
  };
};

const loadConfiguration = ({ endpoints, settings, dev }) => dispatch => {
  const { inspector, inspector: { show: showInspector } } = dev;
  // don't render anything for OAuth redirects
  if (settings.currentLocation && settings.currentLocation.match(/blank=true/)) {
    return Promise.resolve({ blank: true });
  }
  //
  // figure out initial window dimensions
  const clientInfo = getClientWindowProps();

  const devInspector = showInspector && (clientInfo.window.innerWidth > 600 || !inspector.hideMobile);

  // dont show osd if mobile viewport
  dispatch(configureLoad({
    endpoints,
    clientInfo,
    devConfig: { ...dev, inspector: { ...dev.inspector, show: devInspector } }
  }));

  // instead of componentDidMount on AppContainer, any drawkback?
  window.addEventListener('resize', _.debounce(
    () => dispatch(uiWindowResize(getClientWindowProps())),
    100,
    { leading: true, trailing: true }
  ));

  dispatch(authenticateStart());

  let firstTime = false;
  let mustReset = false;
  let promise;

  if (settings.isServer) {
    promise = verifyAuth(endpoints, settings)
      .then(({
        user,
        headers,
        firstTimeLogin,
        mustResetPassword,
        currentEndpoint,
        currentEndpointKey,
        defaultEndpointKey
      }) => {
        firstTime = firstTimeLogin;
        mustReset = mustResetPassword;
        dispatch(ssAuthTokenUpdate({
          headers,
          user,
          firstTimeLogin,
          mustResetPassword
        }));
        dispatch(setEndpointKeys(Object.keys(currentEndpoint), currentEndpointKey, defaultEndpointKey));
        return user;
      })
      .catch(({
        reason,
        firstTimeLogin,
        mustResetPassword,
        currentEndpoint,
        defaultEndpointKey
      }) => {
        dispatch(ssAuthTokenUpdate({ firstTimeLogin, mustResetPassword }));
        dispatch(setEndpointKeys(Object.keys(currentEndpoint || {}), null, defaultEndpointKey));
        /* eslint-disable prefer-promise-reject-errors */
        return Promise.reject({ reason });
        /* eslint-enable prefer-promise-reject-errors */
      });
  } else {
    // if the authentication happened server-side, find the resulting auth
    // credentials that were injected into the dom.
    const tokenBridge = document.getElementById('token-bridge');
    if (tokenBridge) {
      const rawServerCreds = tokenBridge.innerHTML;
      if (rawServerCreds) {
        const serverCreds = JSON.parse(rawServerCreds);

        const { headers, user: serverUser, firstTimeLogin, mustResetPassword } = serverCreds;
        mustReset = mustResetPassword;
        firstTime = firstTimeLogin;

        if (serverUser) {
          dispatch(authenticateComplete(serverUser));
          fetchSongs({ dispatch });

          // do NOT send initial validation request.
          // instead use the credentials that were sent back by the server.
          _.merge(settings, { initialCredentials : serverCreds });
        }

        // sync client dom to prevent React 'out of sync' error
        dispatch(ssAuthTokenUpdate({
          serverUser,
          headers,
          mustResetPassword,
          firstTimeLogin
        }));
      }
    }
  }
  const { authRedirectPath, authRedirectHeaders } = getRedirectInfo(window.location);

  if (authRedirectPath) {
    debug(`auth redirecting: ${authRedirectPath}`);
    dispatch(push({ pathname: authRedirectPath }));
  }

  if (authRedirectHeaders && authRedirectHeaders.uid && authRedirectHeaders['access-token']) {
    _.merge(settings.initialCredentials, authRedirectHeaders);
  }

  // if tokens were invalidated by server or from the settings, make sure
  // to clear browser credentials
  if ((!settings.clientOnly && !settings.initialCredentials) || settings.cleanSession) {
    destroySession();
  }

  promise = Promise.resolve(applyAuthConfig({ dispatch, endpoints, settings }));

  return promise
    .then(user => {
      dispatch(authenticateComplete(user, endpoints));
      getApiVersion(dispatch);
      fetchSongs({ dispatch });

      if (firstTime) {
        debug(`First time login for user: ${user.email}`);
        // dispatch(showFirstTimeLoginSuccessModal());
      }

      if (mustReset) {
        debug(`mustResetPassword set in configuration for usser: ${user.email}`);
        // dispatch(showPasswordResetSuccessModal());
      }

      return user;
    })
    .catch((err) => {
      const { reason } = err;
      if (!reason) {
        return Promise.reject(err);
      }
      dispatch(authenticateError([reason], endpoints));
      getApiVersion(dispatch);

      // if (firstTime) dispatch(showFirstTimeLoginErrorModal());
      // if (mustResetPassword) dispatch(showPasswordResetErrorModal());

      return Promise.resolve({ reason });
    });
};

export default ({ dispatch, getState }, config) => dispatch(
  loadConfiguration(config)
);
