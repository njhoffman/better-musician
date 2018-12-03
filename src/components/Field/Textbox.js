import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, TextField, FormHelperText, Typography, withStyles
} from '@material-ui/core';

import { FIELD_VIEW, FIELD_VIEW_ALT } from 'constants/ui';
import createComponent from './createFormField';
import mapError from './mapError';

const styles = (theme) => ({
  // field_view: {
  //   color: `${theme.palette.text.primary} !important`
  // },
  field_edit: { },
  viewLabel: {
    textAlign: 'center'
  },
  viewValue: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    marginBottom: theme.spacing.unit
  }
});

const TextboxForm = createComponent(
  TextField, ({
    input: { onChange, ...inputProps },
    onChange: onFieldChange,
    defaultValue,
    ...props
  }) => ({
    ...mapError(props),
    ...inputProps,
    onChange: (event) => {
      onChange(event.target.value);
      if (onFieldChange) {
        onFieldChange(event.target.value);
      }
    },
  })
);

const createTextbox = (Component) => ({
  disabled,
  InputProps,
  mode,
  fullWidth,
  disableUnderline,
  meta,
  classes,
  label,
  input,
  ...props
}) => {
  if (mode === FIELD_VIEW_ALT) {
    return (
      <TextField
        variant='outlined'
        InputProps={{
          readOnly: true
        }}
        label={label}
        value={input.value}
        fullWidth
      />
    );
  } else if (mode === FIELD_VIEW) {
    return (
      <FormControl>
        <FormHelperText className={classes.viewLabel}>
          {label}
        </FormHelperText>
        <Typography className={classes.viewValue}>
          {input.value}
        </Typography>
      </FormControl>
    );
  }
  return (
    <Component
      InputProps={{
        disableUnderline: mode === FIELD_VIEW || disableUnderline,
        disabled: mode === FIELD_VIEW || disabled,
        className: `${mode ? classes[mode.toLowerCase()] : ''}`,
        autoComplete: 'off',
        ...InputProps
      }}
      {...{ ...props, input, meta, label, fullWidth: fullWidth !== false }}
    />
  );
};

const propTypes = {
  label      : PropTypes.string,
  style      : PropTypes.instanceOf(Object),
  width      : PropTypes.number
};

const TextboxField = createTextbox(TextboxForm);
export const Textbox = createTextbox(TextField);

TextboxField.propTypes = propTypes;
Textbox.propTypes = propTypes;

export default withStyles(styles)(TextboxField);
