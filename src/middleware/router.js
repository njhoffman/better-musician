import { locationChange } from 'actions/router';
import { PUSH, REPLACE, GO, GO_BACK, GO_FORWARD } from 'constants/router';

export const routerMiddleware = (history) => () => (next) => (action) => {
  switch (action.type) {
    case PUSH:
      history.push(action.payload);
      break;
    case REPLACE:
      history.replace(action.payload);
      break;
    case GO:
      history.go(action.payload);
      break;
    case GO_BACK:
      history.goBack();
      break;
    case GO_FORWARD:
      history.goForward();
      break;
    default:
      return next(action);
  }
};

export const startListener = (history, store) => {
  store.dispatch(locationChange({
    pathname: history.location.pathname,
    search: history.location.search,
    hash: history.location.hash,
  }));
  history.listen((location) => {
    store.dispatch(locationChange({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    }));
  });
};
