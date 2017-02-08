import React, { PropTypes } from 'react';
import { Column } from 'react-foundation';
import { RenderAutoComplete } from '../Field';
import { Field } from 'redux-form';

const RenderCustomAutoComplete = ({
  field,
  preview,
  disabled,
  inputStyle,
  labelStyle,
  style,
  ...custom }) => {
  if (preview) {
    return (
      <Field
        style={{ width: '200px' }}
        name={field.name}
        component={RenderAutoComplete}
        label={field.label} />
    );
  } else {
    return (
      <Column centerOnSmall>
        <Field
          style={{ ...style, ...{ width: '200px ', verticalAlign: 'middle' } }}
          name={field.name}
          disabled={disabled}
          underlineShow={!disabled}
          inputStyle={{ ...inputStyle, ...{ textAlign: 'center' } }}
          component={RenderAutoComplete}
          floatingLabelStyle={{ ...labelStyle, ...(disabled ? { left: '25px', textAlign: 'center' } : {}) }}
          label={field.label} />
      </Column>
    );
  }
};

RenderCustomAutoComplete.propTypes = {
  field:      PropTypes.object.isRequired,
  preview:    PropTypes.bool,
  disabled:   PropTypes.bool,
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  style:      PropTypes.object
};

export default RenderCustomAutoComplete;
