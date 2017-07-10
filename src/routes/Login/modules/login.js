import { browserHistory } from 'react-router';
import { fetchSongs } from 'store/api';
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

// ------------------------------------
// Actions
// ------------------------------------

export const handleLoginSuccess = () => (dispatch, getState) => {
  browserHistory.push('/songs');
};

export const actions = {
  handleLoginSuccess
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
