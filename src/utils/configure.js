import { push } from 'react-router-redux';
import { deviceDetect } from 'react-device-detect';
import extend from 'extend';
import {
  authenticateStart,
  authenticateComplete,
  authenticateError
} from 'actions/auth';
import { configureLoad } from 'actions/api';
import { applyConfig as applyAuthConfig } from 'utils/auth/clientSettings';
import { destroySession } from 'utils/auth/sessionStorage';
import getRedirectInfo from 'utils/auth/parseUrl';
import { init as initLog } from 'shared/logger';

const { debug } = initLog('config');

const loadConfiguration = ({ endpoints, settings, dev }) => dispatch => {
  // don't render anything for OAuth redirects
  if (settings.currentLocation && settings.currentLocation.match(/blank=true/)) {
    return Promise.resolve({ blank: true });
  }
  //
  // figure out initial window dimensions
  const { innerHeight, outerHeight, innerWidth, outerWidth } = window;

  const clientInfo = {
    window: { ...window.screen, innerHeight, outerHeight, innerWidth, outerWidth },
    device: deviceDetect()
  };

  dev.showInspector = dev.showInspector && (innerWidth < 600 && dev.inspectorOptions.hideMobile);
  // dont show osd if mobile viewport
  dispatch(configureLoad({ endpoints, clientInfo, devConfig: dev }));
  dispatch(authenticateStart());


  // let mustResetPassword, firstTimeLogin
  const { authRedirectPath, authRedirectHeaders } = getRedirectInfo(window.location);

  if (authRedirectPath) {
    debug(`auth redirecting: ${authRedirectPath}`);
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

  const promise = Promise.resolve(applyAuthConfig({ dispatch, endpoints, settings }));

  return promise
    .then(user => {
      dispatch(authenticateComplete(user, endpoints));

      // if (firstTimeLogin) dispatch(showFirstTimeLoginSuccessModal());
      // if (mustResetPassword) dispatch(showPasswordResetSuccessModal());

      return user;
    })
    .catch((err) => {
      const { reason } = err;
      if (!reason) {
        return Promise.reject(err);
      }
      dispatch(authenticateError([reason], endpoints));

      // if (firstTimeLogin) dispatch(showFirstTimeLoginErrorModal());
      // if (mustResetPassword) dispatch(showPasswordResetErrorModal());

      return Promise.resolve({ reason });
    });
};

export default ({ dispatch, getState }, config) => dispatch(
  loadConfiguration(config)
);
