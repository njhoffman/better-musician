import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import AppContainer from 'components/AppContainer';
import { configure as authConfigure } from './store/auth/actions/configure';

// import 'material-design-lite/src/typography/_typography.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';

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

let render = () => {
  const routes = require('./routes/index').default(store);

  store.dispatch(authConfigure({
    apiUrl:                'http://localhost:3000/api',
    signOutPath:           '/users/logout',
    emailSignInPath:       '/users/login',
    emailRegistrationPath: '/users/register',
    accountUpdatePath:     '/users/update',
    accountDeletePath:     '/users/delete',
    passwordResetPath:     '/users/password_reset',
    passwordUpdatePath:    '/users/password_update',
    tokenValidationPath:   '/users/validate_token',
    authProviderPaths: {
      github:    '/users/login/github',
      facebook:  '/users/login/facebook',
      google:    '/users/login/google_oauth2'
    }
  }, {
    serverSideRendering: false,
    clientOnly:          true
    // cleanSession:        true
  })).then(() => {
    ReactDOM.render(
      <AppContainer store={store} routes={routes} />,
      MOUNT_NODE
    );
  });
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
