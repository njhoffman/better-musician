import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
// import { createLogger } from 'redux-logger';
// import generateReduxReport from 'redux-usage-report';

import makeRootReducer from './reducers';
import apiMiddleware, { actionLogger }  from 'middleware/api';
import DevTools from 'components/DevTools/DevTools';

import config from 'config';
import { init as initLog } from 'shared/logger';
const { info, debug, error } = initLog('createStore');

let store;

// make webpack config
// https://github.com/reduxjs/redux-devtools/issues/167
// https://medium.com/@zalmoxis/improve-your-development-workflow-with-redux-devtools-extension-f0379227ff83

export const getStore = () => {
  if (!store) {
    error('Store has not been initialized');
    return;
  }
  return store;
};

export default (initialState = {}, history) => {
  if (store) {
    debug(`returning store`);
    return store;
  }

  if (Object.keys(initialState).length > 0) {
    info(`Initial State`, initialState);
  }

  // TODO: why does thunk need to be after apimiddleware?
  const middleware = [apiMiddleware, thunkMiddleware, actionLogger, routerMiddleware(history)];
  __DEV__ && middleware.push(reduxFreeze);

  let composeEnhancers = compose;
  let enhancers = [];

  if (__DEV__) {
    const devExt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const { enableExtension, showPanel, showChart, extensionOptions } = config.dev;
    if (devExt && enableExtension) {
      composeEnhancers = devExt(extensionOptions);
      enhancers.push(DevTools.instrument({ shouldCatchErrors: true }));
    } else if (showPanel || showChart) {
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
      const nextReducer = require('./reducers').makeRootReducer;
      store.replaceReducer(nextReducer(store.asyncReducers));
    });
  }

  info('created store');
  return store;
};
