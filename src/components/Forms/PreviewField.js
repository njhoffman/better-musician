import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { reduxForm, formValues } from 'redux-form';
import { connect } from 'react-redux';
import FormField, { FormRow } from 'components/Field';

const PreviewFieldForm = ({
  viewMode,
  changeView,
  ...props
}) => (
  <form style={{ width: '100%' }}>
    <FormRow>
      <FormField
        name='previewField'
        preview={true}
        mode={viewMode}
        centerOnSmall
        {...props}
      />
    </FormRow>
  </form>
);

PreviewFieldForm.defaultProps = {
};

PreviewFieldForm.propTypes = {
  typeId: PropTypes.number.isRequired,
  label:  PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.instanceOf(Array)
  ])
};

const stateProps = (state) => ({ });


export default compose(
  connect(stateProps),
  reduxForm({
    form: 'previewField',
    enableReinitialize: true,
  }),
)(PreviewFieldForm);
