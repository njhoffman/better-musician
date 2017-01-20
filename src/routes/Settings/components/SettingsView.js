import React from 'react';
import { Paper, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import { Field, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { MdSave as SaveIcon } from 'react-icons/lib/md';
import muiThemeable from 'material-ui/styles/muiThemeable';

import  ButtonLoader from 'components/ButtonLoader';
import {
  RenderSelectField,
  RenderTextField,
  RenderNumberField,
  RenderCheckbox,
  RenderSliderField
} from 'components/Field';
import css from './SettingsView.scss';

export const SettingsView = (props) => {
  // const user = props.settings.get('attributes');
  let disabled =  false;
  // (
  //   this.props.auth.getIn(["user", "isSignedIn"]) ||
  //   this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
  // );
  const redirectProfile = () => browserHistory.push('/profile');
  const redirectFields = () => browserHistory.push('/fields');
  const textColor = props.muiTheme.palette.textColor;

  return (
    <Column small={8} centerOnSmall={true}>
      <Paper zDepth={5}>
        <div className={css.settingsContainer}>
          <Tabs value="settings">
            <Tab
              data-route="/profile"
              value="profile"
              onActive={redirectProfile}
              label="Profile">
            </Tab>
            <Tab
              data-route="/settings"
              value="settings"
              label="Settings">
              <form
                className={css.settingsForm}>
                <h3>Update Your Settings</h3>
                <div className={css.flexRow}>
                  <div className={css.flexTwo}>
                    <Field
                      name="theme"
                      dataSource={['Light', 'Dark']}
                      component={RenderSelectField}
                      label="Visual Theme" />
                  </div>
                  <div className={css.flexTwo}>
                    <Field
                      name="normalizePoints"
                      component={RenderCheckbox}
                      label="Normalize Points" />
                  </div>
                </div>
                <div className={css.flexRow}>
                  <div className={css.flexTwo}>
                    <Field
                      name="maximumDifficulty"
                      component={RenderNumberField}
                      label="Max Difficulty" />
                  </div>
                  <div className={css.flexTwo}>
                    <Field
                      name="maximumProgress"
                      component={RenderNumberField}
                      label="Max Progress" />
                  </div>
                </div>
                <div className={css.flexRow}>
                  <div className={css.flexTwo}>
                    <Field
                      name="songBrushupInterval"
                      component={RenderNumberField}
                      label="Brush Up Interval" />
                  </div>
                  <div className={css.flexTwo}>
                    <Field
                      name="songBrushupDuration"
                      component={RenderNumberField}
                      label="Brush Up Duration" />
                  </div>
                </div>
                <div className={css.flexRow}>
                  <div className={css.flexTwo}>
                    <Field
                      name="songGoalEmail"
                      component={RenderCheckbox}
                      label="Receive Future Goal Email Notifications" />
                  </div>
                  <div className={css.flexTwo}>
                    <Field
                      name="songBrushupEmail"
                      component={RenderCheckbox}
                      label="Receive Brush Up Email Notifications" />
                  </div>
                </div>
                <div className={css.flexRow}>
                  <div className={css.flexOne}>
                    <ButtonLoader
                      type="submit"
                      label="Reset"
                      labelStyle={{ color: textColor, paddingRight: '5px' }}
                      style={{ width: '160px', marginRight: '15px' }}
                      onClick={props.updateSettings}
                      icon={<SaveIcon style={{ marginTop: '-10px', color: textColor }} />}
                      className='update-profile-submit'
                      disabled={disabled} >
                    </ButtonLoader>
                    <ButtonLoader
                      type="submit"
                      label="Save"
                      labelStyle={{ color: textColor, paddingRight: '5px' }}
                      style={{ width: '160px', marginRight: '15px' }}
                      onClick={props.updateSettings}
                      icon={<SaveIcon style={{ marginTop: '-10px', color: textColor }} />}
                      className='update-profile-submit'
                      disabled={disabled}
                      primary={true}>
                    </ButtonLoader>
                  </div>
                </div>
              </form>
            </Tab>
            <Tab
              data-route="/fields"
              value="fields"
              onActive={redirectFields}
              label="Fields">
              <Link to='/fields' />
            </Tab>
          </Tabs>
        </div>
      </Paper>
    </Column>
  );
};
const updateSettingsForm = reduxForm({ form: 'updateSettingsForm' })(muiThemeable()(SettingsView));
export default updateSettingsForm;
