import React, { Component, PropTypes } from 'react';
import { Column } from 'react-foundation';
import { TextField } from 'redux-form-material-ui'

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

export default RenderText;
