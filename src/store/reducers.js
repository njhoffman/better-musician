import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authStateReducer } from './auth';
import uiReducer from './ui';
import apiReducer from './api';
import userReducer from './user';

import { init as initLog } from 'shared/logger';
const { info } = initLog('reducers');

// selectors need access to ORM
// TODO: put orm in own module
import { ORM, createReducer } from 'redux-orm';
import models from './models';
export const orm = new ORM();
orm.register(...models);
const ormReducer = createReducer(orm);

import { routerReducer } from 'react-router-redux';
import { LOCATION_CHANGE } from 'react-router-redux';

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
    // router:         routerReducer,
    route:         routeReducer,
    form:           formReducer,
    ui:             uiReducer,
    api:            apiReducer,
    user:           userReducer,
    // auth reducer is immutable js so must be mapped in containers correctly
    auth:           authStateReducer,
    ...asyncReducers
  };
  info(`Combining reducers: ${Object.keys(reducers).join(' - ')}`);

  return combineReducers(reducers);
};

export const injectReducer = (store, { key, reducer, models }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(exports.makeRootReducer(store.asyncReducers, models));
};

export default makeRootReducer;
