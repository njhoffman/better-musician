import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Column } from 'react-foundation';
import { InputLabel, InputAdornment, FormControl, FormLabel, withStyles } from '@material-ui/core';
import { FIELD_VIEW, FIELD_VIEW_ALT } from 'constants/ui';
import NumberField from './Number';
import Select from './Select';

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
// .MuiOutlinedInput-root-404 .MuiOutlinedInput-notchedOutline-411 {
//     border-color: rgba(255, 255, 255, 0.23);
// }
// .MuiPrivateNotchedOutline-root-417 {
//     top: -5px;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     margin: 0;
//     padding: 0;
//     position: absolute;
//     transition: padding-left 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
//     border-style: solid;
//     border-width: 1px;
//     border-radius: 4px;
//     pointer-events: none;
//

 });

class Metronome extends Component {
  static defaultProps = {
    initialValues: null,
    style: {},
    id: null
  };

  static propTypes = {
    initialValues : PropTypes.instanceOf(Object),
    style         : PropTypes.instanceOf(Object),
    id            : PropTypes.string
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   videoId: this.parseUrl(get(props.initialValues, props.input.name))
    // };
  }

  parseUrl(val) {
    const videoId = youtubeRE.test(val) ? val.match(youtubeRE)[1] : val;
    if (this.state) {
      this.setState({ videoId });
    }
    return videoId;
  }


  render() {
    const { mode, id, meta, classes, input, label, fields } = this.props;
    return (
      <FormControl fullWidth={true} className={mode === FIELD_VIEW_ALT ? classes.outlined : ''}>
        <FormLabel className={classes.fieldLabel}>
          {label}
        </FormLabel>
        <Row className={classes.inputRow}>
          <Column small={6} className={classes.prefixWrapper}>
            <Field component={NumberField} name={`${fields.name}.bpm`} label='Beats Per Minute' />
          </Column>
          <Column small={5} className={classes.inputWrapper}>
            <Field
              component={Select}
              name={`${fields.name}.signature`} label='Time Signature'
              options={{
                1: '1/4',
                2: '2/4',
                3: '3/4',
                4: '4/4',
                5: '3/4',
                6: '3/2'
              }}
            />
          </Column>
        </Row>
        <Row>
          <Column centerOnSmall>
          </Column>
        </Row>
      </FormControl>
    );
  }
}

const MetronomeField = withStyles(styles)(Metronome);
export { Metronome as default, MetronomeField as ConnectedMetronome };
