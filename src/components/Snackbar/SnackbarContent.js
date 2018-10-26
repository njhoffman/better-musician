import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  IconButton,
  SnackbarContent as MaterialSnackbarContent,
  Typography,
  withStyles
} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

const styles = (theme) => ({
  snackbarContent: {
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
    alignItems: 'center',
    flex: 1
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0
  },
  message: {
    opacity: 0.8,
  },
  title: {
    opacity: 1,
    marginRight: '10px',
    whiteSpace: 'nowrap'
  }
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const SnackbarContent = (props) => {
  const { classes, className, onClose, queue, ...other } = props;
  const { title, variant, message } = queue[0];
  const Icon = variantIcon[variant];
  return (
    <MaterialSnackbarContent
      className={`${classNames(classes[variant], className)} ${classes.snackbarContent}`}
      aria-describedby='client-snackbar'
      classes={{
        message: classes.messageContainer,
        action: classes.actionContainer
      }}
      message={(
        <Fragment>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          <Typography variant='overline' className={classes.title}>
            {title}
          </Typography>
          <Typography variant='body2' id='client-snackbar' className={classes.message}>
            {message}
          </Typography>
        </Fragment>
      )}
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={onClose}>
          <Typography>
            <CloseIcon className={classes.icon} />
          </Typography>
        </IconButton>,
      ]}
      {...other}
    />
  );
};

SnackbarContent.defaultProps = {
  className: ''
};

SnackbarContent.propTypes = {
  classes:   PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
  queue:     PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose:   PropTypes.func.isRequired
};

export default withStyles(styles)(SnackbarContent);
