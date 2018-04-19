import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';

const RenderText = ({
  label,
  meta,
  inputStyle,
  style,
  ...custom }) => {
  return (
    <TextField
      label={label}
      error={meta && meta.touched && meta.error}
      style={{ ...style, ...{ maxWidth: '100%' } }}
      {...custom}
    />
  );
};

RenderText.propTypes = {
  inputStyle : PropTypes.object,
  label      : PropTypes.string,
  meta       : PropTypes.object,
  style      : PropTypes.object,
  width      : PropTypes.number
};

export default RenderText;
