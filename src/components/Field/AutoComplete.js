import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'redux-form-material-ui';

const RenderAutoComplete = ({
  label,
  inputStyle,
  ...custom }) => {
  let metaTouched = false;
  return (
    <AutoComplete
      onClick={() => metaTouched = true}
      floatingLabelText={label}
      inputStyle={{ ...inputStyle, ...{ boxShadow: 'none'} }}
      errorText={metaTouched && meta.error}
      textFieldStyle={{ maxWidth: '100%' }}
      {...custom}
    />
  );
};

RenderAutoComplete.propTypes = {
  label:    PropTypes.string,
  viewType: PropTypes.string,
  meta:     PropTypes.object
};

export default RenderAutoComplete;
