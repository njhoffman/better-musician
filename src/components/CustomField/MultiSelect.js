import React, { PropTypes } from 'react';
import { RenderSelect, RenderMultiSelect } from '../Field';
import { Field, FieldArray } from 'redux-form';

const RenderCustomMultiSelect = ({
  field,
  preview,
  label,
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
      <FieldArray
        name={field.name}
        label={field.label}
        dataSource={field.optionValues}
        component={RenderMultiSelect}
        {...custom} />
    );
  }
};

RenderCustomMultiSelect.propTypes = {
  field:        PropTypes.object.isRequired,
  preview:      PropTypes.bool,
  style:        PropTypes.object,
  label:        PropTypes.string,
  optionValues: PropTypes.array
};

export default RenderCustomMultiSelect;
