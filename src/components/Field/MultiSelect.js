import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles, Chip } from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import { Field } from 'redux-form';

// import Chip from 'components/Field/Chip';
import Select from 'components/Field/Select';

const addOption = (values) => {
  values.push('testing');
};

const styles = (theme) => ({
  controls: {
    display: 'flex',
    whiteSpace: 'nowrap'
  },
  values: {
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  addButton: {
    height: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

const MultiSelect = ({
  classes,
  label,
  name,
  disabled,
  labelStyle,
  inputStyle,
  options,
  input
}) => (
  <Fragment>
    <Row>
      <Column className={classes.controls}>
        <Field
          label={label}
          onChange={(e) => (e)}
          component={Select}
          disabled={disabled}
          options={options}
          name='optionText'
        />
        {!disabled
            && (
            <Button
              variant='contained'
              color='secondary'
              className={classes.addButton}
              onClick={() => addOption(input.value)}>
              Add
            </Button>
            )
        }
      </Column>
    </Row>
    {console.info('input', input)}
    <Row>
      <Column
        centerOnSmall
        className={classes.values}
        small={10}>
        {input.value && input.value.map((value, idx, values) => (disabled
          ? (
            <Chip
              key={idx}
              label={value}
              onChange={() => { }}
              style={{ margin: '5px 2px', fontSize: '0.8em' }}
            />
          )
          : (
            <Chip
              key={idx}
              label={value}
              onDelete={() => values.remove(idx)}
              style={{ margin: '5px 2px', fontSize: '0.8em' }}
            />
          )
        ))}
      </Column>
    </Row>
  </Fragment>
);

MultiSelect.propTypes = {
  input:      PropTypes.object.isRequired,
  values:     PropTypes.any,
  name:       PropTypes.string,
  disabled:   PropTypes.bool,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  label:      PropTypes.string,
  options:    PropTypes.any.isRequired,
  classes:    PropTypes.object.isRequired
};

export default withStyles(styles)(MultiSelect);
