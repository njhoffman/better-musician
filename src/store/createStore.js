import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import reduxFreeze from 'redux-freeze';
import { persistState } from 'redux-devtools';
import { parse as parseQueryString } from 'query-string';
// import generateReduxReport from 'redux-usage-report';

import { extensionPersistSelector } from 'selectors/dev';
import { DevTools } from 'components/DevTools/DevTools';
import apiMiddleware, { actionLogger }  from 'middleware/api';
import { init as initLog } from 'shared/logger';
import makeRootReducer from './reducers';

const { info, debug, error } = initLog('createStore');

let store;
const history = createBrowserHistory();
history.listen(() => {
  history.location = {
    ...history.location,
    query: parseQueryString(history.location.search)
  };
});

export const getDebugSessionKey = () => {
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
};

export const getStore = () => {
  if (!store) {
    error('Store has not been initialized');
    return null;
  }
  return store;
};

export default (initialState = {}, devConfig) => {
  if (store) {
    debug('returning store');
    return { store, history };
  }

  if (Object.keys(initialState).length > 0) {
    info('Initial State', initialState);
  }

  // TODO: why does thunk need to be after apimiddleware?
  const middleware = [apiMiddleware, thunkMiddleware, routerMiddleware(history), actionLogger];

  let composeEnhancers = compose;
  const enhancers = [];

  if (__DEV__) {
    const devExt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    middleware.push(reduxFreeze);
    enhancers.push(persistState(getDebugSessionKey()));
    enhancers.push(extensionPersistSelector);
    if (devExt && devConfig.showExtension) {
      debug('Enabling DevTools Chrome Extension');
      composeEnhancers = devExt(devConfig.extensionOptions);
    } else if (devConfig.showInspector) {
      debug('Enabling On-Screen DevTools');
      enhancers.push(DevTools.instrument({ shouldCatchErrors: true }));
    }
  }

  store = createStore(
    makeRootReducer(history),
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      info('HMR replace reducers');
      /* eslint-disable global-require */
      const nextReducer = require('./reducers').default;
      /* eslint-enable global-require */
      store.replaceReducer(nextReducer(store.asyncReducers));
    });
  }

  info('created store');
  return { store, history };
};
