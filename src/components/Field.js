import React from 'react';
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
      onChange={(event, index, value) => input.onChange(value)}
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

let sliderValue = 0;
const RenderSliderField = ({
  ...input,
  label,
  children,
  meta: { touched, error },
  ...custom }) => {
  return (
    <div>
        <label>{label} {sliderValue}</label>
        <Slider
          onChange={(value) => sliderValue = value}
          {...input}
          {...custom}
        />
    </div>
  )
};

export { RenderSelectField, RenderTextField, RenderSliderField };
