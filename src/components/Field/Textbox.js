import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, TextField as MaterialTextField, FormHelperText, Typography, withStyles
} from '@material-ui/core';

import { FIELD_EDIT, FIELD_VIEW, FIELD_VIEW_ALT } from 'constants/ui';
import createComponent from './createFormField';
import mapError from './mapError';

const TextFieldForm = createComponent(
  MaterialTextField, ({
    input: { onChange, ...inputProps },
    onChange: onFieldChange,
    meta,
    defaultValue,
    helperTextShim,
    ...props
  }) => ({
    ...mapError({ ...props, meta }),
    ...inputProps,
    meta,
    helperText: meta.error || meta.warning || (helperTextShim ? ' ' : null),
    onChange: (event) => {
      onChange(event.target.value);
      if (onFieldChange) {
        onFieldChange(event.target.value);
      }
    },
  })
);

const styles = (theme) => ({
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

const createTextbox = (TextComponent) => ({
  classes,
  disabled,
  InputProps,
  preview,
  mode,
  fullWidth,
  disableUnderline,
  meta,
  label,
  input,
  ...props
}) => {
  if (mode === FIELD_VIEW_ALT) {
    return (
      <TextComponent
        variant='outlined'
        InputProps={{
          readOnly: true,
          ...InputProps
        }}
        {...{ ...props, input, meta, label, fullWidth }}
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
    <TextComponent
      InputProps={{
        disableUnderline,
        disabled,
        autoComplete: 'off',
        ...InputProps
      }}
      {...{ ...props, input, meta, label, fullWidth }}
    />
  );
};

const defaultProps = {
  helperTextShim: true,
  mode: FIELD_EDIT
};

const propTypes = {
  label          : PropTypes.string,
  style          : PropTypes.instanceOf(Object),
  input          : PropTypes.instanceOf(Object).isRequired,
  width          : PropTypes.number,
  helperTextShim : PropTypes.bool
};

const ConnectedTextbox = withStyles(styles)(createTextbox(TextFieldForm));
ConnectedTextbox.defaultProps = defaultProps;
ConnectedTextbox.propTypes = propTypes;

const Textbox = withStyles(styles)(createTextbox(MaterialTextField));
Textbox.propTypes = propTypes;
Textbox.defaultProps = defaultProps;

export { Textbox as default, ConnectedTextbox };
