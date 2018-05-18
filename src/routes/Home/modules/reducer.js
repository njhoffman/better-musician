// ------------------------------------
// Constants
// ------------------------------------
export const INIT_VIEW = 'INIT_VIEW';

// ------------------------------------
// Actions
// ------------------------------------

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
export default function homeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
