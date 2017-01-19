import { connect } from 'react-redux';
import FieldsView from './FieldsView';
import { updateFields } from '../modules/fields';
import {
  savedFields as savedFieldsSelector,
  savedTabs as savedTabsSelector
} from '../modules/selectors';

const mapActionCreators = {
  updateFields
};

const mapStateToProps = (state) => ({
  settings:   state.user,
  savedTabs:  savedTabsSelector(state),
  formValues: state.form.updateFieldsForm ? state.form.updateFieldsForm.values : null,
});

export default connect(mapStateToProps, mapActionCreators)(FieldsView);
