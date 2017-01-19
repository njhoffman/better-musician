import { connect } from 'react-redux';
import FieldsView from './FieldsView';

import {
  updateField,
  addField,
  editField,
  deleteField,
  cancelEdit
} from '../modules/fields';

import {
  savedFields as savedFieldsSelector,
  savedTabs as savedTabsSelector
} from '../modules/selectors';

const mapActionCreators = {
  addField,
  updateField,
  editField,
  deleteField,
  cancelEdit
};

const mapStateToProps = (state) => ({
  initialValues: state.fieldsView.editingField,
  editingField:  state.fieldsView.editingField,
  savedTabs:     savedTabsSelector(state),
  formValues:    state.form.updateFieldsForm ? state.form.updateFieldsForm.values : null
});

export default connect(mapStateToProps, mapActionCreators)(FieldsView);
