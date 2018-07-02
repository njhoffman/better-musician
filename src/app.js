import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import ErrorBoundary from 'components/ErrorBoundaries/Main';
import initDevTools from 'components/DevTools/DevTools';
import { configureStart, configureComplete } from 'actions/auth';
import createStore from './store/createStore';

import {
  loadAppConfig,
  loadAuthConfig,
  startMemoryStats,
  domStats
} from 'utils/app';

import { init as initLog } from 'shared/logger';
const { info } = initLog('app');

const initialState = window.___INITIAL_STATE__;

export const history = createHistory();
export const store = createStore(initialState, history);

const DevTools = initDevTools(store);
const MOUNT_NODE = document.getElementById('root');

const configApp = () => {
  store.dispatch(configureStart());
  loadAppConfig(store)
    .then(() => loadAuthConfig(store))
    .then((userData) => {
      store.dispatch(configureComplete());
      const AppContainer = require('./components/AppContainer').default;
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
      </ErrorBoundary>
    </Provider>,
    MOUNT_NODE
  );
  startMemoryStats();
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
    console.info('RenderDev');
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
      // console.clear();
      info('HMR reloading ...');
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      renderDev();
    });
  }
  window.addEventListener('message', e => {
    // console.clear();
  });
}
