import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
// import { createLogger } from 'redux-logger';
// import generateReduxReport from 'redux-usage-report';

import { DevTools } from 'components/DevTools/DevTools';
import apiMiddleware, { actionLogger }  from 'middleware/api';
import { init as initLog } from 'shared/logger';
import makeRootReducer from './reducers';

const { info, debug, error } = initLog('createStore');

let store;

// make webpack config
// https://github.com/reduxjs/redux-devtools/issues/167
// https://medium.com/@zalmoxis/improve-your-development-workflow-with-redux-devtools-extension-f0379227ff83

export const getStore = () => {
  if (!store) {
    error('Store has not been initialized');
    return null;
  }
  return store;
};

export default (initialState = {}, history, devConfig) => {
  if (store) {
    debug('returning store');
    return store;
  }

  if (Object.keys(initialState).length > 0) {
    info('Initial State', initialState);
  }

  // TODO: why does thunk need to be after apimiddleware?
  const middleware = [apiMiddleware, thunkMiddleware, actionLogger, routerMiddleware(history)];

  let composeEnhancers = compose;
  const enhancers = [];

  if (__DEV__) {
    const devExt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    middleware.push(reduxFreeze);
    if (devExt && devConfig.showExtension) {
      debug('Enabling DevTools Chrome Extension');
      composeEnhancers = devExt(devConfig.extensionOptions);
    } else if (devConfig.showInspector) {
      debug('Enabling On-Screen DevTools');
      enhancers.push(DevTools.instrument({ shouldCatchErrors: true }));
    }
  }

  store = createStore(
    connectRouter(history)(makeRootReducer()),
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
  return store;
};
