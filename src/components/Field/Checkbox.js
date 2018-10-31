import React from 'react';
import PropTypes from 'prop-types';
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
  checked: !!value,
  onChange: (event, isInputChecked) => {
    onChange(isInputChecked);
  }
}));

const Checkbox = ({
  style,
  ...props
}) => (
  <FormControlLabel
    control={
      <CheckboxForm {...props} style={{ ...style, width: 'auto' }} />
    }
    style={{ margin: '0px' }}
    {...props}
  />
);

Checkbox.defaultProps = {
  style: {}
};

Checkbox.propTypes = {
  style: PropTypes.instanceOf(Object)
};

export default Checkbox;
