import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import MaterialButton from '@material-ui/core/Button';
import MaterialIconButton from '@material-ui/core/IconButton';
// import ActionFavorite from 'material-ui-icons/Favorite';
import Spinners from 'react-spinners';
// BarLoader, BeatLoader, BounceLoader, CircleLoader, ClipLoader, ClimbingBoxLoader, DotLoader,
// FadeLoader, GridLoader, HashLoader, MoonLoader, PacManLoader, PropogateLoader, PulseLoader, RingLoader
// RiseLoader, RotateLoader, ScaleLoader, SyncLoader

const styles = theme => ({
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
  rightWrapper: {
    marginRight: theme.spacing.unit,
    fontSize: 'inherit'
  },
  leftWrapper: {
    marginLeft: theme.spacing.unit,
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

export class Button extends React.Component {
  static propTypes = {
    className:               PropTypes.string,
    classes:                 PropTypes.object.isRequired,
    color:                   PropTypes.string,
    disabled:                PropTypes.bool,
    href:                    PropTypes.string,
    icon:                    PropTypes.any,
    iconAlign:               PropTypes.string,
    iconHeight:              PropTypes.number,
    label:                   PropTypes.string,
    loading:                 PropTypes.bool,
    onClick:                 PropTypes.func,
    override:                PropTypes.object,
    primary:                 PropTypes.bool,
    secondary:               PropTypes.bool,
    spinnerType:             PropTypes.string.isRequired,
    style:                   PropTypes.object,
    theme:                   PropTypes.object,
    variant:                 PropTypes.string
  };

  static defaultProps = {
    // icon: ActionFavorite,
    loading:     false,
    variant:     'raised',
    spinnerType: 'ring',
    iconAlign:   'right',
    // TODO: pull from theme
    style:       {},
    override:    {}
  };

  handleClick(ev) {
    this.props.onClick && this.props.onClick(ev);
  }

  ucFirst(str) {
    return str.toLowerCase().replace(/^\w/, c => c.toUpperCase());
  }

  renderIcon() {
    const { icon: Icon, classes, spinnerType }  = this.props;
    const loading = this.props.loading || this.props.override.loading;
    const height = this.props.iconHeight || 1.0;
    if (loading) {
      const loaderName = this.ucFirst(`${spinnerType}Loader`);
      const LoaderIcon = Spinners[loaderName] ? Spinners[loaderName] : Spinners.RingLoader;
      return (
        <LoaderIcon
          color={this.props.theme.palette.secondary.light}
          loading={loading}
          size={height}
          sizeUnit='em' />
      );
    } else if (typeof Icon === 'object') {
      return {
        ...Icon,
        props: {
          ...Icon.props,
          style: { height: `${height}em` },
          className: `${classes.icon}`
        }
      };
    } else if (Icon) {
      return (
        <Icon
          style={{ height: `${height}em` }}
          className={`${classes.icon}`}
        />
      );
    } else {
      return '';
    }
  }

  renderLabel() {
    const props = {
      className: this.props.className,
      disabled:  this.props.disabled || this.props.loading,
      variant:   this.props.variant,
      color:     this.props.primary ? 'primary' : this.props.secondary ? 'secondary' : this.props.color,
      style:     this.props.style
    };

    if (this.props.icon && !this.props.label) {
      return (
        <MaterialIconButton
          {...props}
          onClick={(e) => this.handleClick(e)}>
          {this.renderIcon()}
        </MaterialIconButton>
      );
    } else {
      return (
        <MaterialButton
          {...props}
          onClick={(e) => this.handleClick(e)}>
          {this.props.iconAlign === 'right' && (
            <span className={this.props.classes.rightWrapper}>
              {this.props.label}
            </span>
          )}
          {this.props.icon && (
            <span className={this.props.classes.iconWrapper}>
              {this.renderIcon()}
            </span>
          )}
          {this.props.iconAlign === 'left' && (
            <span className={this.props.classes.leftWrapper}>
              {this.props.label}
            </span>
          )}
        </MaterialButton>
      );
    }
  }

  render() {
    if (this.props.href) {
      return (
        <NavLink
          to={this.props.href}
          className={`${this.props.classes.linkText}`}>
          {this.renderLabel()}
        </NavLink>
      );
    } else {
      return this.renderLabel();
    }
  }
}

export default withTheme()(withStyles(styles)(Button));
