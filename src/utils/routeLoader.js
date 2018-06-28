import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator';

import { initView } from 'actions/view';
import { injectReducer } from 'store/reducers';

import { init as initLog } from 'shared/logger';
const { info, warn } = initLog('loader');

const LoadRoute = (route) => ({ /* dispatch, */ isAuthenticated }) => {
  class ViewInjector extends React.Component {
    componentWillMount() {
      const { store } = this.context;
      if (store.getState().ui.currentView === route) {
        warn(`Attempting to reload already loaded route: ${route}, ignoring...`);
        return;
      }
      initView(store, route);
      injectReducer({
        key: `${route}View`,
        reducer: require(`routes/${route}/modules/reducer`).default,
        store
      });
    }
    render() {
      info(`Loading route: ${route} (${isAuthenticated ? 'authenticated' : 'not authenticated'})`);
      const Loader = Loadable({
        loader: () => import(`routes/${route}/components/${route}View`),
        loading: LoadingIndicator
      });
      return <Loader />;
    }
  }
  ViewInjector.contextTypes = {
    store: PropTypes.object.isRequired
  };

  return <ViewInjector />;
};

export default LoadRoute;
