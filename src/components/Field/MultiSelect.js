import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import { Field } from 'redux-form';
import { without } from 'lodash';

import { FIELD_VIEW } from 'constants/ui';
import Chip from 'components/Field/Chip';
import { Select } from 'components/Field/Select';

const styles = (theme) => ({
  controls: {
    display: 'flex',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  valueItems: {
    marginTop: '10px',
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

const renderChips = (name, idx, fieldsRef) => (
  <Field
    key={idx}
    label={fieldsRef.get(idx)}
    name={name}
    component={Chip}
    onDelete={() => fieldsRef.remove(idx)}
  />
);

class MultiSelect extends Component {
  state = {
    currentlySelected: ''
  };

  static defaultProps = {
    disabled: false,
    label:    '',
    options:  [],
    mode:     ''
  };

  static propTypes = {
    fields:   PropTypes.instanceOf(Object).isRequired,
    disabled: PropTypes.bool,
    label:    PropTypes.string,
    mode:     PropTypes.string,
    options:  PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    classes:  PropTypes.instanceOf(Object).isRequired
  };

  handleSelectChange = e => {
    this.setState({ currentlySelected: e.target.value });
  };

  render() {
    const { classes, label, disabled, options, fields, mode } = this.props;
    const { currentlySelected } = this.state;
    const existingValues = [].concat(fields.getAll());
    return (
      <Fragment>
        <Row>
          <Column className={classes.controls}>
            <Select
              label={label}
              disabled={mode === FIELD_VIEW || disabled}
              options={without(options, ...existingValues)}
              onChange={this.handleSelectChange}
              value={currentlySelected}
            />
            {!disabled && mode !== FIELD_VIEW && (
              <Button
                variant='contained'
                color='secondary'
                className={classes.addButton}
                onClick={() => fields.push(currentlySelected)}>
                Add
              </Button>
            )}
          </Column>
        </Row>
        <Row>
          <Column
            centerOnSmall
            className={classes.valueItems}
            small={10}>
            {fields.map(renderChips)}
          </Column>
        </Row>
      </Fragment>
    );
  }
}


export default withStyles(styles)(MultiSelect);
