import React from 'react';
import { FormControlLabel, Checkbox as MaterialCheckbox } from '@material-ui/core';
import createComponent from './createFormField';

export const CheckboxForm = createComponent(MaterialCheckbox, ({
  input: { onChange, value, ...inputProps },
  meta,
  onChange: ignoredOnChange,
  defaultChecked,
  ...props
}) => ({
  ...inputProps,
  ...props,
  checked: value ? true : false,
  onChange: (event, isInputChecked) => {
    onChange(isInputChecked);
  }
}));

const Checkbox = ({
  ...props
}) => (
  <FormControlLabel
    control={
      <CheckboxForm {...props} style={{ ...props.style, width: 'auto' }} />
    }
    style={{ margin: '0px' }}
    {...props}
  />
);

export default Checkbox;
