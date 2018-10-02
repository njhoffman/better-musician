import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialSlider from '@material-ui/lab/Slider';
import { FormLabel } from '@material-ui/core';

import createComponent from './createFormField';

const SliderForm = createComponent(
  MaterialSlider, ({
    input: { onDragStart, onChange, name, value },
    onChange: onChangeFromField,
    defaultValue,
    meta,
    ...props
  }) => ({
    ...props,
    name,
    value,
    onChange: (event, value) => {
      onChange(value);
      if (onChangeFromField) {
        onChangeFromField(value);
      }
    }
  })
);

class Slider extends Component {
  static propTypes = {
    input:        PropTypes.object,
    label:        PropTypes.string,
    valueDisplay: PropTypes.func,
    viewType:     PropTypes.string,
    min:          PropTypes.number,
    max:          PropTypes.number,
    step:         PropTypes.number
  };

  static defaultProps = {
    min: 0,
    max: 10,
    step: 1
  };

  labelStyle = {
    display: 'inline-block',
    width: '50%'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.input.value > props.min ? props.input.value : props.min
    };
  }

  render() {
    const { label, valueDisplay, input, min, max, step } = this.props;
    // TODO: Find a better way
    input.value = this.state.value;
    return (
      <div>
        <FormLabel>
          <div style={{ ...this.labelStyle, textAlign: 'left' }}>
            {label}
          </div>
          <div style={{ ...this.labelStyle, textAlign: 'right' }}>
            { valueDisplay ? valueDisplay(this.state.value) : this.state.value }
          </div>
        </FormLabel>
        <SliderForm
          onChange={(value) => this.setState({ value })}
          value={this.state.value}
          style={{ padding: '8px 0px' }}
          { ...{ input, min, max, step } }
        />
      </div>
    );
  }
}

export default Slider;
