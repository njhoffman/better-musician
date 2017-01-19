import React, { Component } from 'react';
import { RaisedButton, Paper, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { MdAdd as AddIcon } from 'react-icons/lib/md';
import muiThemeable from 'material-ui/styles/muiThemeable';

import ButtonLoader from 'components/ButtonLoader';
import FieldList from './FieldList';
import FieldOptions from './FieldOptions';
import {
  RenderSelectField,
  RenderTextField
} from 'components/Field';

import css from './FieldsView.scss';



export const FieldsView = (props) => {
  // const user = props.settings.get('attributes');
  let disabled =  false;
  // (
  //   this.props.auth.getIn(["user", "isSignedIn"]) ||
  //   this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
  // );
  const redirectProfile = () => browserHistory.push('/profile');
  const redirectSettings = () => browserHistory.push('/settings');
  const textColor = props.muiTheme.palette.textColor;

  const fieldOptions = {
    0: "Text Box",
    1: "AutoComplete Box",
    2: "Select Menu",
    3: "Multi-Select Menu",
    4: "Check Box",
    5: "Radio Buttons",
    6: "Date",
    7: "YouTube Link",
    8: "PDF Link"
  };


  const renderExtraFields = (formValues) => {
    switch(parseInt(formValues.type)) {
      case 2:
      case 3:
      case 5:
        return <FieldArray name='optionValues' component={FieldOptions} />
        break;
    }
  };


  return (
    <Column small={8} centerOnSmall={true}>
      <Paper zDepth={5}>
        <div className={css.fieldsContainer}>
          <Tabs value="fields">
            <Tab
              data-route="/profile"
              value="profile"
              onActive={redirectProfile}
              label="Profile">
            </Tab>
            <Tab
              data-route="/settings"
              value="settings"
              onActive={redirectSettings}
              label="Settings">
            </Tab>
            <Tab
              data-route="/fields"
              value="fields"
              label="Fields">
              <form className={css.fieldsForm}>
                <h3>Update Your Custom Fields</h3>
                <div className={css.fieldAdd}>
                  <div className={css.flexThree}>
                    <Field
                      label='Field Type'
                      name='type'
                      component={RenderSelectField}
                      dataSource={fieldOptions}
                    />
                  </div>
                  <div className={css.flexThree}>
                    <Field
                      label='Field Label'
                      name='label'
                      component={RenderTextField}
                    />
                  </div>
                  <div className={css.flexThree}>
                    <Field
                      label='Tab Name'
                      name='tabName'
                      component={RenderTextField}
                    />
                  </div>
                </div>
                <div className={css.extraFields}>
                  {props.formValues && renderExtraFields(props.formValues)}
                </div>
                <div className={css.buttons}>
                  <ButtonLoader
                    type="submit"
                    label="Add Field"
                    labelStyle={{ color: textColor, paddingRight: '5px' }}
                    style={{ width: '160px', marginRight: '15px' }}
                    onClick={props.updateFields}
                    primary={true}
                    icon={<AddIcon style={{ marginTop: '-10px', color: textColor }} />}
                    className='update-fields-submit'
                    disabled={disabled} >
                  </ButtonLoader>
                </div>
                <FieldList tabs={props.savedTabs} />
              </form>
            </Tab>
          </Tabs>
        </div>
      </Paper>
    </Column>
  );
};
const updateFieldsForm = reduxForm({ form: 'updateFieldsForm' })(muiThemeable()(FieldsView));
export default updateFieldsForm;
