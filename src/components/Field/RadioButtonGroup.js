import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Radio,
  RadioGroup as MaterialRadioGroup,
  FormLabel,
  FormControlLabel,
  FormControl,
  withStyles
} from '@material-ui/core';

import { FIELD_VIEW_ALT, FIELD_EDIT } from 'constants/ui';
import createComponent from './createFormField';

const styles = theme => ({
  outlined: {
    border: 'solid 1px rgba(255, 255, 255, 0.23)',
    borderRadius: '5px',
    padding: '10px'
  },
  root: {
    // display: 'flex',
  },
  formControl: {
    // margin: theme.spacing.unit * 3,
  },
  group: {
    // margin: `${theme.spacing.unit}px 0`,
  },
});

const RadioGroupForm = createComponent(
  MaterialRadioGroup, ({
    input: { onChange, value, ...inputProps },
    meta,
    onChange: onChangeFromField,
    ...props
  }) => ({
    ...inputProps,
    ...props,
    value,
    onChange: (event, eventValue) => {
      onChange(eventValue);
      if (onChangeFromField) {
        onChangeFromField(eventValue);
      }
    }
  })
);

const createRadioButtonGroup = (RadioComponent) => (
  class RadioButtonGroup extends Component {
    static propTypes = {
      options: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
      ]).isRequired, // can be object or array
      mode: PropTypes.string,
      style:  PropTypes.instanceOf(Object)
    }

    static defaultProps = {
      style: {},
      mode: FIELD_EDIT
    }

    state = {
      value: null
    };

    handleChange(value) {
      this.setState({ value });
    }

    renderRadioButton = (name, label, readOnly) => (
      <FormControlLabel
        key={name}
        value={name}
        control={<Radio disabled={readOnly} />}
        label={label || name}
      />
    )

    render() {
      const { label, options, classes, mode, ...props } = this.props;
      const { value } = this.state;
      const readOnly = mode !== FIELD_EDIT;
      return (
        <FormControl
          component='fieldset'
          className={mode === FIELD_VIEW_ALT ? classes.outlined : ''}>
          <FormLabel component='legend'>{label}</FormLabel>
          <RadioComponent
            onChange={(e) => this.handleChange(e)}
            value={value}
            {...props}>
            {_.map(_.keys(options), optKey => this.renderRadioButton(optKey, options[optKey], readOnly))}
          </RadioComponent>
        </FormControl>
      );
    }
  }
);

const ConnectedRadioButtonGroup = withStyles(styles)(createRadioButtonGroup(RadioGroupForm));
const RadioButtonGroup = withStyles(styles)(createRadioButtonGroup(MaterialRadioGroup));

export { RadioButtonGroup as default, ConnectedRadioButtonGroup };
