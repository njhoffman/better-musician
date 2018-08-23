import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uiHideSnackbar } from 'actions/ui';

import classNames from 'classnames';
import {
  IconButton,
  Snackbar,
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

const styles1 = theme => ({
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
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const SbContent = (props) => {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={`${classNames(classes[variant], className)} ${classes.snackbarContent}`}
      aria-describedby='client-snackbar'
      message={
        <Typography variant='body2' id='client-snackbar' className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </Typography>
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
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
};

const SbContentWrapper = withStyles(styles1)(SbContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class Snackbars extends Component {

  handleClick = () => {
    this.props.uiHideSnackbar();
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.uiHideSnackbar();
  };

  render() {
    const { isOpen, variant, message } = this.props;

    return (
      <Snackbar
        // transitionDuration, TransitionComponent=Fade
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={(tProps) => <Slide {...tProps } direction='up' />}
        open={isOpen}
        autoHideDuration={6000}
        onClose={this.handleClose}>
        <SbContentWrapper
          onClose={this.handleClose}
          variant={variant} // error, warning, info, success
          message={message} />
      </Snackbar>
    );
  }
}

Snackbars.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
};

const mapDispatchToProps = { uiHideSnackbar };
const mapStateToProps = (state) => ({
  isOpen: state.ui.snackbar.isOpen,
  message: state.ui.snackbar.message,
  variant: state.ui.snackbar.variant
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles2)(Snackbars));
