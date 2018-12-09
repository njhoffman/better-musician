import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Chip,
  FormRow
} from 'components/Field';
import { Field } from 'redux-form';
import { TextField, withStyles } from '@material-ui/core';
import { Column } from 'react-foundation';
import Button from 'components/Button';

const styles = (theme) => ({
  chips: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '10px 0px',
    maxHeight: '12vh',
    // minHeight: '75px',
    overflowY: 'scroll'
  },
  addOptionWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  addButton: {
    display: 'flex',
    alignSelf: 'center'
  },
});

class FieldOptions extends Component {
  static propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
    fields: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired
  }

  state = {
    optionText : ''
  };

  addOption() {
    const { optionText } = this.state;
    const { fields } = this.props;
    fields.push(optionText.trim());
    this.setState({
      optionText: ''
    });
  }

  render() {
    const { classes, fields: subFields } = this.props;
    const { optionText } = this.state;
    return (
      <Fragment>
        <FormRow>
          <Column className={classes.addOptionWrapper} small={12}>
            <TextField
              label='Option Text'
              onChange={(e) => this.setState({ optionText: e.target.value })}
              value={optionText}
              name='optionText'
            />
            <Button
              variant='contained'
              onClick={() => this.addOption()}
              className={classes.addButton}
              size='small'
              secondary
              label='Add'
            />
          </Column>
        </FormRow>
        <FormRow>
          <Column small={12} className={classes.chips}>
            {subFields.map((option, index, fieldsRef) => (
              /* eslint-disable react/no-array-index-key */
              <Field
                key={index}
                name={`${option}`}
                component={Chip}
                onDelete={() => fieldsRef.remove(index)}
              />
              /* eslint-enable react/no-array-index-key */
            ))}
          </Column>
        </FormRow>
      </Fragment>
    );
  }
}

export default withStyles(styles)(FieldOptions);
