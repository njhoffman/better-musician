// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

export const updateSettings = () => (dispatch) => {
};

export const resetSettings = () => (dispatch) => {
};

export const actions = {
  updateSettings,
  resetSettings
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = { };

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function settingsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
