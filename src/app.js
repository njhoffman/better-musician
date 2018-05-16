import React from 'react';
import ReactDOM from 'react-dom';
import webpackVariables from 'webpackVariables';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { AuthGlobals } from 'components/AuthGlobals';

import ErrorBoundary from 'components/ErrorBoundaries/Main';
import AppContainer from 'components/AppContainer';
import initDevTools from 'components/DevTools/DevTools';

import createStore from './store/createStore';

import { configure as authConfigure } from './actions/configure';
import { loadConfig } from './store/config';

import { init as initLog } from 'shared/logger';
import { humanMemorySize } from 'shared/util';
const { debug, info } = initLog('app');

const history = createHistory();

const initialState = window.___INITIAL_STATE__;
export const store = createStore(initialState, history);
const DevTools = initDevTools(store);

const MOUNT_NODE = document.getElementById('root');

const memoryStats = () => {
  if (window.performance && window.performance.memory) {
    const { totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
    debug( `Total JS Heap Size:  ${humanMemorySize(totalJSHeapSize, true)}`);
    debug(`Used JS Heap Size:   ${humanMemorySize(usedJSHeapSize, true)}`);
  }
};

setInterval(memoryStats, 120000);

const configApp = () => {
  store.dispatch(
    authConfigure({
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
      clientOnly          : true,
      // cleanSession:        true
    })).then(() => {
      return store.dispatch(
        loadConfig({
          api: {
            url: __API_URL__
          }
        })
      )}).then(() => {
        render(AppContainer);
      })
};

configApp();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary onError={onError}>
        <Component history={history} store={store} />
        <DevTools />
      </ErrorBoundary>
    </Provider>,
    MOUNT_NODE
  );
  memoryStats();
};

const onError = (error, errorInfo, props) => {
  console.warn('App.onError:', error, errorInfo, props);
};

const RedBox = require('redbox-react').default;
const renderError = (error) => {
  ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
};

const renderDev = () => {
  try {
    const NextApp = require('./components/AppContainer').default;
    render(NextApp);
  } catch (error) {
    renderError(error);
  }
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // module.hot.accept(() => {
    module.hot.accept('components/AppContainer', () => {
      info('HMR reloading ...');
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      renderDev();
    });
  }
  window.addEventListener('message', e => {
    // console.clear();
  });
  renderDev();
} else {
  render();
}
