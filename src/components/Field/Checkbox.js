import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Checkbox as MaterialCheckbox,
  withStyles
} from '@material-ui/core';
import { FIELD_VIEW_ALT, FIELD_EDIT } from 'constants/ui';
import createComponent from './createFormField';

export const CheckboxFormField = createComponent(
  MaterialCheckbox, ({
    input: { onChange, value, ...inputProps },
    meta,
    onChange: ignoredOnChange,
    defaultChecked,
    ...props
  }) => ({
    ...inputProps,
    ...props,
    checked: !!value,
    onChange: (event, isInputChecked) => {
      onChange(isInputChecked);
    }
  })
);

const styles = (theme) => ({
  root: {
    width: 'auto'
  },
  outlined: {
    border: 'solid 1px rgba(255, 255, 255, 0.23)',
    borderRadius: '5px',
    padding: '10px'
  },
  checkbox: {
    margin: '0px'
  }
});

const createCheckbox = (Component) => ({
  mode,
  label,
  classes,
  ...props
}) => (
  <FormControlLabel
    className={`${classes.root} ${mode === FIELD_VIEW_ALT ? classes.outlined : ''}`}
    label={label}
    control={(
      <Component
        disabled={mode !== FIELD_EDIT}
        className={classes.checkbox}
        {...props}
      />
    )}
  />
);

const defaultProps = {
  style: {}
};

const propTypes = {
  style: PropTypes.instanceOf(Object)
};

const Checkbox = withStyles(styles)(createCheckbox(MaterialCheckbox));
Checkbox.defaultProps = defaultProps;
Checkbox.propTypes = propTypes;

const ConnectedCheckbox = withStyles(styles)(createCheckbox(CheckboxFormField));
ConnectedCheckbox.defaultProps = defaultProps;
ConnectedCheckbox.propTypes = propTypes;

export { Checkbox as default, ConnectedCheckbox };
