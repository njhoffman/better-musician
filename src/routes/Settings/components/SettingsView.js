import React from 'react';
import { Paper, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import  ButtonLoader from 'components/ButtonLoader';
import { Field, reduxForm } from 'redux-form';
import { RenderSelectField, RenderTextField, RenderSliderField } from 'components/Field';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import css from './SettingsView.scss';

export const SettingsView = (props) => {
  // const user = props.settings.get('attributes');
  let disabled =  false;
  // (
  //   this.props.auth.getIn(["user", "isSignedIn"]) ||
  //   this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
  // );
  const redirectProfile = () => browserHistory.push('/profile');

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
                <ButtonLoader
                  type="submit"
                  onClick={props.updateSettings}
                  className='update-settings-submit'
                  disabled={disabled}
                  primary={true}>
                </ButtonLoader>
              </form>
            </Tab>
          </Tabs>
        </div>
      </Paper>
    </Column>
  );
};
const updateSettingsForm = reduxForm({ form: 'updateSettingsForm' })(SettingsView);
export default updateSettingsForm;
