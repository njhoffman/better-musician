import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import FormField, { FormRow } from 'components/Field';

import { getFieldTypeOptions } from 'components/Field/FieldTypes';

import FieldOptions from './EditFieldOptions';

const EditField = ({
  typeId,
  multiple,
  options,
  ...props
}) => (
  <form style={{ width: '100%' }}>
    <FormRow>
      <FormField
        large={4}
        medium={6}
        small={6}
        label='Field Type'
        name='typeId'
        type='select'
        options={options}
      />
      <FormField
        large={4}
        medium={6}
        small={6}
        fullWidth={false}
        label='Field Label'
        name='label'
        type='text'
      />
    </FormRow>
    {multiple && (<FieldArray name='options' components={FieldOptions} />)}
  </form>
);

EditField.defaultProps = {
  options: null,
  typeId: null
};

EditField.propTypes = {
  typeId: PropTypes.number,
  options: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.instanceOf(Array)
  ])
};

const stateProps = (state) => ({
  options:       getFieldTypeOptions()
});

const editFieldForm = reduxForm({
  form: 'editField',
  enableReinitialize: true
})(EditField);

export default connect(stateProps)(editFieldForm);
