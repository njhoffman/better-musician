import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { withRouter } from 'react-router';
import { FieldArray, reduxForm } from 'redux-form';
import {
  Button as MaterialButton, AppBar,
  Paper, Tabs, Tab, Divider, withStyles
} from '@material-ui/core';

import {
  MdSave as SaveIcon,
  MdAdd as AddIcon
} from 'react-icons/md';

import Button from 'components/Button';
import FormField, { FormRow } from 'components/Field';
import {
  updateField,
  addField,
  editField,
  deleteField,
  cancelEdit
} from 'actions/api';

import FieldList from './FieldList';
import FieldOptions from './FieldOptions';
import { savedTabs as savedTabsSelector } from '../modules/selectors';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    }
  },
  form: {
    margin: '15px',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 5px',
      padding: '2px',
    }
  },
  buttonDivider: {
    marginTop: '5px',
    marginBottom: '10px'
  },
  buttonBar: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  extraFields: {
    justifyContent: 'space-around'
  }
});

export const FieldsView = ({
  updateField,
  addField,
  editingField,
  formValues,
  history,
  classes,
  ...props
}) => {
  // const user = props.settings.get('attributes');
  let disabled =  false;

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
        return <FieldArray name='options' component={FieldOptions} />;
    }
  };

  const renderEditButtons = () => (
    <Fragment>
      <Button
        type='submit'
        label='Update'
        labelStyle={{ paddingRight: '5px' }}
        style={{ width: '100px', marginRight: '15px' }}
        onClick={updateField}
        primary
        icon={<SaveIcon style={{ marginTop: '-10px' }} />}
        size='small'
        className='update-fields-submit'
        disabled={disabled}
      />
      <MaterialButton
        size='small'
        style={{ width: '100px', marginRight: '15px' }}
        className='update-fields-submit'
        variant='text'
        color='secondary'>
        Cancel
      </MaterialButton>
    </Fragment>
  );

  const renderAddButtons = () => (
    <Button
      type='submit'
      label='Add Field'
      labelStyle={{ paddingRight: '5px' }}
      style={{ width: '160px', marginRight: '15px' }}
      onClick={addField}
      primary
      size='small'
      icon={<AddIcon style={{ marginTop: '-10px' }} />}
      className='update-fields-submit'
      disabled={disabled}
    />
  );

  return (
    <Column className={classes.root} centerOnSmall small={12} medium={10} large={8}>
      <Paper elevation={5} className={classes.contentContainer}>
        <AppBar position='static'>
          <Tabs value='fields' centered fullWidth onChange={(e, value) => history.push(value)}>
            <Tab data-route='/profile' value='profile' label='Profile' />
            <Tab data-route='/settings' value='settings' label='Settings' />
            <Tab data-route='/fields' value='fields' label='Fields' />
          </Tabs>
        </AppBar>
        <form className={classes.form}>
          <FormRow>
            <FormField
              large={4}
              medium={6}
              small={6}
              label='Field Type'
              name='type'
              type='select'
              options={fieldOptions}
            />
            <FormField
              large={4}
              medium={6}
              small={6}
              label='Field Label'
              name='label'
              type='text'
            />
            <FormField
              large={4}
              medium={6}
              small={6}
              label='Tab Name'
              name='tabName'
              type='text'
            />
          </FormRow>
          {formValues && renderExtraFields(formValues)}
          <FormRow className={classes.buttonBar}>
            {editingField && renderEditButtons()}
            {!editingField && renderAddButtons()}
          </FormRow>
          <Divider className={classes.buttonDivider} />
          <FieldList {...{ editingField }} {...props} />
        </form>
      </Paper>
    </Column>
  );
};

FieldsView.propTypes = {
  editingField: PropTypes.shape({
    type: PropTypes.string.isRequired,
    tabName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string
  }),
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
