import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { FieldArray, reduxForm } from 'redux-form';
import {
  Button as MatButton, AppBar,
  Paper, Tabs, Tab, Typography, withStyles
} from '@material-ui/core';

import { withRouter } from 'react-router';
import Button from 'components/Button';
import FieldList from './FieldList';
import FormField, { FormRow } from 'components/Field';
import FieldOptions from './FieldOptions';
import {
  MdSave as SaveIcon,
  MdAdd as AddIcon
} from 'react-icons/md';

import {
  updateField,
  addField,
  editField,
  deleteField,
  cancelEdit
} from '../modules/reducer';

import { savedTabs as savedTabsSelector } from '../modules/selectors';

import css from './FieldsView.scss';

const styles = (theme) => ({
  root: {
    textAlign: 'center'
  }
});

export const FieldsView = (props) => {
  // const user = props.settings.get('attributes');
  let disabled =  false;

  const {
    updateField,
    addField,
    editingField,
    formValues
  } = props;

  const fieldOptions = {
    0: 'Text Box',
    1: 'AutoComplete Box',
    2: 'Select Menu',
    3: 'Multi-Select Menu',
    4: 'Check Box',
    5: 'Radio Buttons',
    6: 'Date',
    7: 'YouTube Link',
    8: 'PDF Link'
  };

  const renderExtraFields = (formValues) => {
    switch (parseInt(formValues.type)) {
      case 2:
      case 3:
      case 5:
        return <FieldArray name='optionValues' component={FieldOptions} />;
    }
  };

  const renderEditButtons = () => (
    <div>
      <Button
        type='submit'
        label='Update'
        labelStyle={{ paddingRight: '5px' }}
        style={{ width: '100px', marginRight: '15px' }}
        onClick={updateField}
        primary
        icon={<SaveIcon style={{ marginTop: '-10px' }} />}
        className='update-fields-submit'
        disabled={disabled} />
      <MatButton variant='raised' label='Cancel' color='secondary' />
    </div>
  );

  const renderAddButtons = () => (
    <Button
      type='submit'
      label='Add Field'
      labelStyle={{ paddingRight: '5px' }}
      style={{ width: '160px', marginRight: '15px' }}
      onClick={addField}
      primary
      icon={<AddIcon style={{ marginTop: '-10px' }} />}
      className='update-fields-submit'
      disabled={disabled} />
  );

  return (
    <Column centerOnSmall small={12} medium={10} large={8}>
      <Paper elevation={5}>
        <AppBar position='static'>
          <Tabs value='fields' centered={true} fullWidth={true}
            onChange={(e, val) => props.history.push(val)}>
            <Tab data-route='/profile' value='profile' label='Profile' />
            <Tab data-route='/settings' value='settings' label='Settings' />
            <Tab data-route='/fields' value='fields' label='Fields' />
          </Tabs>
        </AppBar>
        <form>
          <Typography>Build Your Custom Fields</Typography>
          <FormRow>
            <FormField
              large={4}
              medium={6}
              small={12}
              label='Field Type'
              name='type'
              type='select'
              options={fieldOptions}
            />
            <FormField
              large={4}
              medium={6}
              small={12}
              label='Field Label'
              name='label'
              type='text'
            />
            <FormField
              large={4}
              medium={12}
              small={12}
              label='Tab Name'
              name='tabName'
              type='text'
            />
          </FormRow>
          <div className={css.extraFields}>
            {formValues && renderExtraFields(formValues)}
          </div>
          <FormRow>
            {editingField && renderEditButtons()}
            {!editingField && renderAddButtons()}
          </FormRow>
          <FieldList {...props} />
        </form>
      </Paper>
    </Column>
  );
};

FieldsView.propTypes = {
  editingField: PropTypes.bool,
  formValues:   PropTypes.object,
  updateField:  PropTypes.func.isRequired,
  addField:     PropTypes.func.isRequired
};

const mapActionCreators = {
  addField,
  updateField,
  editField,
  deleteField,
  cancelEdit
};

const mapStateToProps = (state) => ({
  initialValues: state.FieldsView.editingField,
  editingField:  state.FieldsView.editingField,
  savedTabs:     savedTabsSelector(state),
  formValues:    state.form.updateFieldsForm ? state.form.updateFieldsForm.values : null
});

const updateFieldsForm = reduxForm({
  form: 'updateFieldsForm',
  enableReinitialize: true
})(withStyles(styles)(FieldsView));


export default withRouter(connect(mapStateToProps, mapActionCreators)(updateFieldsForm));
