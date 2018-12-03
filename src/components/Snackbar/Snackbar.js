import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Slide, Fade, withStyles, withTheme, // Zoom, Grow, Collapse
  Snackbar as MaterialSnackbar
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

const vertical = 'top';
const horizontal = 'center';

// TODO: implement separate duration for hiding/showing when >1 message in queue

const Snackbar = ({
  isOpen,
  hideSnackbar,
  snackbarExit,
  classes,
  queue,
  theme: { app: { snackbar: { duration, transition } } }
}) => (
  <MaterialSnackbar
    anchorOrigin={{ vertical, horizontal }}
    className={isOpen ? classes.open : classes.closed}
    classes={{ anchorOriginTopCenter: classes.topCenter }}
    autoHideDuration={duration}
    open={isOpen}
    disableWindowBlurListener
    TransitionProps={transition.props}
    TransitionComponent={/fade/i.test(transition.name) ? Fade : Slide}
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
  isOpen:       PropTypes.bool.isRequired,
  theme:        PropTypes.instanceOf(Object).isRequired
};

const mapDispatchToProps = {
  hideSnackbar: uiHideSnackbar,
  snackbarExit: uiSnackbarExit
};
const mapStateToProps = (state) => ({
  isOpen: _.get(state, 'ui.snackbar.isOpen'),
  queue:  _.get(state, 'ui.snackbar.queue')
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withTheme()(withStyles(styles)(Snackbar))
);
