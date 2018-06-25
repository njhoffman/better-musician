import React from 'react';
import PropTypes from 'prop-types';
// import { AutoComplete } from 'redux-form-material-ui';
import { TextField } from 'material-ui';

const RenderAutoComplete = ({
  label,
  inputStyle,
  meta,
  ...custom
}) => {
  return (
    <TextField
      label={label}
      errorText={meta && meta.touched && meta.error}
      {...custom}
    />
  );
};

RenderAutoComplete.propTypes = {
  inputStyle: PropTypes.object,
  label:    PropTypes.string,
  viewType: PropTypes.string,
  meta:     PropTypes.object
};

export default RenderAutoComplete;
