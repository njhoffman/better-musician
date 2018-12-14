import _ from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import * as UI from 'constants/ui';
import { init as initLog } from 'shared/logger';

export const initialState = {
  currentView: null,
  initializing: null,
  initializedViews: [],
  snackbar: {
    isOpen: false,
    transitioning: false,
    queue: []
  },
  drawer: {
    isOpen: false,
    menuProps: {}
  },
  modal: {
    name: null,
    variant: null,
    isOpen: false,
    meta: {}
  }
};

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
    transitioning: state.snackbar.transitioning,
    queue: [...state.snackbar.queue, {
      message: payload,
      ...meta
    }]
  }
});

const snackbarHide = (state) => ({
  ...state,
  snackbar: {
    isOpen: false,
    transitioning: true,
    queue: [...state.snackbar.queue]
  }
});

const snackbarExit = (state) => ({
  ...state,
  snackbar: {
    isOpen: state.snackbar.queue.length > 1,
    queue: state.snackbar.queue.slice(1),
    transitioning: false
  }
});

const updateModal = (state, { payload, meta: { variant, ...meta } }) => ({
  ...state,
  modal: {
    ...state.modal,
    name: payload,
    variant: state.modal.variant || variant,
    meta: {
      ...state.modal.meta,
      ...meta
    }
  }
});

const showModal = (state, { payload, meta: { variant, ...meta } }) => ({
  ...state,
  modal: {
    ...state.modal,
    name: payload,
    variant,
    isOpen: true,
    meta: {
      ...state.modal.meta,
      ...meta
    }
  }
});

const hideModal = (state) => ({
  ...state,
  modal: { ...state.modal, isOpen: false }
});

const modalExit = (state) => ({
  ...state,
  modal: { ...initialState.modal }
});

const initViewStart = (state, { payload: routeName }) => ({ ...state, initializing: routeName });

const initViewComplete = (state, {
  payload: routeName,
  meta: { pathname }
}) => ({
  ...state,
  initializing     : null,
  currentView      : routeName,
  initializedViews : _.uniqBy([...state.initializedViews, { pathname, routeName }])
});

const locationChangeView = (state, { payload: { location } }) => {
  const { info, debug } = initLog('ui-reducer');
  const pathBase = location.pathname.split('?')[0];
  const view = _.find(state.initializedViews, { pathname: pathBase });
  if (view) {
    debug(`Refreshing View "${view.routeName}", Route: ${view.pathname}`);
    return { ...state, currentView: view.routeName };
  }
  info(`Initializing Route: ${pathBase}`);
  return { ...state, currentView: null };
};

const ACTION_HANDLERS = {
  [LOCATION_CHANGE]:       locationChangeView,
  [UI.DRAWER_MENU_TOGGLE]: toggleDrawerMenu,
  [UI.DRAWER_MENU_SHOW]:   showDrawerMenu,
  [UI.DRAWER_MENU_HIDE]:   hideDrawerMenu,
  [UI.SNACKBAR_SHOW]:      snackbarQueue,
  [UI.SNACKBAR_HIDE]:      snackbarHide,
  [UI.SNACKBAR_EXIT]:      snackbarExit,
  [UI.MODAL_SHOW]:         showModal,
  [UI.MODAL_HIDE]:         hideModal,
  [UI.MODAL_EXIT]:         modalExit,
  [UI.MODAL_UPDATE]:       updateModal,
  [UI.INIT_VIEW_START]:    initViewStart,
  [UI.INIT_VIEW_COMPLETE]: initViewComplete
};

export default function uiReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
