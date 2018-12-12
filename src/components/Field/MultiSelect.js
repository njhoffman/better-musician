import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, FormHelperText, FormControl, withStyles } from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import { Field } from 'redux-form';
import { without } from 'lodash';

import { FIELD_VIEW, FIELD_VIEW_ALT, FIELD_EDIT } from 'constants/ui';
import Chip from 'components/Field/Chip';
import Select from 'components/Field/Select';

const styles = (theme) => ({
  outlined: {
    border: 'solid 1px rgba(255, 255, 255, 0.23)',
    borderRadius: '5px',
    padding: '10px'
  },
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

const renderViewChips = (name, idx, fieldsRef) => (
  <Field
    key={idx}
    label={fieldsRef.get(idx)}
    name={name}
    component={Chip}
  />
);

const createMultiSelect = (SelectComponent) => (
  class MultiSelect extends Component {
    state = {
      currentlySelected: ''
    };

    static defaultProps = {
      disabled: false,
      label:    '',
      options:  [],
      mode:     FIELD_EDIT
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
        <FormControl component='fieldset' className={classes.outlined}>
          <Row>
            <Column className={classes.controls}>
              {mode === FIELD_VIEW && (
                <FormHelperText>
                  {label}
                </FormHelperText>
              )}
              {mode === FIELD_VIEW_ALT && (
                <FormHelperText>
                  {label}
                </FormHelperText>
              )}
              {mode !== FIELD_VIEW && mode !== FIELD_VIEW_ALT && (
                <Fragment>
                  <SelectComponent
                    label={label}
                    disabled={disabled}
                    options={without(options, ...existingValues)}
                    onChange={this.handleSelectChange}
                    value={currentlySelected}
                  />
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.addButton}
                    onClick={() => fields.push(currentlySelected)}>
                    Add!
                  </Button>
                </Fragment>
              )}
            </Column>
          </Row>
          <Row>
            <Column
              centerOnSmall
              className={classes.valueItems}
              small={12}>
              {fields.map(mode !== FIELD_EDIT ? renderViewChips : renderChips)}
            </Column>
          </Row>
        </FormControl>
      );
    }
  }
);

// select field doesn't have to be connect to form
const ConnectedMultiSelect = withStyles(styles)(createMultiSelect(Select));
const MultiSelect = withStyles(styles)(createMultiSelect(Select));
export { MultiSelect as default, ConnectedMultiSelect };
