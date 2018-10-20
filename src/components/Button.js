import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Button as MaterialButton,
  IconButton as MaterialIconButton,
  withStyles,
  withTheme
} from '@material-ui/core';
import Spinners from 'react-spinners';
// BarLoader, BeatLoader, BounceLoader, CircleLoader, ClipLoader, ClimbingBoxLoader, DotLoader,
// FadeLoader, GridLoader, HashLoader, MoonLoader, PacManLoader, PropogateLoader, PulseLoader, RingLoader
// RiseLoader, RotateLoader, ScaleLoader, SyncLoader

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  buttonLabel: {
    justifyContent: 'space-around'
  },
  loaderIcon: {
    // color: theme.palette.secondary.main,
    // border: theme.palette.secondary.main
    transform: 'none'
  },
  iconWrapper: {
    fontSize: 'inherit',
    display: 'inline-flex'
  },
  icon: {
    fontSize: 'inherit'
  },
  rightLabel: {
    marginRight: theme.spacing.unit,
    fontSize: 'inherit'
  },
  leftLabel: {
    marginLeft: theme.spacing.unit,
    fontSize: 'inherit'
  },
  centerLabel: {
    fontSize: 'inherit'
  },
  centerIcon: {
    fontSize: 'inherit',
    transform: 'none'
  },
  linkText: {
    textDecoration: 'none'
  }
});

const ucFirst = (str) => str.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());

const renderIcon = ({
  icon: Icon,
  classes,
  spinnerType,
  loading,
  override,
  iconHeight,
  theme
}) => {
  const isLoading = loading || override.loading;
  const iconProps = {
    style: { height: `${iconHeight}em` },
    className: `${classes.icon}`
  };

  if (isLoading) {
    const loaderName = ucFirst(`${spinnerType}Loader`);
    const LoaderIcon = Spinners[loaderName] ? Spinners[loaderName] : Spinners.RingLoader;
    return (
      <LoaderIcon
        color={theme.palette.secondary.light}
        loading={isLoading}
        size={iconHeight}
        sizeUnit='em'
      />
    );
  } else if (typeof Icon === 'object') {
    return {
      ...Icon,
      props: {
        ...Icon.props,
        ...iconProps
      }
    };
  }
  return (
    <Icon {...iconProps} />
  );
};

const renderButton = ({
  label,
  classes,
  iconAlign,
  icon,
  primary,
  secondary,
  color,
  onClick,
  className,
  variant,
  loading,
  style,
  size,
  mini,
  disabled,
  ...props
}) => {
  const buttonProps = {
    disabled:  disabled || loading,
    className,
    variant,
    color,
    style,
    size,
    mini
  };
  if (primary || secondary) {
    buttonProps.color = primary ? 'primary' : 'secondary';
  }
  const labelClass = icon && label ? classes[`${iconAlign}Label`] : classes.centerLabel;
  const BaseButton = icon && !label ? MaterialIconButton : MaterialButton;

  return (
    <BaseButton onClick={(e) => onClick(e)} {...buttonProps}>
      {iconAlign === 'right' && label && (
        <span className={labelClass}>{label}</span>
      )}
      {icon && (
        <span className={classes.iconWrapper}>
          {renderIcon({ ...props, classes, icon, loading })}
        </span>
      )}
      {iconAlign !== 'right' && label && (
        <span className={labelClass}>{label}</span>
      )}
    </BaseButton>
  );
};

const Button = ({
  link,
  classes,
  ...props
}) => (
  <Fragment>
    {link && (
      <NavLink to={link} className={classes.linkText}>
        {renderButton({ ...props, classes })}
      </NavLink>
    )}
    {!link && renderButton({ ...props, classes })}
  </Fragment>
);

Button.propTypes = {
  classes:     PropTypes.instanceOf(Object).isRequired,
  className:   PropTypes.string,
  color:       PropTypes.string,
  disabled:    PropTypes.bool,
  link:        PropTypes.string,
  icon:        PropTypes.node,
  iconAlign:   PropTypes.string,
  iconHeight:  PropTypes.number,
  label:       PropTypes.string,
  loading:     PropTypes.bool,
  onClick:     PropTypes.func,
  override:    PropTypes.shape({ loading: PropTypes.bool }),
  primary:     PropTypes.bool,
  secondary:   PropTypes.bool,
  spinnerType: PropTypes.string,
  theme:       PropTypes.instanceOf(Object).isRequired,
  variant:     PropTypes.string
};

Button.defaultProps = {
  // icon: ActionFavorite,
  loading:     false,
  disabled:    false,
  className:   '',
  variant:     'contained',
  spinnerType: 'ring',
  iconAlign:   'right',
  size:        'small',
  color:       'default',
  link:        null,
  primary:     false,
  secondary:   false,
  label:       null,
  override:    {},
  onClick:     null,
  icon:        null,
  iconHeight:  1.0
};


export default withTheme()(withStyles(styles)(Button));
