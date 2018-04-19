import React, {Component} from 'react';
import ErrorBoundaryFallbackComponent from './ErrorBoundaryFallbackComponent';

import {ComponentType} from 'react';


class ErrorBoundary extends Component<Props, State> {
  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  state = {
    error: null,
    info: null,
  };

  componentDidCatch(error, info) {
    const {onError} = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : "");
      } catch (ignoredError) {}
    }

    this.setState({error, info});
  }

  render() {
    const {children, FallbackComponent} = this.props;
    const {error, info} = this.state;

    if (error !== null) {
      return (
        <FallbackComponent
          componentStack={info ? info.componentStack : ''}
          error={error}
        />
      );
    }

    return children;
  }
}

export const withErrorBoundary = (props) => (
  <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
    <Component {...props} />
  </ErrorBoundary>
);

export default ErrorBoundary;
