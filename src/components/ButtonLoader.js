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
    spinColorDark: Colors.darkBlack,
    spinColorLight: Colors.darkWhite,
    spinColorDisabled: Colors.minBlack,
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
        {this.props.icon}
        {this.props.label}
      </Button>
    );
  }
}

export default ButtonLoader;
