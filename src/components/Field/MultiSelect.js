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
    whiteSpace: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  values: {
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  addButton: {
    height: 'auto',
    minHeight: 0,
    marginLeft: `${theme.spacing.unit}px`,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`
  }
});

const MultiSelect = ({
  classes,
  label,
  disabled,
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
        {!disabled && (
          <Button
            variant='contained'
            color='secondary'
            className={classes.addButton}
            onClick={() => addOption(input.value)}>
            Add
          </Button>
        )}
      </Column>
    </Row>
    <Row>
      <Column
        centerOnSmall
        className={classes.values}
        small={10}>
        {input.value && input.value.map((value, idx, values) => (disabled
          ? (
            <Chip
              key={value}
              label={value}
              onChange={() => { }}
              style={{ margin: '5px 2px', fontSize: '0.8em' }}
            />
          )
          : (
            <Chip
              key={value}
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

MultiSelect.defaultProps = {
  disabled: false,
  label:    '',
  options:  [],
};

MultiSelect.propTypes = {
  input:      PropTypes.instanceOf(Object).isRequired,
  disabled:   PropTypes.bool,
  label:      PropTypes.string,
  options:    PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  classes:    PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(MultiSelect);
