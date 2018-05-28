import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
// import ActionFavorite from 'material-ui-icons/Favorite';
import * as Colors from 'material-ui/colors';
import Spinner from 'react-loader';
import { withTheme } from 'material-ui/styles';

export class ButtonLoader extends React.Component {
  static propTypes = {
    icon:                    PropTypes.any,
    loading:                 PropTypes.bool,
    spinConfig:              PropTypes.object,
    spinColorDark:           PropTypes.string,
    spinColorLight:          PropTypes.string,
    spinColorDisabled:       PropTypes.string,
    onClick:                 PropTypes.func.isRequired,
    style:                   PropTypes.object,
    disabled:                PropTypes.bool,
    labelColor:              PropTypes.string,
    primary:                 PropTypes.bool,
    secondary:               PropTypes.bool,
    href:                    PropTypes.string,
    label:                   PropTypes.string,
    labelPosition:           PropTypes.string,
    flatButton:              PropTypes.bool,
    labelStyle:              PropTypes.object,
    rippleStyle:             PropTypes.object,
    disabledBackgroundColor: PropTypes.string,
    disabledLabelColor:      PropTypes.string,
    fullWidth:               PropTypes.string,
    backgroundColor:         PropTypes.string,
    className:               PropTypes.string
  };

  static defaultProps = {
    // icon: ActionFavorite,
    loading: false,
    spinConfig: {
      lines: 10,
      length: 4,
      width: 2,
      radius: 3
    },
    flatButton: false,
    // TODO: pull from theme
    spinColorDark: '#000000',
    spinColorLight: '#dddddd',
    spinColorDisabled: '#444444',
    style: {}
  };

  handleClick(ev) {
    ev.preventDefault();
    this.props.onClick(ev);
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

  renderIcon() {
    let icon;
    const color = this.getColor();
    if (this.props.loading) {
      icon = (
        <div style={{
          // position: "absolute", top: 15, left: 7
        }}>
          <Spinner
            ref='spinner'
            {...this.props.spinConfig}
            color={color}
            loaded={false} />
        </div>
      );
    } else {
      if (typeof (this.props.icon) === 'object') {
        icon = this.props.icon;
      } else {
        const { icon: Icon } = this.props;
        icon = <Icon color={color} />;
      }
    }

    return (
      <span style={{
        display: 'inline-flex',
        marginRight: '5px'
        // width: 25, height: 25, position: "absolute", left: 10, top: 3
      }}>
        {icon}
      </span>
    );
  }

  render() {
    let color = this.getColor();
    const labelColor = this.props.labelColor || color;
    const flatButton = this.props.flatButton;

    const props = {
      className: this.props.className,
      disabled:  this.props.disabled || this.props.loading,
      href:      this.props.href,
      style:     this.props.style
    };
    return (
      <Button
        {...props}
        variant={this.props.flatButton ? 'flat' : 'raised'}
        color={this.props.secondary ? 'secondary' : 'primary'}
        onClick={(e) => this.handleClick(e)}>
        {this.renderIcon()}
        {!this.props.loading && this.props.label}
      </Button>
    );
  }
}

export default ButtonLoader;
