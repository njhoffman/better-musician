import { fetchSongs } from 'store/api';
import { browserHistory } from 'react-router';
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

// ------------------------------------
// Actions
// ------------------------------------

export const handleRegisterSuccess = () => (dispatch, getState) => {
  fetchSongs({ dispatch, getState });
  browserHistory.push('/songs');
};

export const actions = {
  handleRegisterSuccess
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT] : (state, action) => state + action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
