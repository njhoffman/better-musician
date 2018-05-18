import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authStateReducer } from './auth';
import uiReducer from './ui';
import apiReducer from './api';
import userReducer from './user';
import configReducer from './config';
import ormReducer from './orm';

import { init as initLog } from 'shared/logger';

// selectors need access to ORM
// TODO: put orm in own module

import { routerReducer } from 'react-router-redux';
import { LOCATION_CHANGE } from 'react-router-redux';
const { info } = initLog('reducers');

// Initial routing state
const routeInitialState = {
  location: null
};

const routeReducer = (state = routeInitialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return ({ ...state, location: action.payload });
    default:
      return state;
  }
};

export const makeRootReducer = (asyncReducers, injectedModels = []) => {
  if (injectedModels.length > 0) {
    orm.register(...injectedModels);
  }
  const reducers = {
    orm:            ormReducer,
    route:          routeReducer,
    form:           formReducer,
    ui:             uiReducer,
    api:            apiReducer,
    user:           userReducer,
    config:         configReducer,
    auth:           authStateReducer,
    ...asyncReducers
  };
  info(`Combining reducers: ${Object.keys(reducers).join(' - ')}`);

  return combineReducers(reducers);
};

export const injectReducer = ({ key, reducer, store, clearOld = true }, models = []) => {
  info(`Injecting reducer: ${key}`);
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }
  store.asyncReducers = clearOld ? {} : store.asyncReducers;
  store.asyncReducers[key] = reducer;
  const newReducer = exports.makeRootReducer(store.asyncReducers, models);
  store.replaceReducer(newReducer);
};

export default makeRootReducer;
