// import { combineReducers } from 'redux-immutablejs';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authStateReducer } from './auth';
import Immutable from 'immutable'
import locationReducer from './location';
import modalReducer from './modal';
import drawerMenuReducer from './drawerMenu';
import songsReducer from './songs';

// selectors need access to ORM
// TODO: put orm in own module
import { ORM, createReducer } from 'redux-orm';
import models from './models';
export const orm = new ORM();
orm.register(...models);
const ormReducer = createReducer(orm);

export const makeRootReducer = (asyncReducers, injectedModels = []) => {

  if (injectedModels.length > 0) {
    orm.register(...injectedModels);
  }

  return combineReducers({
    orm:            ormReducer,
    location:       locationReducer,
    form:           formReducer,
    modal:          modalReducer,
    drawerMenu:     drawerMenuReducer,
    songs:          songsReducer,
    // auth reducer is immutable js so must be mapped in containers correctly
    auth:           authStateReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer, models}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers, models));
};


export default makeRootReducer;
