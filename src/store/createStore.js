import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import makeRootReducer from './reducers';
import { updateLocation } from './location';
import apiMiddleware from 'middleware/api';

export default (initialState = {}) => {
  // const middleware = [thunk, middlewareApi, createLogger()];
  const middleware = [apiMiddleware, thunkMiddleware, promiseMiddleware()];

  const enhancers = [];
  let composeEnhancers = compose;

  if (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      name: 'instrumental',
      actionsBlacklist: ['@@redux-form/REGISTER_FIELD', '@@redux-form/UNREGISTER_FIELD']
    });
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = createStore(
    makeRootReducer(),
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  // to unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
