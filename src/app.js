import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';

import processThemes from 'styles/themes';
import { configureStart, configureComplete } from 'actions/api';
import appConfig from 'config';
import loadConfiguration from 'utils/configure';
import createStore from 'store/createStore';
import { domStats } from 'utils/app';
import { init as initLog } from 'shared/logger';
import devTools from 'components/DevTools/DevTools';

const { info, debug } = initLog('app');
const initialState = window.__INITIAL_STATE__;
const { store, history } = createStore(initialState, appConfig.dev);

const MOUNT_NODE = document.getElementById('root');

const themes = processThemes(appConfig.themes);
const theme = themes.steelBlue.dark;

// for easy debugging reference
window.__MUI_CURRENT_THEME__ = theme;

const RedBox = require('redbox-react').default;

const render = (Component) => {
  // TODO: make this a config option and handle it better
  const devConfig = store.getState().config.dev;
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Component history={history} store={store} />
        </ConnectedRouter>
        {devConfig.showInspector && devTools(devConfig)}
      </MuiThemeProvider>
    </Provider>,
    MOUNT_NODE
  );
};

const renderError = (err) => {
  ReactDOM.render(<RedBox error={err} />, MOUNT_NODE);
};

const renderDev = () => {
  try {
    /* eslint-disable global-require */
    const NextApp = require('components/AppContainer').default;
    /* eslint-enable global-require */
    render(NextApp);
  } catch (err) {
    renderError(err);
  }
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // reload components
    module.hot.accept(['components/AppContainer'], (() => {
      /* eslint-disable no-console */
      console.clear();
      /* eslint-enable no-console */
      info('HMR reloading ...');
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      renderDev();
    }));
  }
  window.addEventListener('message', (e) => {
    // console.clear();
  });
}

const startApp = () => {
  store.dispatch(configureStart());
  loadConfiguration(store, appConfig)
    .then((userData) => {
      store.dispatch(configureComplete());
      renderDev();
      const stats = domStats();
      debug(`-- depth => ${stats.averageDepth} / ${stats.maxDepth} : ${stats.totalNodes} Nodes`);
    });
};
startApp();
