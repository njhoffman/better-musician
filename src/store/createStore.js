import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';

// import { createLogger } from 'redux-logger';
// import generateReduxReport from 'redux-usage-report';

import makeRootReducer from './reducers';
import apiMiddleware, { actionLogger }  from 'middleware/api';

import { DevTools } from 'components/DevTools/DevTools';

import { init as initLog } from 'shared/logger';
const { info, debug, error } = initLog('createStore');

let store;

// make webpack config
// https://github.com/reduxjs/redux-devtools/issues/167
// https://medium.com/@zalmoxis/improve-your-development-workflow-with-redux-devtools-extension-f0379227ff83
const useDevExtension = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && false;

const composeEnhancers = useDevExtension
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    name: 'instrumental',
    // actionsBlacklist: ['@@redux-form/REGISTER_FIELD', '@@redux-form/UNREGISTER_FIELD'],
    theme: 'twilight'
  })
  : compose;

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

  if (initialState) {
    info(`Initial State`, initialState);
  }

  // TODO: why does thunk need to be after apimiddleware?
  const middleware = [apiMiddleware, thunkMiddleware, actionLogger, routerMiddleware(history)];
  if (__DEV__) {
    middleware.push(reduxFreeze);
  }
  const enhancers = useDevExtension ? [] : [DevTools().instrument({ shouldCatchErrors: true })];

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
