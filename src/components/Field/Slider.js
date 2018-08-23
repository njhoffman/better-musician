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
      valueDisplay,
      ...props
    } = this.props;

    return (
      <div>
        <FormLabel>
          <div style={{ display: 'inline-block', width: '50%', textAlign: 'left' }}>
            {label}
          </div>
          <div style={{ display: 'inline-block', width: '50%', textAlign: 'right' }}>
            { valueDisplay && valueDisplay(this.state.value) }
            { !valueDisplay && this.state.value }
          </div>
        </FormLabel>
        <SliderForm
          onChange={(value) => this.setState({ value })}
          input={input}
          value={parseInt(this.state.value)}
          style={{ padding: '8px 0px' }}
          {...props}
        />
      </div>
    );
  }
}

export default Slider;
