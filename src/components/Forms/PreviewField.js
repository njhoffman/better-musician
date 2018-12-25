import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { FIELD_VIEW, FIELD_EDIT, FIELD_VIEW_ALT } from 'constants/ui';
import FormField, { FormRow } from 'components/Field';

const PreviewFieldForm = ({
  viewMode,
  typeId,
  options
}) => (
  <form style={{ width: '100%' }}>
    <FormRow>
      <FormField
        name='previewField'
        mode={viewMode}
        typeId={typeId}
        options={options}
        centerOnSmall
      />
    </FormRow>
  </form>
);

PreviewFieldForm.defaultProps = {
  options: null,
  viewMode: FIELD_EDIT
};

PreviewFieldForm.propTypes = {
  viewMode       : PropTypes.oneOf([FIELD_VIEW, FIELD_EDIT, FIELD_VIEW_ALT]),
  typeId: PropTypes.number.isRequired,
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
