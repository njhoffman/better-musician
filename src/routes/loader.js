import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator';

import { injectReducer } from 'store/reducers';

import { init as initLog } from 'shared/logger';
const { info } = initLog('loader');

const LoadRoute = (route) => ({ dispatch }) => {
  info(`Loading route: ${route}`);
  class ReducerInjector extends React.Component {
    componentWillMount() {
      const { store } = this.context;
      dispatch({ type: 'INIT_VIEW', payload: { currentView: route } });
      injectReducer({
        key: `${route}View`,
        reducer: require(`routes/${route}/modules/reducer`).default,
        store
      });
    }
    render() {
      const Loader = Loadable({
        loader: () => import(`routes/${route}/components/${route}View`),
        loading: LoadingIndicator
      });
      return <Loader />;
    }
  }
  ReducerInjector.contextTypes = {
    store: PropTypes.object.isRequired
  };

  return <ReducerInjector />
};

export { LoadRoute };
