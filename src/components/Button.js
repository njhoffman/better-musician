import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Button as MaterialButton,
  IconButton as MaterialIconButton,
  Tooltip,
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
    fontSize: 'inherit',
    lineHeight: 'normal'
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
  loaderColor
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
        color={loaderColor}
        loading={isLoading}
        size={iconHeight}
        sizeUnit='em'
      />
    );
  } else if (typeof Icon === 'object') {
    return {
      ...Icon,
      props: {
        ...iconProps,
        ...Icon.props
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
  baseClasses,
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
  tooltip,
  theme,
  ...props
}) => {
  const buttonProps = {
    disabled:  disabled || loading,
    classes: baseClasses,
    className,
    variant,
    style,
    size,
    mini
  };


  if (['add', 'remove'].indexOf(color) !== -1) {
    buttonProps.style = color === 'add'
      ? { ...style, ...theme.app.buttons.add }
      : { ...style, ...theme.app.buttons.remove };
  } else if (primary) {
    buttonProps.color = 'primary';
  } else if (secondary) {
    buttonProps.color = 'secondary';
  } else {
    buttonProps.color = color;
  }
  const labelClass = icon && label ? classes[`${iconAlign}Label`] : classes.centerLabel;
  const BaseButton = icon && !label ? MaterialIconButton : MaterialButton;
  const loaderColor = theme.palette.secondary.light;

  const renderButtonChildren = () => (
    <Fragment>
      {iconAlign === 'right' && label && <div className={labelClass}>{label}</div>}
      {icon && (
        <div className={classes.iconWrapper}>
          {renderIcon({ ...props, classes, icon, loading, loaderColor })}
        </div>
      )}
      {iconAlign !== 'right' && label && <div className={labelClass}>{label}</div>}
    </Fragment>
  );

  // need to include span for tooltip event firing
  const renderDisabledButtonTooltip = () => (
    <Tooltip title={tooltip}>
      <span>
        <BaseButton onClick={(e) => onClick(e)} {...buttonProps}>
          {renderButtonChildren()}
        </BaseButton>
      </span>
    </Tooltip>
  );

  const renderButtonTooltip = () => (
    <Tooltip title={tooltip}>
      <BaseButton onClick={(e) => onClick(e)} {...buttonProps}>
        {renderButtonChildren()}
      </BaseButton>
    </Tooltip>
  );

  if (tooltip && disabled) {
    return renderDisabledButtonTooltip();
  } else if (tooltip) {
    return renderButtonTooltip();
  }
  return (
    <BaseButton onClick={(e) => onClick(e)} {...buttonProps}>
      {renderButtonChildren()}
    </BaseButton>
  );
};

const renderLinkButton = (link, {
  classes,
  ...props
}) => (
  <NavLink to={link} className={classes.linkText}>
    {renderButton({ ...props, classes })}
  </NavLink>
);

const Button = ({
  link,
  ...props
}) => (
  <Fragment>
    {link && renderLinkButton(link, { ...props })}
    {!link && renderButton({ ...props })}
  </Fragment>
);

Button.propTypes = {
  baseClasses : PropTypes.instanceOf(Object),
  classes     : PropTypes.instanceOf(Object).isRequired,
  className   : PropTypes.string,
  color       : PropTypes.string,
  disabled    : PropTypes.bool,
  link        : PropTypes.string,
  icon        : PropTypes.oneOfType([PropTypes.node, PropTypes.instanceOf(Object)]),
  iconAlign   : PropTypes.string,
  iconHeight  : PropTypes.number,
  label       : PropTypes.string,
  loading     : PropTypes.bool,
  onClick     : PropTypes.func,
  override    : PropTypes.shape({ loading: PropTypes.bool }),
  primary     : PropTypes.bool,
  primary2    : PropTypes.bool,
  secondary   : PropTypes.bool,
  spinnerType : PropTypes.string,
  theme       : PropTypes.instanceOf(Object).isRequired,
  tooltip     : PropTypes.string,
  variant     : PropTypes.string
};

Button.defaultProps = {
  // icon: ActionFavorite,
  loading     : false,
  disabled    : false,
  baseClasses : {},
  className   : '',
  variant     : 'contained',
  spinnerType : 'ring',
  iconAlign   : 'right',
  size        : 'small',
  color       : 'default',
  link        : null,
  tooltip     : null,
  primary     : false,
  primary2    : false,
  delete      : false,
  secondary   : false,
  label       : null,
  override    : {},
  onClick     : (e) => ({}),
  icon        : null,
  iconHeight  : 1.0
};


export default withTheme()(withStyles(styles)(Button));
