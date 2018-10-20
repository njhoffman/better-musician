import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment } from '@material-ui/core';
import Textbox from './Textbox';

const NumberField = ({
  meta,
  fullWidth,
  style,
  unit,
  ...props
}) => (
  <Textbox
    type='number'
    min={0}
    style={{
      textAlign: 'center',
      width: unit ? '85px' : '120px',
      ...style
    }}
    fullWidth={fullWidth || false}
    error={meta && meta.touched && meta.error}
    InputProps={{
      endAdornment: unit ? (
        <InputAdornment variant='filled' position='end'>
          {unit}
        </InputAdornment>
      ) : null
    }}
    {...props}
  />
);

NumberField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  viewType: PropTypes.string
};

export default NumberField;
