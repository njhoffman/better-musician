import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Column } from 'react-foundation';
import { FormControl, FormLabel, withStyles } from '@material-ui/core';
import { FIELD_VIEW_ALT } from 'constants/ui';
import NumberField from './Number';
import { ConnectedSelect } from './Select';

const styles = (theme) => ({
  outlined: {
    border: 'solid 1px rgba(255, 255, 255, 0.23)',
    borderRadius: '5px',
    padding: '10px'
  },
  fieldLabel: {
    padding: '0px 5px',
    position: 'absolute',
    top: '-5px',
    left: '20px',
    backgroundColor: theme.palette.background.default
  },
  inputRow: {
    // marginBottom: '5px'
    alignItems: 'normal'
  },
  inputWrapper: {
    textAlign: 'left'
  },
  input: {
    width: '8em'
  },
  prefixWrapper: {
  },
  prefix: {
  },
});

/* eslint-disable react/prefer-stateless-function */
class Metronome extends Component {
  static defaultProps = {
    mode: FIELD_VIEW_ALT,
    label: ''
  };

  static propTypes = {
    mode : PropTypes.string,
    label: PropTypes.string,
    fields: PropTypes.instanceOf(Object).isRequired,
    classes: PropTypes.instanceOf(Object).isRequired
  }

  render() {
    const { mode, classes, label, fields } = this.props;
    return (
      <FormControl
        fullWidth
        className={mode === FIELD_VIEW_ALT ? classes.outlined : ''}>
        <FormLabel className={classes.fieldLabel}>
          {label}
        </FormLabel>
        <Row className={classes.inputRow}>
          <Column small={6} className={classes.prefixWrapper}>
            <Field
              component={NumberField}
              name={`${fields.name}.bpm`}
              label='Beats Per Minute'
            />
          </Column>
          <Column small={5} className={classes.inputWrapper}>
            <Field
              component={ConnectedSelect}
              name={`${fields.name}.signature`}
              label='Time Signature'
              options={{
                1: '1/4',
                2: '2/4',
                3: '3/4',
                4: '4/4',
                5: '3/2'
              }}
            />
          </Column>
        </Row>
      </FormControl>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

const MetronomeField = withStyles(styles)(Metronome);
export { Metronome as default, MetronomeField as ConnectedMetronome };
