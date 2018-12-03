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
import { updateField, addField, cancelEdit } from 'actions/api';

import PreviewModal from './PreviewModal';
import FieldList from './FieldList';
import FieldOptions from './FieldOptions';

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
  update,
  add,
  cancel,
  editingField,
  formValues,
  history,
  classes,
  ...props
}) => {
  // const user = props.settings.get('attributes');
  const disabled =  false;

  // TODO: integrate into CustomField model
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

  const renderExtraFields = () => {
    switch (parseInt(formValues.type, 10)) {
      case 2:
      case 3:
      case 5:
      default:
        return (<FieldArray name='options' component={FieldOptions} />);
    }
  };

  const renderEditButtons = () => (
    <Fragment>
      <Button
        type='submit'
        label='Update'
        labelStyle={{ paddingRight: '5px' }}
        style={{ width: '100px', marginRight: '15px' }}
        onClick={() => update()}
        primary
        icon={<SaveIcon />}
        size='small'
        className='update-fields-submit'
        disabled={disabled}
      />
      <MaterialButton
        size='small'
        style={{ width: '100px', marginRight: '15px' }}
        className='update-fields-submit'
        variant='text'
        onClick={() => cancel()}
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
      onClick={() => add()}
      primary
      size='small'
      icon={<AddIcon style={{ marginTop: '-10px' }} />}
      className='update-fields-submit'
      disabled={disabled}
    />
  );

  return (
    <Column className={classes.root} centerOnSmall small={12} medium={10} large={8}>
      <PreviewModal />
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
              label='Tab Name'
              name='tabName'
              type='text'
            />
            <FormField
              large={4}
              medium={6}
              small={6}
              label='Field Label'
              name='label'
              type='text'
            />
          </FormRow>
          {formValues && renderExtraFields()}
          <FormRow className={classes.buttonBar}>
            {editingField ? renderEditButtons() : renderAddButtons()}
          </FormRow>
          <Divider className={classes.buttonDivider} />
        </form>
        <FieldList {...{ editingField }} {...props} />
      </Paper>
    </Column>
  );
};

FieldsView.defaultProps = {
  editingField: null,
  formValues: null
};

FieldsView.propTypes = {
  editingField: PropTypes.shape({
    type:    PropTypes.string.isRequired,
    tabName: PropTypes.string.isRequired,
    id:      PropTypes.string.isRequired,
    label:   PropTypes.string
  }),
  formValues: PropTypes.instanceOf(Object),
  update:     PropTypes.func.isRequired,
  add:        PropTypes.func.isRequired
};

const mapActionCreators = {
  update: updateField,
  add:    addField,
  cancel: cancelEdit
};

const mapStateToProps = (state) => ({
  editingField:  state.FieldsView ? state.FieldsView.editingField : null,
  initialValues: state.FieldsView ? state.FieldsView.editingField : null,
  formValues:    state.form.fields ? state.form.fields.values : null
});

const fieldsForm = reduxForm({
  form: 'fields',
  enableReinitialize: true
})(withStyles(styles)(FieldsView));


export default withRouter(connect(mapStateToProps, mapActionCreators)(fieldsForm));
