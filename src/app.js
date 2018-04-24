import React from 'react';
import ReactDOM from 'react-dom';
import webpackVariables from 'webpackVariables';
import { Provider } from 'react-redux';

import ErrorBoundary from 'components/ErrorBoundaries/Main';
import AppContainer from 'components/AppContainer';
import createStore from './store/createStore';

// needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-fastclick';
injectTapEventPlugin();
import { configure as authConfigure } from './actions/configure';

import DevTools from 'components/DevTools';
import showChart from 'utils/showChart';
import createHistory from 'history/createBrowserHistory';

import { init as initLog } from 'shared/logger';
const { info } = initLog('app');

const history = createHistory();

const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState, history);

const MOUNT_NODE = document.getElementById('root');

const hmSize = (bytes, si) => {
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
};

const memoryStats = () => {
  if (window.performance && window.performance.memory) {
    info(`Total JS Heap Size:  ${hmSize(window.performance.memory.totalJSHeapSize, true)}`);
    info(`Used JS Heap Size:   ${hmSize(window.performance.memory.usedJSHeapSize, true)}`);
  }
};

const render = () => {

  store.dispatch(authConfigure({
    apiUrl                : __API_URL__,
    signOutPath           : '/users/logout',
    emailSignInPath       : '/users/login',
    emailRegistrationPath : '/users/register',
    accountUpdatePath     : '/users/update',
    accountDeletePath     : '/users/delete',
    passwordResetPath     : '/users/password_reset',
    passwordUpdatePath    : '/users/password_update',
    tokenValidationPath   : '/users/validate_token',
    authProviderPaths     : {
      github   : '/users/login/github',
      facebook : '/users/login/facebook',
      google   : '/users/login/google_oauth2'
    }
  }, {
    serverSideRendering : false,
    clientOnly          : true
    // cleanSession:        true
  })).then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ErrorBoundary onError={onError}>
          <AppContainer history={history} />
          <DevTools />
        </ErrorBoundary>
      </Provider>,
      MOUNT_NODE
    );
  });
};

const onError = (error, errorInfo, props) => {
  console.warn('App.onError:', error, errorInfo, props);
}

const RedBox = require('redbox-react').default;
const renderError = (error) => {
  ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
};

const renderDev = () => {
  try {
    render();
  } catch (error) {
    renderError(error);
  }
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // module.hot.accept(['components/AppContainer'], () => {
    module.hot.accept(() => {
      info('HMR reloading ...');
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      renderDev();
    });
  }
  window.addEventListener('message', e => {
    // console.clear();
  });
  renderDev();
  // showChart(store);

} else {
  render();
}

export { store };
