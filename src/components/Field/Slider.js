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

  static defaultProps = {
    min: 0,
    max: 10
  };

  labelStyle = {
    display: 'inline-block',
    width: '50%'
  };

  constructor(props) {
    super(props);
    // TODO: add utility function
    const initialValue = !isNaN(parseFloat(props.input.value)) && isFinite(props.input.value)
      ? parseInt(props.input.value) : parseInt(props.min);
    this.state = {
      value: initialValue
    };
  }

  render() {
    const {
      input,
      label,
      valueDisplay,
      ...props
    } = this.props;

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
