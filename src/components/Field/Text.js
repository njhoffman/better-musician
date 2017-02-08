import React, { PropTypes } from 'react';
import { TextField } from 'redux-form-material-ui';

const RenderText = ({
  label,
  viewType,
  meta,
  style,
  width,
  ...custom }) => {
  return (
    <TextField
      floatingLabelText={label}
      errorText={meta && meta.touched && meta.error}
      inputStyle={{ boxShadow: 'none', maxWidth: '100%' }}
      style={{ ...style, ...{ maxWidth: '100%' } }}
      {...custom}
    />
  );
};

RenderText.propTypes = {
  label:    PropTypes.string,
  viewType: PropTypes.string,
  meta:     PropTypes.object,
  style:    PropTypes.object,
  width:    PropTypes.number
};

export default RenderText;
