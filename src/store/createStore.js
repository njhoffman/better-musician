import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
// import { createLogger } from 'redux-logger';
// import generateReduxReport from 'redux-usage-report';

import makeRootReducer from './reducers';
import apiMiddleware, { actionLogger }  from 'middleware/api';

import { DevTools } from 'components/DevTools/DevTools';

import { init as initLog } from 'shared/logger';
const { info, debug, error } = initLog('createStore');

let store;

// make webpack config
const useDevExtension = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && false;
const composeEnhancers = useDevExtension
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    name: 'instrumental',
    actionsBlacklist: ['@@redux-form/REGISTER_FIELD', '@@redux-form/UNREGISTER_FIELD'],
    theme: 'monokai'
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
  // TODO: why does thunk need to be after apimiddleware?
  const middleware = [apiMiddleware, thunkMiddleware, actionLogger, routerMiddleware(history)];
  const enhancers = useDevExtension ? []
    : [DevTools().instrument({ shouldCatchErrors: true })];

  store = createStore(
    makeRootReducer(),
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};
  // to unsubscribe, invoke `store.unsubscribeHistory()` anytime

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      info('HMR replace reducers');
      // const nextReducer = makeRootReducer(require('./reducers'));
      const nextReducer = require('./reducers').makeRootReducer;
      store.replaceReducer(nextReducer(store.asyncReducers));
      // store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  info('created store');
  return store;
};
