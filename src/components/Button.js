import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
    // backgroundColor:         PropTypes.string,
    // className:               PropTypes.string,
    color:                   PropTypes.string,
    disabled:                PropTypes.bool,
    // fullWidth:               PropTypes.string,
    href:                    PropTypes.string,
    icon:                    PropTypes.any,
    iconAlign:               PropTypes.string,
    label:                   PropTypes.string,
    loading:                 PropTypes.bool,
    onClick:                 PropTypes.func,
    override:                PropTypes.object,
    style:                   PropTypes.object,
    theme:                   PropTypes.object,
    variant:                 PropTypes.string,
    primary:                 PropTypes.bool,
    secondary:               PropTypes.bool
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

  getColor() {
    if (this.props.disabled) {
      return this.props.spinColorDisabled;
    } else if (this.props.primary || this.props.secondary) {
      return this.props.spinColorLight;
    } else {
      return this.props.spinColorDark;
    }
  }

  ucFirst(str) {
    return str.toLowerCase().replace(/^\w/, c => c.toUpperCase());
  }

  renderIcon() {
    const color = this.getColor();
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
    const iconClass = `${this.props.label ? this.props.iconAlign : 'center'}Icon`;

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
        <Link
          to={this.props.href}
          className={`${this.props.classes.linkText}`}>
          {this.renderLabel()}
        </Link>
      );
    } else {
      return this.renderLabel();
    }
  }
}

export default withTheme()(withStyles(styles)(Button));
