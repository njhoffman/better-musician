// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';
export const TOGGLE_DRAWER_MENU= 'TOGGLE_DRAWER_MENU';
export const SHOW_DRAWER_MENU= 'SHOW_DRAWER_MENU';
export const HIDE_DRAWER_MENU= 'HIDE_DRAWER_MENU';

// ------------------------------------
// Action Handlers
// ------------------------------------

const toggleDrawerMenu = (state) => {
  return ({ ...state, isOpen: !state.isOpen });
};

const showDrawerMenu = (state) => {
  return ({ ...state, isOpen: true });
};

const hideDrawerMenu = (state) => {
  return ({ ...state, isOpen: false });
};

const ACTION_HANDLERS = {
  [TOGGLE_DRAWER_MENU] : toggleDrawerMenu,
  [SHOW_DRAWER_MENU] : showDrawerMenu,
  [HIDE_DRAWER_MENU] : hideDrawerMenu
  [SHOW_SNACKBAR] : (state, action) => {
    return ({
      snackbarMessage: action.meta.snackbarMessage,
      snackbarAction: action.meta.snackbarAction
    });
  },
  [HIDE_SNACKBAR] : (state, action) => initialState
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  snackbar: {
    open: false,
    message: "",
    action: "OK"
  },
  drawer: {
    isOpen: false,
    menuProps: {}
  }
};

export default function uiReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
