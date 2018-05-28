import React from 'react';
import ReactDOM from 'react-dom';
import webpackVariables from 'webpackVariables';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { AuthGlobals } from 'components/AuthGlobals';

import ErrorBoundary from 'components/ErrorBoundaries/Main';
import AppContainer from 'components/AppContainer';
import initDevTools from 'components/DevTools/DevTools';

import { configureStart, configureComplete } from './actions/auth';
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
    const used = humanMemorySize(usedJSHeapSize, true);
    const total = humanMemorySize(totalJSHeapSize, true);
    debug(`-- JS Heap Size: ${used} / ${total}`);
  }
};
setInterval(memoryStats, 120000);

const domStats = () => {
  let stats = { maxDepth: 0, totalNodes: 0, totalDepth: 0 };
  const getNodeStats = (el, depth) => {
    stats.maxDepth = depth > stats.maxDepth ? depth : stats.maxDepth;
    stats.totalNodes++;
    stats.totalDepth += depth;
    let i;
    for (i = 0; i < el.children.length; i++) {
      getNodeStats(el.children[i], depth + 1);
    }
  };
  getNodeStats(document, 0);
  stats.averageDepth = (stats.totalDepth / stats.totalNodes).toFixed(2);
  debug(`-- depth => ${stats.averageDepth} / ${stats.maxDepth} : ${stats.totalNodes} Nodes`);
};

const loadAppConfig = (store) => {
  return store.dispatch(
    loadConfig({
      api: {
        url: __API_URL__
      }
    })
  );
};
const loadAuthConfig = (store) => {
  return store.dispatch(
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
      clientOnly          : true
      // cleanSession:        true
    }
    )
  );
};

const configApp = () => {
  store.dispatch(configureStart());
  loadAppConfig(store)
    .then(() => loadAuthConfig(store))
    .then((userData) => {
      store.dispatch(configureComplete());
      render(AppContainer);
      domStats();
    });
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
      console.clear();
      info('HMR reloading ...');
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      renderDev();
    });
  }
  window.addEventListener('message', e => {
    // console.clear();
  });
} else {
  render();
}
