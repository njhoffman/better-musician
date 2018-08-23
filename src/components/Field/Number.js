import React from 'react';
import PropTypes from 'prop-types';
import Textbox from './Textbox';

const NumberField = ({
  meta,
  ...props
}) => (
  <Textbox
    type='number'
    min={0}
    error={meta && meta.touched && meta.error}
    inputProps={{ style: { textAlign: 'center', width: '125px' } }}
    {...props}
  />
);

NumberField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  viewType: PropTypes.string
};

export default NumberField;
