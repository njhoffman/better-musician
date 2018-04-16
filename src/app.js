import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import AppContainer from 'components/AppContainer';
import webpackVariables from 'webpackVariables';
import { Provider } from 'react-redux';

// import 'material-design-lite/src/typography/_typography.scss';
import injectTapEventPlugin from 'react-fastclick';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

import { init as initLog } from 'shared/logger';
const { info } = initLog('app');

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


let render = () => {
  memoryStats();
  // const routes = require('./routes/index').default(store);

  // store.dispatch(authConfigure({
  //   apiUrl                : `${webpackVariables.apiUrl}`,
  //   signOutPath           : '/users/logout',
  //   emailSignInPath       : '/users/login',
  //   emailRegistrationPath : '/users/register',
  //   accountUpdatePath     : '/users/update',
  //   accountDeletePath     : '/users/delete',
  //   passwordResetPath     : '/users/password_reset',
  //   passwordUpdatePath    : '/users/password_update',
  //   tokenValidationPath   : '/users/validate_token',
  //   authProviderPaths     : {
  //     github   : '/users/login/github',
  //     facebook : '/users/login/facebook',
  //     google   : '/users/login/google_oauth2'
  //   }
  // }, {
  //   serverSideRendering : false,
  //   clientOnly          : true
  //   // cleanSession:        true
  // })).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    MOUNT_NODE
  );
  // });
};

const RedBox = require('redbox-react').default;

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    const rerender = () => {
      try {
        info('rerendering');
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // module.hot.accept('components/AppContainer', rerender);
    module.hot.accept(rerender);

  }
}

// ========================================================
// Go!
// ========================================================
render();
