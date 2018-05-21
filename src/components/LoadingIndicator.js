import React from 'react';

const LoadingIndicator = ({ isLoading, pastDelay, error }) => {
  if (isLoading && pastDelay) {
    return <p>Loading...</p>;
  } else if (error && !isLoading) {
    console.info('error', error);
    return <p>Error!</p>;
  } else {
    return null;
  }
};

export default LoadingIndicator;
