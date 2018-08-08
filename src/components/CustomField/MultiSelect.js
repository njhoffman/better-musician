import React from 'react';
import PropTypes from 'prop-types';
// import { RenderSelect, RenderMultiSelect } from '../Field';
// import { Field, FieldArray } from 'redux-form';

const RenderCustomMultiSelect = ({
  field,
  preview,
  label,
  style,
  optionValues,
  ...custom }) => {
  if (preview) {
    return (<div>POOP</div>);
    // return (
    //   <Field
    //     style={{ width: '200px' }}
    //     name={field.name}
    //     component={RenderSelect}
    //     label={field.label} />
    // );
  } else {
    return (<div>POOP</div>);
    // return (
    //   <FieldArray
    //     name={field.name}
    //     label={field.label}
    //     component={RenderMultiSelect}
    //     {...custom} />
    // );
  }
};

RenderCustomMultiSelect.propTypes = {
  field:        PropTypes.object.isRequired,
  preview:      PropTypes.bool,
  style:        PropTypes.object,
  label:        PropTypes.string,
  optionValues: PropTypes.object
};

export default RenderCustomMultiSelect;
