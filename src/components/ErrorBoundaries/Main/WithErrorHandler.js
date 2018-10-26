import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { init as initLog } from 'shared/logger';
import FallbackView from './ErrorHandlerFallback';

const logger = initLog('error-handler');

class ErrorBoundary extends PureComponent {
  constructor() {
    super();

    this.closeErrorModal = this.closeErrorModal.bind(this);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  closeErrorModal() {
    this.setState({ hasError: false });
  }

  componentDidCatch(error, info) {
    // Update state if error happens
    this.setState({ hasError: true, error, errorInfo: info });

    // Report errors here
    const { onError, ..._props } = this.props;
    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info, _props);
      } catch (e) {
        logger.error(e);
      }
    }
  }

  render() {
    const { FallbackComponent, children, ..._props } = this.props;
    // if state contains error and in development environment we render fallback component
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      return (
        <FallbackComponent
          {..._props}
          closeErrorModal={this.closeErrorModal}
          error={error}
          errorInfo={errorInfo}
        />
      );
    }
    return children;
  }
}

ErrorBoundary.defaultProps = {
  FallbackComponent: FallbackView
};

ErrorBoundary.propTypes = {
  children:          PropTypes.any.isRequired,
  FallbackComponent: PropTypes.func.isRequired,
  onError:           PropTypes.func.isRequired
};

export { ErrorBoundary, FallbackView };
export default ErrorBoundary;
