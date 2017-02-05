import React, { Component, PropTypes } from 'react';
import { Column } from 'react-foundation';
import { RenderSelect } from '../Field';
import { Field, FieldArray } from 'redux-form';

const RenderCustomSelect = ({
  field,
  preview,
  disabled,
  inputStyle,
  label,
  labelStyle,
  style,
  optionValues,
  ...custom }) => {
    if (preview) {
      return (
        <Field
          style={{ width: '200px' }}
          name={field.name}
          component={RenderSelect}
          label={field.label}
          dataSource={field.optionValues} />
      );
    } else {
      return (
        <Column centerOnSmall>
          <Field
            style={{ ...style, ...{ width: '200px', verticalAlign: 'middle' }}}
            name={field.name}
            disabled={disabled}
            underlineShow={!disabled}
            labelStyle={inputStyle}
            iconStyle={{ visibility: (disabled ? 'hidden': 'visible' ) }}
            floatingLabelStyle={{ ...labelStyle, ...(disabled ? { textAlign: 'center'} : {}) }}
            component={RenderSelect}
            label={field.label}
            dataSource={field.optionValues} />
        </Column>
      );
    }
  };

export default RenderCustomSelect;
