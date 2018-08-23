import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import createComponent from './createFormField';
import mapError from './mapError';

const TextboxForm = createComponent(
 TextField, ({
    defaultValue,
    ...props
  }) => ({
    ...mapError(props)
  })
);

const Textbox = ({
  meta,
  inputStyle,
  style,
  ...props
}) => (
  <TextboxForm
    error={meta && meta.touched && meta.error}
    style={{ ...style, width: '100%' }}
    {...props}
  />
);

Textbox.propTypes = {
  inputStyle : PropTypes.object,
  label      : PropTypes.string,
  meta       : PropTypes.object,
  style      : PropTypes.object,
  width      : PropTypes.number
};

export default Textbox;
