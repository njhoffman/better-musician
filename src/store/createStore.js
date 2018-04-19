import { applyMiddleware, compose, createStore } from 'redux';
// import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import { createLogger } from 'redux-logger';
// import generateReduxReport from 'redux-usage-report';
import _ from 'lodash';

import DevTools from 'components/DevTools';
import makeRootReducer from './reducers';
import { updateLocation } from './location';
import apiMiddleware from 'middleware/api';

// make webpack config
const useDevExtension = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && false;
const composeEnhancers = useDevExtension
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    name: 'instrumental',
    actionsBlacklist: ['@@redux-form/REGISTER_FIELD', '@@redux-form/UNREGISTER_FIELD']
  })
  : compose;


import { init as initLog } from 'shared/logger';
const { trace } = initLog('action');
const actionLogger = (store) => next => action => {
  // meta.form, meta.field
  trace(`${action.type} ${action.payload ? ' => ' + JSON.stringify(action.payload) : ''}`);
  // debug(`${action.type}`, { payload: action.payload, meta: action.meta });
  next(action);
};

export default (initialState = {}) => {
  // const middleware = [thunk, middlewareApi, createLogger()];
  const middleware = [apiMiddleware, thunkMiddleware, actionLogger /*, createLogger() , promiseMiddleware() */];
  const enhancers = useDevExtension
    ? []
    : [DevTools.instrument({ shouldCatchErrors: true })];

  const store = createStore(
    makeRootReducer(),
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  // to unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

// redux-logger options
//  predicate, // if specified this function will be called before each action is processed with this middleware.
//   collapsed, // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
//   duration = false: Boolean, // print the duration of each action?
//   timestamp = true: Boolean, // print the timestamp with each action?
//
//   level = 'log': 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
//   colors: ColorsObject, // colors for title, prev state, action and next state: https://github.com/evgenyrodionov/redux-logger/blob/master/src/defaults.js#L12-L18
//   titleFormatter, // Format the title used when logging actions.
//
//   stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
//   actionTransformer, // Transform action before print. Eg. convert Immutable object to plain JSON.
//   errorTransformer, // Transform error before print. Eg. convert Immutable object to plain JSON.
//
//   logger = console: LoggerObject, // implementation of the `console` API.
//   logErrors = true: Boolean, // should the logger catch, log, and re-throw errors?
//
//   diff = false: Boolean, // (alpha) show diff between states?
//   diffPredicate // (alpha) filter function for showing states diff, similar to `predicate`
