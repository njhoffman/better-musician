import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { RenderText } from '../Field';
import { Field } from 'redux-form';

const RenderCustomText = ({
  field,
  preview,
  disabled,
  inputStyle,
  labelStyle,
  style,
  ...custom
}) => {
  if (preview) {
    return (
      <Field
        style={{ width: '200px' }}
        name={field.name}
        component={RenderText}
        label={field.label} />
    );
  } else {
    return (
      <Column centerOnSmall>
        <Field
          style={{ ...style, ...{ width: '200px ', verticalAlign: 'middle' } }}
          name={field.name}
          disabled={disabled}
          component={RenderText}
          name={field.label} />
      </Column>
    );
  }
};

RenderCustomText.propTypes = {
  field:      PropTypes.object.isRequired,
  preview:    PropTypes.bool,
  disabled:   PropTypes.bool,
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  style:      PropTypes.object
};

export default RenderCustomText;
