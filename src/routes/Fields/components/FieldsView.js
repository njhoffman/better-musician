import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RaisedButton, Paper, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import { FieldArray, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import muiThemeable from 'material-ui/styles/muiThemeable';

import ButtonLoader from 'components/ButtonLoader';
import FieldList from './FieldList';
import FormField from 'components/Field';
import FieldOptions from './FieldOptions';
import {
  MdSave as SaveIcon,
  MdAdd as AddIcon
} from 'react-icons/lib/md';

import {
  updateField,
  addField,
  editField,
  deleteField,
  cancelEdit
} from '../modules/fields';
import { savedTabs as savedTabsSelector } from '../modules/selectors';

import css from './FieldsView.scss';

export const FieldsView = (props) => {
  // const user = props.settings.get('attributes');
  let disabled =  false;
  const redirectProfile = () => browserHistory.push('/profile');
  const redirectStats = () => browserHistory.push('/stats');
  const redirectSettings = () => browserHistory.push('/settings');
  const textColor = props.muiTheme ? props.muiTheme.palette.textColor : 'black';

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

  const renderEditButtons = (props) => (
    <div>
      <ButtonLoader
        type='submit'
        label='Update'
        labelStyle={{ color: textColor, paddingRight: '5px' }}
        style={{ width: '100px', marginRight: '15px' }}
        onClick={props.updateField}
        primary
        icon={<SaveIcon style={{ marginTop: '-10px', color: textColor }} />}
        className='update-fields-submit'
        disabled={disabled} />
      <RaisedButton label='Cancel' secondary />
    </div>
  );

  const renderAddButtons = (props) => (
    <ButtonLoader
      type='submit'
      label='Add Field'
      labelStyle={{ color: textColor, paddingRight: '5px' }}
      style={{ width: '160px', marginRight: '15px' }}
      onClick={props.addField}
      primary
      icon={<AddIcon style={{ marginTop: '-10px', color: textColor }} />}
      className='update-fields-submit'
      disabled={disabled} />
  );

  const { editingField } = props;
  return (
    <Column centerOnSmall small={12} medium={10} large={8}>
      <Paper zDepth={5}>
        <div className={css.fieldsContainer}>
          <Tabs value='fields'>
            <Tab
              data-route='/profile'
              value='profile'
              onActive={redirectProfile}
              label='Profile' />
            <Tab
              data-route='/stats'
              value='stats'
              onActive={redirectStats}
              label='Stats' />
            <Tab
              data-route='/settings'
              value='settings'
              onActive={redirectSettings}
              label='Settings' />
            <Tab
              data-route='/fields'
              value='fields'
              label='Fields'>
              <form className={css.fieldsForm}>
                <h3>Build Your Custom Fields</h3>
                <Row className={css.fieldAdd}>
                  <FormField
                    small={4}
                    label='Field Type'
                    name='type'
                    type='select'
                    dataSource={fieldOptions}
                  />
                  <FormField
                    small={4}
                    label='Field Label'
                    name='label'
                    type='text'
                  />
                  <FormField
                    small={4}
                    label='Tab Name'
                    name='tabName'
                    type='text'
                  />
                </Row>
                <div className={css.extraFields}>
                  {props.formValues && renderExtraFields(props.formValues)}
                </div>
                <div className={css.buttons}>
                  {editingField && renderEditButtons(props)}
                  {!editingField && renderAddButtons(props)}
                </div>
                <FieldList {...props} />
              </form>
            </Tab>
          </Tabs>
        </div>
      </Paper>
    </Column>
  );
};

FieldsView.propTypes = {
  muiTheme:     PropTypes.object.isRequired,
  editingField: PropTypes.bool,
  formValues:   PropTypes.object,
  updateField:  PropTypes.func.isRequired,
  addField:     PropTypes.func.isRequired
};

const updateFieldsForm = reduxForm({ form: 'updateFieldsForm', enableReinitialize: true })(muiThemeable()(FieldsView));

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

export default connect(mapStateToProps, mapActionCreators)(updateFieldsForm);
