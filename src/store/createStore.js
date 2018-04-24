import { applyMiddleware, compose, createStore } from 'redux';
// import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import { createLogger } from 'redux-logger';
// import generateReduxReport from 'redux-usage-report';
import _ from 'lodash';

import { routerMiddleware } from 'react-router-redux';
import makeRootReducer from './reducers';
import apiMiddleware, { actionLogger }  from 'middleware/api';
import { composeWithDevTools } from 'remote-redux-devtools';

import { DevTools } from 'components/DevTools';
import { DevToolsChart } from 'components/DevToolsChart';

import { init as initLog } from 'shared/logger';
const { info } = initLog('createStore');

// make webpack config
const useDevExtension = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && false;
const composeEnhancers = useDevExtension
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    name: 'instrumental',
    actionsBlacklist: ['@@redux-form/REGISTER_FIELD', '@@redux-form/UNREGISTER_FIELD'],
    theme: 'monokai'
  })
  // : composeWithDevTools;
  : compose;

export { history };

export default (initialState = {}, history) => {
  const middleware = [apiMiddleware, thunkMiddleware, actionLogger, routerMiddleware(history)];
  const enhancers = useDevExtension ? []
    : [ DevTools.instrument({ shouldCatchErrors: false })];
  /* DevToolsChart.instrument() */

  const store = createStore(
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
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
