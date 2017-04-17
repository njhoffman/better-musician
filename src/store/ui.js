// ------------------------------------
// Constants
// ------------------------------------
export const UI_SHOW_SNACKBAR      = 'UI_SHOW_SNACKBAR';
export const UI_HIDE_SNACKBAR      = 'UI_HIDE_SNACKBAR';
export const UI_TOGGLE_DRAWER_MENU = 'UI_TOGGLE_DRAWER_MENU';
export const UI_SHOW_DRAWER_MENU   = 'UI_SHOW_DRAWER_MENU';
export const UI_HIDE_DRAWER_MENU   = 'UI_HIDE_DRAWER_MENU';
export const UI_SHOW_MODAL         = 'UI_SHOW_MODAL';
export const UI_HIDE_MODAL         = 'UI_HIDE_MODAL';

export const MODAL_ADD_SONG     = 'MODAL_ADD_SONG';
export const MODAL_FILTER_SONGS = 'MODAL_FILTER_SONGS';

// ------------------------------------
// Action Creators
// ------------------------------------

export const uiHideDrawerMenu = () => {
  return { type: UI_HIDE_DRAWER_MENU };
};

export const uiToggleDrawerMenu = () => {
  return { type: UI_TOGGLE_DRAWER_MENU };
};

export const uiShowSnackbar = () => {
  return { type: UI_SHOW_SNACKBAR };
};

export const uiHideSnackbar = () => {
  return { type: UI_HIDE_SNACKBAR };
};

// TODO: get this integrated with redux auth's modals
export const uiShowModal = (type, viewType) => {
  const view = typeof viewType === 'string' ? viewType : 'edit';
  return { type: UI_SHOW_MODAL, meta: { type, props: { view } } };
};

export const uiHideModal = () => {
  return { type: UI_HIDE_MODAL };
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const toggleDrawerMenu = (state) =>
  ({ ...state, drawer: { ...state.drawer, isOpen: !state.isOpen } });

const showDrawerMenu = (state) =>
  ({ ...state, drawer: { ...state.drawer, isOpen: true } });

const hideDrawerMenu = (state) =>
  ({ ...state, drawer: { ...state.drawer, isOpen: false } });

const showSnackbar = (state, action) => ({ ...state,
  snackbar: {
    ...state.snackbar,
    isOpen: true,
    message: (action.meta ? action.meta.message : null)
  }
});

const hideSnackbar = (state) =>
  ({ ...state, snackbar: { ...state.snackbar, isOpen: false } });

const showModal = (state, action) =>
  ({ ...state, modal: { ...state.modal, type: action.meta.type, props: action.meta.props } });

const hideModal = (state) =>
  ({ ...state, modal: { ...initialState.modal } });

const ACTION_HANDLERS = {
  [UI_TOGGLE_DRAWER_MENU]: toggleDrawerMenu,
  [UI_SHOW_DRAWER_MENU]:   showDrawerMenu,
  [UI_HIDE_DRAWER_MENU]:   hideDrawerMenu,
  [UI_SHOW_SNACKBAR]:      showSnackbar,
  [UI_HIDE_SNACKBAR]:      hideSnackbar,
  [UI_SHOW_MODAL]:         showModal,
  [UI_HIDE_MODAL]:         hideModal
};

// ------------------------------------
// Reducer
// ------------------------------------

export const initialState = {
  snackbar: {
    isOpen: false,
    message: '',
    action: 'OK'
  },
  drawer: {
    isOpen: false,
    menuProps: {}
  },
  modal: {
    type: null,
    props: {}
  }
};

export default function uiReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
