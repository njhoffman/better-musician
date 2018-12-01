import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Slide,
  Snackbar as MaterialSnackbar,
  withStyles
} from '@material-ui/core';
import { uiHideSnackbar, uiSnackbarExit } from 'actions/ui';
import SnackbarContent from './SnackbarContent';

const styles = (theme) => ({
  closed: {
    height: 'auto'
  },
  open: {
    height: 'auto'
  },
  topCenter: {
    marginTop: '40px'
  },
});

// const slideLeft = (props) => (<Slide {...props} direction="left" />);
// const slideRight = (props) => (<Slide {...props} direction="right" />);
// const slideDown = (props) => (<Slide {...props} direction="down" />);
const slideUp = (props) => (<Slide {...props} direction='up' />);
const Transition = slideUp;
const vertical = 'top';
const horizontal = 'center';

const Snackbar = ({
  isOpen,
  hideSnackbar,
  snackbarExit,
  classes,
  queue
}) => (
  <MaterialSnackbar
    anchorOrigin={{ vertical, horizontal }}
    className={isOpen ? classes.open : classes.closed}
    classes={{ anchorOriginTopCenter: classes.topCenter }}
    TransitionComponent={Transition}
    disableWindowBlurListener
    open={isOpen}
    autoHideDuration={8000}
    onClose={(e, reason) => reason !== 'clickaway' && hideSnackbar()}
    onExited={snackbarExit}>
    <SnackbarContent
      onClose={hideSnackbar}
      queue={queue}
    />
  </MaterialSnackbar>
);

Snackbar.propTypes = {
  classes:      PropTypes.shape({
    open:      PropTypes.string,
    closed:    PropTypes.string,
    topCenter: PropTypes.string
  }).isRequired,
  queue:        PropTypes.arrayOf(PropTypes.object).isRequired,
  hideSnackbar: PropTypes.func.isRequired,
  snackbarExit: PropTypes.func.isRequired,
  isOpen:       PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  hideSnackbar: uiHideSnackbar,
  snackbarExit: uiSnackbarExit
};
const mapStateToProps = (state) => ({
  isOpen: _.get(state, 'ui.snackbar.isOpen'),
  queue:  _.get(state, 'ui.snackbar.queue')
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Snackbar));
