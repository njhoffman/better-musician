import { commonInitView } from 'store/common';
import { INIT_VIEW_COMPLETE } from 'constants/ui';
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_VIEW_COMPLETE] : (state, action) => ({
    ...state,
    ...commonInitView(action)
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { initialized: false };
export default function homeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
