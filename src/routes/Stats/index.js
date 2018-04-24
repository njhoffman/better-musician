import React from 'react';
import Loadable from 'react-loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

export default Loadable({
  loader: () => import('./components/StatsView'),
  loading: LoadingIndicator
});
