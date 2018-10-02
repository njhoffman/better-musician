import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { RenderSelect } from '../Field';
import { Field } from 'redux-form';

const RenderCustomSelect = ({
  field,
  preview,
  disabled,
  inputStyle,
  label,
  labelStyle,
  style,
  ...custom
}) => {
  if (preview) {
    return (
      <Field
        style={{ width: '200px' }}
        name={field.name}
        component={RenderSelect}
        label={field.label} />
    );
  } else {
    return (
      <Column centerOnSmall>
        <Field
          style={{ ...style, ...{ width: '200px', verticalAlign: 'middle' } }}
          name={field.name}
          disabled={disabled}
          component={RenderSelect}
          label={field.label} />
      </Column>
    );
  }
};

RenderCustomSelect.propTypes = {
  field:        PropTypes.object.isRequired,
  preview:      PropTypes.bool,
  disabled:     PropTypes.bool,
  inputStyle:   PropTypes.object,
  labelStyle:   PropTypes.object,
  style:        PropTypes.object,
  label:        PropTypes.string
};

// export default RenderCustomSelect;
export default RenderSelect;
