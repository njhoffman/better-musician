import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { routerReducer } from 'react-router-redux';
import { init as initLog } from 'shared/logger';
import uiReducer from './ui';
import apiReducer from './api';
import userReducer from './user';
import configReducer from './config';
import ormReducer from './orm';

// selectors need access to ORM
// TODO: put orm in own module

const { info } = initLog('reducers');

const makeRootReducer = (asyncReducers, injectedModels = []) => {
  if (injectedModels.length > 0) {
    info(`Injecting models into reducer: ${injectedModels.join(' ,')}$`);
    // orm.register(...injectedModels);
  }
  const reducers = {
    orm:            ormReducer,
    form:           formReducer,
    ui:             uiReducer,
    api:            apiReducer,
    user:           userReducer,
    router:         routerReducer,
    config:         configReducer,
    ...asyncReducers
  };
  info(`Combining reducers: ${Object.keys(reducers).join(' - ')}`);

  return combineReducers(reducers);
};

export const injectReducer = ({ key, history, reducer, store, clearOld = false }, models = []) => {
  info(`Injecting reducer: ${key}`);
  // if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
  //   return;
  // }
  store.asyncReducers = clearOld ? {} : store.asyncReducers;
  store.asyncReducers[key] = reducer;
  const newReducer = connectRouter(history)(makeRootReducer(store.asyncReducers, models));
  store.replaceReducer(newReducer);
};

export default makeRootReducer;
