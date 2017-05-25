import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'redux-form-material-ui';

const RenderAutoComplete = ({
  label,
  inputStyle,
  meta,
  ...custom }) => {
  return (
    <AutoComplete
      floatingLabelText={label}
      inputStyle={{ ...inputStyle, ...{ boxShadow: 'none' } }}
      errorText={meta && meta.touched && meta.error}
      textFieldStyle={{ maxWidth: '100%' }}
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
