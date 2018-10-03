import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import createComponent from './createFormField';
import mapError from './mapError';

import { FIELD_VARIANT_VIEW } from 'constants/ui';

const TextboxForm = createComponent(TextField, ({
    defaultValue,
    ...props
  }) => ({
    ...mapError(props)
  })
);

const Textbox = ({
  meta,
  initialValues,
  inputProps,
  style,
  variant,
  ...props
}) => {
  return (
  <TextboxForm
    InputProps={{
      disableUnderline: variant === FIELD_VARIANT_VIEW,
      autoComplete: 'off',
      ...inputProps
    }}
    error={meta && meta.touched && meta.error}
    {...props}
  />
  );
};

Textbox.propTypes = {
  label      : PropTypes.string,
  meta       : PropTypes.object,
  style      : PropTypes.object,
  width      : PropTypes.number
};

export default Textbox;
