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
    isTransitioning: false,
    queue: []
  },
  drawer: {
    isOpen: false,
    menuProps: {}
  },
  modal: {
    name: null,
    type: null,
    isOpen: false
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
    queue: [...state.snackbar.queue, {
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

const updateModal = (state, { payload, meta }) => ({
  ...state,
  modal: { ...state.modal, name: payload, ...meta }
});

const showModal = (state, { payload, meta }) => ({
  ...state,
  modal: { ...state.modal, name: payload, isOpen: true, ...meta }
});

const hideModal = (state) => ({
  ...state,
  modal: { ...state.modal, isOpen: false }
});

const modalExit = (state) => ({
  ...state,
  modal: { ...initialState.modal }
});

const initViewStart = (state, { payload: route }) =>
  ({ ...state, initializing: route });

const initViewComplete = (state, {
  payload: route,
  meta: { pathname }
}) => ({
  ...state,
  initializing: null,
  currentView: route,
  initializedViews: _.uniqBy([
    ...state.initializedViews,
    { route, pathname }
  ], 'pathname')
});


const locationChangeView = (state, { payload: { pathname } }) => {
  const { info } = initLog('ui-reducer');

  const pathBase = pathname.split('?')[0];
  const view = _.find(state.initializedViews, { pathname: pathBase });
  if (view) {
    info(`Refreshing View "${view.route}", Route: ${view.pathname}`);
    return { ...state, currentView: view.route };
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
