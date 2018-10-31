import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormLabel, withStyles } from '@material-ui/core';
import MaterialSlider from '@material-ui/lab/Slider';

import { FIELD_VIEW } from 'constants/ui';
import createComponent from './createFormField';

const SliderForm = createComponent(
  MaterialSlider, ({
    input: { onDragStart, onChange, name, value },
    onChange: onChangeFromField,
    defaultValue,
    meta,
    ...props
  }) => ({
    ...props,
    name,
    value,
    onChange: (event, fieldVal) => {
      onChange(fieldVal);
      if (onChangeFromField) {
        onChangeFromField(fieldVal);
      }
    }
  })
);

const styles = (theme) => ({
  root: {
    padding: '8px 0px'
  },
  fullWidth: {
    width: '100%'
  },
  label: {
    display: 'inline-block',
    width: '50%',
  },
  left: {
    textAlign: 'left'
  },
  right: {
    textAlign: 'right'
  },
  view: {
    display: 'none'
  }
});

class Slider extends Component {
  static propTypes = {
    classes:      PropTypes.instanceOf(Object).isRequired,
    mode:         PropTypes.string.isRequired,
    input:        PropTypes.instanceOf(Object).isRequired,
    label:        PropTypes.string,
    valueDisplay: PropTypes.func,
    min:          PropTypes.number,
    max:          PropTypes.number,
    step:         PropTypes.number
  };

  static defaultProps = {
    min: 0,
    max: 10,
    step: 1,
    label: '',
    valueDisplay: (currValue) => currValue,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.input.value > props.min
        ? props.input.value
        : props.min
    };
  }

  render() {
    const { classes, label, valueDisplay, mode, fullWidth, input, ...props }  = this.props;
    const { value: currValue } = this.state;
    input.value = currValue;
    return (
      <div className={`${classes.root} ${fullWidth ? classes.fullWidth : ''}`}>
        <FormLabel>
          <div className={`${classes.label} ${classes.left}`}>
            {label}
          </div>
          <div className={`${classes.label} ${classes.right}`}>
            { valueDisplay(currValue) }
          </div>
        </FormLabel>
        <SliderForm
          disabled={mode === FIELD_VIEW}
          onChange={(value) => this.setState({ value })}
          value={currValue}
          {...{ ...props, input }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Slider);
