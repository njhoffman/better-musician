import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { init as initLog } from 'shared/logger';
import uiReducer from './ui';
import apiReducer from './api';
import userReducer from './user';
import configReducer from './config';
import ormReducer from './orm';

// selectors need access to ORM
// TODO: put orm in own module

const { info } = initLog('reducers');

const makeRootReducer = (history, asyncReducers, injectedModels = []) => {
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
    router:         connectRouter(history),
    config:         configReducer,
    ...asyncReducers
  };
  info(`Combining reducers: ${Object.keys(reducers).join(' - ')}`);

  return combineReducers(reducers);
};

export const injectReducer = (reducerProps, models = []) => {
  const { key, history, reducer, store, clearOld = false } = reducerProps;
  info(`Injecting reducer: ${key}`);
  const asyncRed = clearOld ? {} : store.asyncReducers;
  asyncRed[key] = reducer;
  const newReducer = connectRouter(history)(makeRootReducer(history, asyncRed, models));
  store.replaceReducer(newReducer);
};

export default makeRootReducer;
