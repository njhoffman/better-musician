import React, { PropTypes } from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import * as Colors from "material-ui/styles/colors";
import Spinner from "react-loader";

class ButtonLoader extends React.Component {
  static propTypes = {
    icon: PropTypes.any,
    loading: PropTypes.bool,
    spinConfig: PropTypes.object,
    spinColorDark: PropTypes.string,
    spinColorLight: PropTypes.string,
    spinColorDisabled: PropTypes.string,
    children: PropTypes.node,
    flat: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    icon: ActionFavorite,
    loading: false,
    spinConfig: {
      lines: 10,
      length: 4,
      width: 2,
      radius: 3,
    },
    flat: false,
    spinColorDark: Colors.darkBlack,
    spinColorLight: Colors.darkWhite,
    spinColorDisabled: Colors.minBlack,
    children: <span>Submit</span>,
    style: {}
  };

  handleClick (ev) {
    ev.preventDefault();
    this.props.onClick(ev);
  }

  getColor () {
    if (this.props.disabled) {
      return this.props.spinColorDisabled;
    } else if (this.props.primary || this.props.secondary) {
      return this.props.spinColorLight;
    } else {
      return this.props.spinColorDark;
    }
  }

  renderIcon () {
    let icon,
      color = this.getColor();

    if (this.props.loading) {
      icon = (
        <div style={{position: "absolute", top: 15, left: 7}}>
          <Spinner
            ref="spinner"
            {...this.props.spinConfig}
            color={color}
            loaded={false} />
        </div>
      );
    } else {
      if (typeof(this.props.icon) === "object") {
        icon = this.props.icon;
      } else {
        icon = <this.props.icon color={color} style={{width: 15, height: 15}} />;
      }
    }

    return (
      <span style={{
        width: 15,
        height: 15,
        position: "absolute",
        left: 10,
        top: 3
      }}>
      {icon}
    </span>
    );
  }

  render () {
    let color = this.getColor();
    const labelColor = this.props.labelColor || color;
    const flatButton = this.props.flatButton;

    const props = {
      backgroundColor: this.props.backgroundColor,
      children: this.props.children,
      className: this.props.className,
      disabled: this.props.disabled || this.props.loading,
      href: this.props.href,
      label: this.props.label || <span style={{paddingLeft: 15, color: labelColor}}>{this.props.children}</span>,
      labelPosition: this.props.labelPosition || "after",
      labelStyle: this.props.labelStyle,
      primary: this.props.primary,
      secondary: this.props.secondary,
      style: this.props.style,
      type: this.props.type
    };

    if (!flatButton) {
      const raisedProps = {...props, ...{
        disabledBackgroundColor: this.props.disabledBackgroundColor,
        disabledLabelColor: this.props.disabledLabelColor,
        fullWidth: this.props.fullWidth,
        labelColor: this.props.labelColor || color,
        rippleStyle: this.props.rippleStyle
      }};

      return (
        <RaisedButton
          {...raisedProps}
          onClick={this.handleClick.bind(this)}>
          {this.renderIcon()}
        </RaisedButton>
      );
    } else {
      return (
        <FlatButton
          {...props}
          onClick={this.handleClick.bind(this)}>
          {this.renderIcon()}
        </FlatButton>
      );
    }
  }
}

export default ButtonLoader;