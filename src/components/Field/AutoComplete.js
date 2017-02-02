import React, { Component, PropTypes } from 'react';
import { AutoComplete } from 'redux-form-material-ui'

const RenderAutoComplete = ({
  label,
  viewType,
  meta,
  ...custom }) => {
    return (
      <AutoComplete
        floatingLabelText={label}
        openOnFocus={true}
        inputStyle={{ boxShadow: 'none', maxWidth: '100%', marginTop: "8px" }}
        textFieldStyle={{ boxShadow: 'none', maxWidth: '100%', height: '60px' }}
        style={{ maxWidth: '100%', height: "60px" }}
        errorText={meta && meta.touched && meta.error}
        {...custom}
      />
    );
  };

export default RenderAutoComplete;