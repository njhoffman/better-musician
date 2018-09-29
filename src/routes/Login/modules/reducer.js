// ------------------------------------
// Constants
// ------------------------------------
export const INIT_VIEW = 'INIT_VIEW';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_VIEW] : (state, action) => ({ ...state, ...{ initialized: true } })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { initialized: false };
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
