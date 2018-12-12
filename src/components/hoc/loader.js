import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import { initViewStart, initViewComplete } from 'actions/ui';
import { init as initLog } from 'shared/logger';

const { debug }  = initLog('hoc-loader');
const LoadComponent = (routeName, isAuthenticated, props) => {
  const {
    store,
    history,
    location: { pathname },
    store: { dispatch }
  } = props;
  debug(`Loading view component: ${routeName}View`);
  initViewStart({ routeName, store, history, pathname });

  return import(
    /* webpackChunkName: "[request]" */
    `routes/${routeName}/components/${routeName}View`
  ).then(View => {
    debug(`Rendering view component: ${routeName}View`);
    initViewComplete({ routeName, pathname, isAuthenticated, dispatch });
    return View;
  });
};

const LoadRoute = (routeName, props) => (
  Loadable({
    loading: LoadingIndicator,
    loader: () => LoadComponent(routeName, false, props),
  })
);
export default LoadRoute;
