import { combineReducers } from 'redux';
import locationReducer from './location';
import modalReducer from './modal';
import drawerMenuReducer from './drawerMenu';
import { reducer as formReducer } from 'redux-form';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    modal: modalReducer,
    drawerMenu: drawerMenuReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
