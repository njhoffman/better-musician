import React from 'react';
import PropTypes from 'prop-types';

// TODO: put this in utils
const curry = (fn) => {
  if (typeof fn !== 'function') {
    throw Error('curry only receive function params!');
  }
  const _len = fn.length; let
    _args = [];

  const _curry = () => {
    const args = [].concat(_args);
    /* eslint-disable no-undef */
    if (arguments.length >= _len) {
      _args = [];
    } else if (arguments.length + _args.length > _len) {
      _args = [];
    }
    _args = _args.concat([].slice.call(arguments));
    /* eslint-enable no-undef */
    if (_args.length === _len) {
      const rst = fn(..._args);
      _args = args;
      return rst;
    }
    return _curry;
  };
  _curry.toString = () => fn.toString();
  return _curry;
};

let __ErrorBoundary;
const exports = {};
if (process.env.NODE_ENV === 'development' || process.env.ERROR_ENV === 'development') {
  const { ErrorBoundary, FallbackView } = require('./WithErrorHandler');

  const withErrorHandler = curry((FallbackComponent, Component) => {
    const WithErrorHandler = props => {
      const { onError } = props;
      return (
        <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
          <Component {...props} />
        </ErrorBoundary>
      );
    };
    WithErrorHandler.displayName = `WithErrorHandler(${Component.displayName || Component.name || 'Component'})`;
    WithErrorHandler.propTypes = { onError: PropTypes.func.isRequired };
    return WithErrorHandler;
  });
  __ErrorBoundary = ErrorBoundary;
  exports.ErrorBoundary = ErrorBoundary;
  exports.FallbackView = FallbackView;
  exports.withErrorHandler = withErrorHandler;
  exports.errorHandlerDecorator = withErrorHandler(FallbackView);
} else {
  // production or other env (not development)
  // NOOP ErrorBoundary
  class ErrorBoundary extends React.Component {
    static propTypes = {
      onError:  PropTypes.func.isRequired,
      children: PropTypes.any.isRequired
    }

    componentDidCatch(error, info) {
      const { onError, ..._props } = this.props;
      if (typeof onError === 'function') {
        try {
          onError.call(this, error, info, _props);
        } catch (e) { throw e; }
      }
    }

    render() {
      return this.props.children;
    }
  }
  // NOOP HOC
  const withErrorHandler = curry((FallbackComponent, Component) => {
    const WithErrorHandler = props => {
      const { onError } = props;
      return (
        <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
          <Component {...props} />
        </ErrorBoundary>
      );
    };
    WithErrorHandler.propTypes = { onError: PropTypes.func.isRequired };
    return WithErrorHandler;
  });
  __ErrorBoundary = ErrorBoundary;
  exports.ErrorBoundary = ErrorBoundary;
  exports.withErrorHandler = withErrorHandler;
  exports.errorHandlerDecorator = withErrorHandler(void 0);
}

export { exports };
export default __ErrorBoundary;
