import React from 'react';
import Loadable from 'react-loadable';

import { init as initLog } from 'shared/logger';
const { info } = initLog('loader');

const LoadingIndicator = ({ isLoading, pastDelay, error }) => {
  if (isLoading && pastDelay) {
    return <p>Loading...</p>;
  } else if (error && !isLoading) {
    return <p>Error!</p>;
  } else {
    return null;
  }
}

const LoadRoute = (route) => {
  info(`Loading route: ${route}`);
  return Loadable({
    loader: () => import(`routes/${route}/components/${route}View`),
    // loader: () => import(`routes/${route}`),
    loading: LoadingIndicator
  });
};

export { LoadRoute };
export default LoadingIndicator;
