import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core';
import processThemes from 'styles/themes';
import appConfig from 'config';
import { configureStart, configureComplete } from 'actions/api';
import loadConfiguration from 'utils/configure';
import createStore from 'store/createStore';
import { startMemoryStats, domStats } from 'utils/app';
import { init as initLog } from 'shared/logger';
import ErrorBoundary from 'components/ErrorBoundaries/Main';
import devTools from 'components/DevTools/DevTools';

const { info, debug, error } = initLog('app');
const initialState = window.__INITIAL_STATE__;
const history = createBrowserHistory();
const store = createStore(initialState, history, appConfig.dev);

const MOUNT_NODE = document.getElementById('root');

const themes = processThemes(appConfig.themes);
const theme = themes.steelBlue.dark;

// for easy debugging reference
window.__MUI_CURRENT_THEME__ = theme;

const RedBox = require('redbox-react').default;

const onError = (err, { componentStack }, props) => {
  error(`Application Error: ${err.name} ${componentStack.split('\n')[0]}`);
  // error.framesToPop
  componentStack.split('\n').forEach((cs, i) => {
    error(`(${i}) ${cs}`);
  });
  /* eslint-disable no-console */
  console.error(err);
  console.info('Available Props during error capture', props);
  /* eslint-enable no-console */
};

const render = (Component) => {
  // TODO: make this a config option and handle it better
  const devConfig = store.getState().config.dev;
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary onError={onError}>
        <ErrorBoundary onError={onError}>
          <MuiThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <Component history={history} store={store} />
            </ConnectedRouter>
          </MuiThemeProvider>
        </ErrorBoundary>
        {devConfig.showInspector && devTools(devConfig)}
      </ErrorBoundary>
    </Provider>,
    MOUNT_NODE
  );
  startMemoryStats();
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
    module.hot.accept('components/AppContainer', (() => {
      // console.clear();
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
