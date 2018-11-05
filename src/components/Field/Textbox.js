import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { FIELD_VIEW } from 'constants/ui';
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

const createTextbox = (Component) => ({
  initialValues,
  disabled,
  InputProps,
  mode,
  fullWidth,
  disableUnderline,
  meta,
  ...props
}) => (
  <Component
    InputProps={{
      disableUnderline: mode === FIELD_VIEW || disableUnderline,
      disabled: mode === FIELD_VIEW || disabled,
      autoComplete: 'off',
      ...InputProps
    }}
    {...{ ...props, meta, fullWidth: fullWidth !== false }}
  />
);

const propTypes = {
  label      : PropTypes.string,
  style      : PropTypes.instanceOf(Object),
  width      : PropTypes.number
};

const TextboxField = createTextbox(TextboxForm);
export const Textbox = createTextbox(TextField);

TextboxField.propTypes = propTypes;
Textbox.propTypes = propTypes;

export default TextboxField;
