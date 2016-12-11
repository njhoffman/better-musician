// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_DRAWER_MENU= 'TOGGLE_DRAWER_MENU';
export const SHOW_DRAWER_MENU= 'SHOW_DRAWER_MENU';
export const HIDE_DRAWER_MENU= 'HIDE_DRAWER_MENU';

const toggleDrawerMenu = (state) => {
  return ({ ...state, isOpen: !state.isOpen });
};

const showDrawerMenu = (state) => {
  return ({ ...state, isOpen: true });
};

const hideDrawerMenu = (state) => {
  return ({ ...state, isOpen: false });
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_DRAWER_MENU] : toggleDrawerMenu,
  [SHOW_DRAWER_MENU] : showDrawerMenu,
  [HIDE_DRAWER_MENU] : hideDrawerMenu
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isOpen: false,
  menuProps: {}
};

export default function drawerMenuReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
