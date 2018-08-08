import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core';
import themes from 'styles/themes';

import ErrorBoundary from 'components/ErrorBoundaries/Main';
import initDevTools from 'components/DevTools/DevTools';
import { configureStart, configureComplete } from 'actions/auth';
import createStore from 'store/createStore';

import {
  loadAppConfig,
  loadAuthConfig,
  startMemoryStats,
  domStats
} from 'utils/app';

import { init as initLog } from 'shared/logger';
const { info, warn } = initLog('app');

const initialState = window.___INITIAL_STATE__;

const theme = themes['steelBlue-dark'];
const history = createBrowserHistory();
const store = createStore(initialState, history);

const DevTools = initDevTools(store);
const MOUNT_NODE = document.getElementById('root');

const configApp = () => {
store.dispatch(configureStart());
loadAppConfig(store)
  .then(() => loadAuthConfig(store))
  .then((userData) => {
    store.dispatch(configureComplete());
    renderDev();
    domStats();
  });
};

configApp();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary onError={onError}>
        <ErrorBoundary onError={onError}>
          <MuiThemeProvider theme={theme} >
            <ConnectedRouter history={history}>
              <Component history={history} store={store} />
            </ConnectedRouter>
          </MuiThemeProvider>
        </ErrorBoundary>
        <DevTools />
      </ErrorBoundary>
    </Provider>,
    MOUNT_NODE
  );
  startMemoryStats();
};

const onError = (error, errorInfo, props) => {
  warn('App.onError:', error, errorInfo, props);
};

const RedBox = require('redbox-react').default;
const renderError = (error) => {
  ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
};

const renderDev = () => {
  try {
    const NextApp = require('components/AppContainer').default;
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
