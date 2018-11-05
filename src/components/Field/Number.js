import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment } from '@material-ui/core';

import { FIELD_EDIT } from 'constants/ui';
import TextboxField from './Textbox';

const NumberField = ({
  meta,
  fullWidth,
  style,
  unit,
  ...props
}) => (
  <TextboxField
    type='number'
    min={0}
    style={{
      textAlign: 'center',
      width: '120px',
      ...style
    }}
    fullWidth={fullWidth || false}
    error={meta && meta.touched && meta.error}
    InputProps={{
      style: {
        textAlign: 'center'
      },
      endAdornment: unit ? (
        <InputAdornment variant='filled' position='end'>
          {unit}
        </InputAdornment>
      ) : null
    }}
    {...props}
  />
);

NumberField.defaultProps = {
  label: '',
  viewType: FIELD_EDIT
};

NumberField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.instanceOf(Object).isRequired,
  viewType: PropTypes.string
};

export default NumberField;
