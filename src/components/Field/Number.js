import React, { PropTypes } from 'react';
import { TextField } from 'redux-form-material-ui';

const RenderNumber = ({
  viewType,
  label,
  meta,
  ...custom }) => {
  return (
    <TextField
      type='number'
      floatingLabelText={label}
      style={{ width: '125px', textAlign: 'center' }}
      inputStyle={{ textAlign: 'center', boxShadow: 'none' }}
      min={0}
      errorText={meta && meta.touched && meta.error}
      {...custom}
    />
  );
};

RenderNumber.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  viewType: PropTypes.string
};

export default RenderNumber;
