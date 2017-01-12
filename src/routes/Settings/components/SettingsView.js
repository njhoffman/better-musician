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
  const textColor = props.muiTheme.palette.textColor;

  return (
    <Column small={7} centerOnSmall={true}>
      <Paper zDepth={5}>
        <div className={css.settingsContainer}>
          <Tabs value="settings">
            <Tab
              data-route="/profile"
              value="profile"
              onActive={redirectProfile}
              label="Profile">
              <Link to='/profile' />
            </Tab>
            <Tab
              data-route="/settings"
              value="settings"
              label="Settings">
              <form
                className={css.settingsForm}>
                <h3>Update Your Settings</h3>
                <div className={css.top}>
                  <div className={css.flexLeft}>
                    <Field
                      name="maximumDifficulty"
                      component={RenderNumberField}
                      label="Max Difficulty" />
                  </div>
                  <div className={css.flexRight}>
                    <Field
                      name="maximumProgress"
                      component={RenderNumberField}
                      label="Max Progress" />
                  </div>
                </div>
                <div className={css.middle}>
                  <div className={css.flexLeft}>
                    <Field
                      name="songBrushupInterval"
                      component={RenderNumberField}
                      label="Brush Up Interval" />
                  </div>
                  <div className={css.flexRight}>
                    <Field
                      name="songBrushupDuration"
                      component={RenderNumberField}
                      label="Brush Up Duration" />
                  </div>
                </div>
                <div className={css.bottom}>
                  <div className={css.flexLeft}>
                    <Field
                      name="normalizePoints"
                      component={RenderCheckbox}
                      label="Noramlize Points" />
                  </div>
                  <div className={css.flexRight}>
                    <Field
                      name="songBrushupEmail"
                      component={RenderCheckbox}
                      label="Send Brush Up Email" />
                  </div>
                </div>
                <div className={css.buttons}>
                  <div className={css.flexLeft}>
                    <ButtonLoader
                      type="submit"
                      label="Reset Defaults"
                      labelStyle={{ color: textColor, paddingRight: '5px' }}
                      style={{ width: '160px', marginRight: '15px' }}
                      onClick={props.updateSettings}
                      icon={<SaveIcon style={{ marginTop: '-10px', color: textColor }} />}
                      className='update-profile-submit'
                      disabled={disabled} >
                    </ButtonLoader>
                  </div>
                  <div className={css.flexRight}>
                    <ButtonLoader
                      type="submit"
                      label="Save"
                      labelStyle={{ color: textColor, paddingRight: '5px' }}
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
          </Tabs>
        </div>
      </Paper>
    </Column>
  );
};
const updateSettingsForm = reduxForm({ form: 'updateSettingsForm' })(muiThemeable()(SettingsView));
export default updateSettingsForm;
