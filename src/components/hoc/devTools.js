import React from 'react';

const withDevTools = (Component) => {
  const Wrapped = (props) => (<Component {...props} />);
  Wrapped.displayName = `withDevTools(${Component.displayName || Component.name})`;
  return Wrapped;
};

export default withDevTools;
