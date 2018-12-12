import { INIT_VIEW_COMPLETE } from 'constants/ui';
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_VIEW_COMPLETE] : (state, { payload, meta: { actionSets } }) => ({
    ...state,
    initialized : true,
    viewActionSets   : actionSets.view,
    commonActionSets : actionSets.common,
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { initialized: false };
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
