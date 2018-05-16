import { browserHistory } from 'react-router';
// ------------------------------------
// Constants
// ------------------------------------
export const INIT_VIEW = 'INIT_VIEW';

// ------------------------------------
// Actions
// ------------------------------------


export const handleLoginSuccess = () => (dispatch, getState) => {
  browserHistory.push('/songs');
};
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_VIEW] : (state, action) => ({ ...state , ...{ initialized: true }}),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { initialized: false };
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
