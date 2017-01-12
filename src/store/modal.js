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
    return ({
      modalType: action.meta.modalType,
      modalProps: action.meta.modalProps,
      modalView: action.meta.modalView,
      payload: action.payload
    });
  },
  [HIDE_MODAL] : (state, action) => initialState
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  modalType: null,
  modalView: null,
  modalProps: {},
  payload: {}

};

export default function modalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
