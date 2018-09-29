import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import { Field } from 'redux-form';
import { Chip, Select } from 'components/Field';

const addOption = (fields) => {
  fields.push('testing');
};

const MultiSelect = ({
  fields,
  label,
  name,
  disabled,
  labelStyle,
  inputStyle,
  options,
  ...custom }) => {
  return (
    <Column centerOnSmall small={12}>
      <Row>
        <Column centerOnSmall small={6}>
          <Row>
            <Column centerOnSmall small={disabled ? 12 : 8}>
              <Field
                label={label}
                onChange={(e) => (e)}
                component={Select}
                disabled={disabled}
                options={options}
                name='optionText'
              />
            </Column>
            <Column centerOnSmall small={disabled ? 0 : 4}>
              {!disabled &&
                <Button
                  variant='raised'
                  color='secondary'
                  onClick={() => addOption(fields)}
                  label='Add' />
              }
            </Column>
          </Row>
        </Column>
      </Row>
      <Row>
        <Column
          centerOnSmall
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
          small={10}>
          {fields.map((field, idx, fields) => {
            if (disabled) {
              return (
                <Field
                  key={idx}
                  label={field.label}
                  onChange={() => { }}
                  component={Chip}
                  style={{ margin: '5px 2px', fontSize: '0.8em' }} />
              );
            } else {
              return (
                <Field
                  key={idx}
                  label={field.label}
                  onChange={() => { }}
                  component={Chip}
                  onDelete={() => fields.remove(idx)}
                  style={{ margin: '5px 2px', fontSize: '0.8em' }} />
              );
            }
          })}
        </Column>
      </Row>
    </Column>
  );
};

MultiSelect.propTypes = {
  fields:     PropTypes.any.isRequired,
  name:       PropTypes.string,
  disabled:   PropTypes.bool,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  label:      PropTypes.string,
  options:    PropTypes.any.isRequired
};

export default MultiSelect;
