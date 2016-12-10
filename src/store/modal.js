// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_MODAL] : (state, action) => {
    return ({ modalType: action.modalType, modalProps: action.modalProps }); },
  [HIDE_MODAL] : (state, action) => initialState
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  modalType: null,
  modalProps: {}
};

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
