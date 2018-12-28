import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import withLogger from 'components/hoc/logger';

const hocMap = {
  redux:  connect,
  styles: withStyles,
  logger: withLogger
};

const connectHocs = ({ logger: logOptions, ...hocItems }, Component) => {
  const hocs = [];
  _.keys(hocItems)
    .forEach(key => {
      const hocArgs = hocItems[key];
      if (hocMap[key]) {
        hocs.push(hocMap[key](...[].concat(hocArgs)));
      } else {
        /* eslint-disable no-console */
        console.error('Cannot find hoc', key);
        /* eslint-enable no-console */
      }
    });

  if (logOptions !== false) {
    // connect logger hoc directly to component to allow render counting
    return compose(...hocs)(withLogger(logOptions)(Component));
  }
  return compose(...hocs)(Component);
};

export default connectHocs;
