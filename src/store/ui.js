import * as UI from 'constants/ui';

const toggleDrawerMenu = (state) =>
  ({ ...state, drawer: { ...state.drawer, isOpen: !state.isOpen } });

const showDrawerMenu = (state) =>
  ({ ...state, drawer: { ...state.drawer, isOpen: true } });

const hideDrawerMenu = (state) =>
  ({ ...state, drawer: { ...state.drawer, isOpen: false } });

const snackbarQueue = (state, { payload, meta }) => ({
  ...state,
  snackbar: {
    isOpen: !state.snackbar.isOpen,
    queue: [ ...state.snackbar.queue, {
      message: payload,
      variant: meta.variant,
      title:   meta.title
    }]
  }
});

const snackbarHide = (state) => ({
  ...state,
  snackbar: {
    isOpen: false,
    queue: [...state.snackbar.queue]
  }
});

const snackbarExit = (state) => ({
  ...state,
  snackbar: {
    isOpen: state.snackbar.queue.length > 1,
    queue: state.snackbar.queue.slice(1)
  }
});

const updateModal = (state, action) => ({
  ...state,
  modal: { ...state.modal, name: action.payload, type: action.meta.type }
});

const showModal = (state, action) => ({
  ...state,
  modal: { ...state.modal, name: action.payload, type: action.meta.type }
});

const hideModal = (state) => ({
  ...state,
  modal: { ...initialState.modal }
});

const initViewStart = (state, { payload: route } ) =>
  ({ ...state, initializing: route });

const initViewEnd = (state, { payload: route }) =>
  ({ ...state, initializing: null, currentView: route });


const ACTION_HANDLERS = {
  [UI.DRAWER_MENU_TOGGLE]: toggleDrawerMenu,
  [UI.DRAWER_MENU_SHOW]:   showDrawerMenu,
  [UI.DRAWER_MENU_HIDE]:   hideDrawerMenu,
  [UI.SNACKBAR_SHOW]:      snackbarQueue,
  [UI.SNACKBAR_HIDE]:      snackbarHide,
  [UI.SNACKBAR_EXIT]:      snackbarExit,
  [UI.MODAL_SHOW]:      showModal,
  [UI.MODAL_HIDE]:      hideModal,
  [UI.MODAL_UPDATE]:    updateModal,
  [UI.INIT_VIEW_START]:    initViewStart,
  [UI.INIT_VIEW_COMPLETE]: initViewEnd
};

export const initialState = {
  currentView: null,
  initializing: null,
  snackbar: {
    isOpen: false,
    isTransitioning: false,
    queue: []
  },
  drawer: {
    isOpen: false,
    menuProps: {}
  },
  modal: {
    name: '',
    type: ''
  }
};

export default function uiReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
