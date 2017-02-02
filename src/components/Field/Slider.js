import React, { Component, PropTypes } from 'react';
import { Slider } from 'redux-form-material-ui'


class RenderSliderField extends Component {

  state = {
    value: this.props.input.value ? parseInt(this.props.input.value) : 1
  };

  render () {
    const {
      input,
      viewType,
      label,
      textColor,
      valueDisplay,
      children,
      meta,
      ...custom } = this.props;

    return (
      <div>
        <label style={{color: textColor, marginBottom: "-15px", marginTop: "20px" }}>
          <span>{label}</span>
          { valueDisplay && valueDisplay(this.state.value) }
          { !valueDisplay &&
              <span style={{ float: "right" }}>{this.state.value}</span>
          }
        </label>
        <Slider
          onChange={(value) => this.setState({ value: value }) }
          input={input}
          value={parseInt(this.state.value)}
          {...custom}
        />
      </div>
    )
  }
};

export default RenderSliderField;
