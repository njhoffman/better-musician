import _ from 'lodash';
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { init as initLog } from 'shared/logger/browser';

const loggerHoc = (options = {}, Component) => {
  const {
    countRenders = true,
    countRendersDivisor = 1,
    // logPropChanges = false,
    // logStateChanges = false
  } = options;
  const longName = Component.displayName || Component.name;
  const shortName = longName.split('(')
    .pop()
    .replace(/\)/g, '');

  const count = { state: 0, stateless: 0 };

  class Wrapped extends React.Component {
    componentWillMount() {
      const { devConfig } = this.props;
      this.logger = initLog(shortName, devConfig.logger);
    }

    logRenders = (isState) => {
      if (isState) {
        count.state += 1;
      } else {
        count.stateless += 1;
      }
      const total = count.state + count.stateless;
      if (countRenders && total % countRendersDivisor === 0) {
        this.logger.info(`Render counter: ${total}`);
      }
    }

    render() {
      this.logRenders();
      return (
        <Component
          {...this.props}
          componentDidUpdate={() => this.logRenders(true)}
          logger={this.logger}
        />
      );
    }
  }

  Wrapped.displayName = `withDevTools(${longName})`;
  return Wrapped;
};

const stateProps = (state) => ({
  devConfig: _.get(state, 'config.dev')
});

export default (options) => compose(
  connect(stateProps),
  loggerHoc.bind(undefined, options)
);
