import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import uiReducer from './ui';
import apiReducer from './api';
import userReducer from './user';
import configReducer from './config';
import ormReducer from './orm';

// selectors need access to ORM
// TODO: put orm in own module
import { connectRouter } from 'connected-react-router';
import { LOCATION_CHANGE } from 'constants/router';
// import { routerReducer } from 'react-router-redux';
import { init as initLog } from 'shared/logger';

const { info } = initLog('reducers');

const getInitialState = {
  action: '',
  location: {
    pathname: window.location.pathname || '/',
    search: '',
    hash: ''
  }
};

export const routerReducer = (state = getInitialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};

export const makeRootReducer = (asyncReducers, injectedModels = []) => {
  if (injectedModels.length > 0) {
    info(`Injecting models into reducer: ${injectedModels.join(' ,')}$`);
    // orm.register(...injectedModels);
  }
  const reducers = {
    orm:            ormReducer,
    router:         routerReducer,
    form:           formReducer,
    ui:             uiReducer,
    api:            apiReducer,
    user:           userReducer,
    config:         configReducer,
    ...asyncReducers
  };
  info(`Combining reducers: ${Object.keys(reducers).join(' - ')}`);

  return combineReducers(reducers);
};

export const injectReducer = ({ key, history, reducer, store, clearOld = true }, models = []) => {
  info(`Injecting reducer: ${key}`);
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }
  store.asyncReducers = clearOld ? {} : store.asyncReducers;
  store.asyncReducers[key] = reducer;
  const newReducer = connectRouter(history)(makeRootReducer(store.asyncReducers, models));
  store.replaceReducer(newReducer);
};

export default makeRootReducer;
