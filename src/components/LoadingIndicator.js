import React from 'react';

export default function Loading({ isLoading, pastDelay, error }) {
  console.info('Loading inciator');
  if (isLoading && pastDelay) {
    return <p>Loading...</p>;
  } else if (error && !isLoading) {
    console.info('WE HAVE  A PROBLEM', error);
    return <p>Error!</p>;
  } else {
    return null;
  }
}
