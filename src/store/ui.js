import * as A from 'constants/ui';

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

const updateModal = (state, action) =>
  ({ ...state, modal: { ...state.modal, type: action.meta.type, props: action.meta.props } });

const hideSnackbar = (state) =>
  ({ ...state, snackbar: { ...state.snackbar, isOpen: false } });

const showModal = (state, action) =>
  ({ ...state, modal: { ...state.modal, type: action.meta.type, props: action.meta.props } });

const hideModal = (state) =>
  ({ ...state, modal: { ...initialState.modal } });

const initView = (state, { payload }) =>
  ({ ...state, currentView: payload.currentView });

const ACTION_HANDLERS = {
  [A.UI_TOGGLE_DRAWER_MENU]: toggleDrawerMenu,
  [A.UI_SHOW_DRAWER_MENU]:   showDrawerMenu,
  [A.UI_HIDE_DRAWER_MENU]:   hideDrawerMenu,
  [A.UI_SHOW_SNACKBAR]:      showSnackbar,
  [A.UI_HIDE_SNACKBAR]:      hideSnackbar,
  [A.UI_SHOW_MODAL]:         showModal,
  [A.UI_HIDE_MODAL]:         hideModal,
  [A.UI_UPDATE_MODAL]:       updateModal,
  [A.INIT_VIEW]: initView
};

export const initialState = {
  currentView: null,
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
