import { combineReducers } from 'redux';
import locationReducer from './location';
import modalReducer from './modal';
import drawerMenuReducer from './drawerMenu';
import { reducer as formReducer } from 'redux-form';
import { authStateReducer } from 'redux-auth';

// import { register as registerSchema } from 'store/orm';
import baseModels from './baseModels'
import { ORM } from 'redux-orm';

export function selectedUserIdReducer(state = 0, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SELECT_USER':
      return payload;
    default:
      return state;
  }
}


export const orm = new ORM();
orm.register(...baseModels);

const ormReducer = (state, action) => {
  if (!state) {
    return orm.getEmptyState();
  }
  const session = orm.mutableSession(state);
  // genereate example data for models
  [ 'Song', 'Artist', 'Genre', 'Instrument' ].forEach( key => {
    if (session[key] && session[key].count() === 0) {
      session[key].generateExamples();
    }
  });
  return session.state;
};


export const makeRootReducer = (asyncReducers, injectedModels = []) => {

  if (injectedModels.length > 0) {
    orm.register(...injectedModels);
  }

  return combineReducers({
    orm:            ormReducer,
    selectedUserId: selectedUserIdReducer,
    location:       locationReducer,
    form:           formReducer,
    modal:          modalReducer,
    drawerMenu:     drawerMenuReducer,
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
