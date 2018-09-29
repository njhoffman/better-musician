import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uiHideSnackbar, uiSnackbarExited } from 'actions/ui';

import classNames from 'classnames';
import {
  IconButton,
  Snackbar as MatSnackbar,
  SnackbarContent,
  Typography,
  Slide,
  withStyles
} from '@material-ui/core';

import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Warning as WarningIcon
} from '@material-ui/icons';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const contentStyles = theme => ({
  snackbarContent: {
    flexGrow: 0,
    minWidth: '60%',
    padding: '2px 16px',
    borderRadius: '0px 0px 5px 5px',
    opacity: 0.95
  },
  success: {
    backgroundColor: '#216843'
  },
  error: {
    backgroundColor: '#7e1313'
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: '#ba5c00'
  },
  icon: {
    fontSize: 20,
    color: theme.palette.text.primary,
    verticalAlign: 'middle'
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  message: {
    opacity: 0.8,
  },
  title: {
    opacity: 1,
    marginRight: '10px'
  }
});

const SbContent = (props) => {
  const { classes, className, onClose, queue, ...other } = props;
  const { title, variant, message } = queue[0];
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={`${classNames(classes[variant], className)} ${classes.snackbarContent}`}
      aria-describedby='client-snackbar'
      message={
        <div className={classes.messageContainer}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          <Typography variant='subheading' className={classes.title}>
            {title}
          </Typography>
          <Typography variant='body2' id='client-snackbar' className={classes.message}>
            {message}
          </Typography>
        </div>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={onClose}
        >
          <Typography>
            <CloseIcon className={classes.icon} />
          </Typography>
        </IconButton>,
      ]}
      {...other}
    />
  );
};

SbContent.propTypes = {
  classes:   PropTypes.object.isRequired,
  className: PropTypes.string,
  queue:     PropTypes.array.isRequired,
  onClose:   PropTypes.func
};

const SbContentWrapper = withStyles(contentStyles)(SbContent);

const snackbarStyles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  closed: { },
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
  uiHideSnackbar,
  uiSnackbarExited,
  classes,
  queue
}) => (
  <MatSnackbar
    anchorOrigin={{ vertical, horizontal }}
    className={isOpen ? classes.open : classes.closed }
    classes={{ anchorOriginTopCenter: classes.topCenter }}
    TransitionComponent={Transition}
    open={isOpen}
    autoHideDuration={8000}
    onClose={(e, reason) => reason !== 'clickaway' && uiHideSnackbar()}
    onExited={uiSnackbarExited}>
    <SbContentWrapper
      onClose={uiHideSnackbar}
      queue={queue} />
  </MatSnackbar>
);

Snackbar.propTypes = {
  classes:          PropTypes.object.isRequired,
  queue:            PropTypes.array.isRequired,
  uiHideSnackbar:   PropTypes.func.isRequired,
  uiSnackbarExited: PropTypes.func.isRequired,
  isOpen:           PropTypes.bool.isRequired
};

const mapDispatchToProps = { uiHideSnackbar, uiSnackbarExited };
const mapStateToProps = (state) => ({
  isOpen: state.ui.snackbar.isOpen,
  queue: state.ui.snackbar.queue
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(snackbarStyles)(Snackbar));
