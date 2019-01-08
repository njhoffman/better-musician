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

const cbFactory = (props, Component) => {
  const { mode, label, classes, input } = props;

  return (
    <FormControlLabel
      className={`${classes.root} ${mode === FIELD_VIEW_ALT ? classes.outlined : ''}`}
      label={label}
      control={(
        <Component
          disabled={mode !== FIELD_EDIT}
          className={classes.checkbox}
          input={input}
        />
      )}
    />
  );
};

const createCheckbox = (Component) => withStyles(styles)((props) => cbFactory(props, Component));

const defaultProps = {
  mode: FIELD_EDIT
};

const propTypes = {
  mode    : PropTypes.string,
  label   : PropTypes.string.isRequired,
  classes : PropTypes.instanceOf(Object).isRequired,
  input   : PropTypes.instanceOf(Object).isRequired
};

cbFactory.defaultProps = defaultProps;
cbFactory.propTypes = propTypes;

const Checkbox = createCheckbox(MaterialCheckbox);

const ConnectedCheckbox = createCheckbox(CheckboxFormField);

export { Checkbox as default, ConnectedCheckbox };
