import { INIT_VIEW_COMPLETE } from 'constants/ui';
import { commonInitView } from 'store/common';

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
// reducer
// ------------------------------------
const initialState = 0;
export default function settingsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
