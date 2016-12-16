import React, { Component, PropTypes } from 'react';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui'

const RenderSelectField = ({
  ...input,
  label,
  children,
  meta: { touched, error },
  ...custom }) => (
  <div>
    <SelectField
      floatingLabelText={label}
      errorText={touched && error}
      children={children}
      input={input}
      {...custom}
    />
  </div>
);

const RenderTextField = ({
  ...input,
  label,
  children,
  meta: { touched, error },
  ...custom }) => (
  <div>
    <TextField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </div>
);

class RenderSliderField extends Component {

  state = {
    value: 1
  };

  render () {
    const { input, label, textColor, children, meta: { touched, error }, ...custom } = this.props;
    return (
      <div>
        <label style={{color: textColor}}> {label} {this.state.value}</label>
          <Slider
            onChange={(value) => this.setState({ value: value }) }
            value={this.state.value}
            defaultValue={this.state.value}
            input={input}
            {...custom}
          />
      </div>
    )
  }
};

export { RenderSelectField, RenderTextField, RenderSliderField };
