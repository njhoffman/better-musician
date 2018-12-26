import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, withStyles } from '@material-ui/core';
import MaterialSlider from '@material-ui/lab/Slider';

import { FIELD_VIEW, FIELD_VIEW_ALT, FIELD_EDIT } from 'constants/ui';
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
  outlined: {
    border: 'solid 1px rgba(255, 255, 255, 0.23)',
    borderRadius: '5px',
    padding: '10px !important'
  },
  root: {
    padding: '8px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    }
  },
  fullWidth: {
    width: '100%'
  },
  labelWrapper: {
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
  },
  slider: {
    padding: '12px 0px'
  }
});

const createSlider = (SliderComponent) => (
  class Slider extends Component {
    static propTypes = {
      classes:      PropTypes.instanceOf(Object).isRequired,
      input:        PropTypes.instanceOf(Object).isRequired,
      mode:         PropTypes.string,
      label:        PropTypes.string,
      valueDisplay: PropTypes.func,
      fullWidth:    PropTypes.bool,
      min:          PropTypes.number,
      max:          PropTypes.number,
      step:         PropTypes.number
    };

    static defaultProps = {
      min: 0,
      max: 10,
      step: 1,
      label: '',
      fullWidth: true,
      mode: FIELD_VIEW,
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
      const { classes, label, valueDisplay, fullWidth, mode, input }  = this.props;
      const { value: currValue } = this.state;
      input.value = currValue;
      return (
        <FormControl
          component='fieldset'
          fullWidth={fullWidth}
          className={`${classes.root} ${mode === FIELD_VIEW_ALT ? classes.outlined : ''}`}>
          <div className={classes.labelWrapper}>
            <FormLabel className={`${classes.label} ${classes.left}`}>
              {label}
            </FormLabel>
            <FormLabel className={`${classes.label} ${classes.right}`}>
              { valueDisplay(currValue) }
            </FormLabel>
          </div>
          <SliderComponent
            classes={{ container: classes.slider }}
            disabled={mode !== FIELD_EDIT}
            onChange={(e, value) => this.setState({ value })}
            value={currValue}
            {...{ input }}
          />
        </FormControl>
      );
    }
  }
);
const ConnectedSlider = withStyles(styles)(createSlider(SliderForm));
const Slider = withStyles(styles)(createSlider(MaterialSlider));
export { Slider as default, ConnectedSlider };
