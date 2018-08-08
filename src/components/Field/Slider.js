import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';

class RenderSlider extends Component {
  static propTypes = {
    input:        PropTypes.object,
    label:        PropTypes.string,
    textColor:    PropTypes.string,
    valueDisplay: PropTypes.func,
    viewType:     PropTypes.string
  };

  state = {
    value: this.props.input.value ? parseInt(this.props.input.value) : 1
  };

  render() {
    const {
      input,
      // viewType,
      label,
      textColor,
      valueDisplay,
      ...custom } = this.props;

    return (
      <div>
        <label style={{ color: textColor, marginBottom: '-15px', marginTop: '20px' }}>
          <span>{label}</span>
          { valueDisplay && valueDisplay(this.state.value) }
          { !valueDisplay && <span style={{ float: 'right' }}>{this.state.value}</span> }
        </label>
        <Slider
          onChange={(e, value) => this.setState({ value: value })}
          input={input}
          value={parseInt(this.state.value)}
          {...custom}
        />
      </div>
    );
  }
}

export default RenderSlider;
