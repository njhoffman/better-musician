import React from 'react';
import { Paper, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import  ButtonLoader from 'components/ButtonLoader';
import { Field, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { MdSave as SaveIcon } from 'react-icons/lib/md';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
  RenderSelectField,
  RenderTextField,
  RenderSliderField
} from 'components/Field';
import css from './ProfileView.scss';

export const ProfileView = (props) => {
  const user = props.user.get('attributes');
  let disabled =  false;
  // (
  //   this.props.auth.getIn(["user", "isSignedIn"]) ||
  //   this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
  // );
  const redirectSettings = () => browserHistory.push('/settings');

  const textColor = props.muiTheme.palette.textColor;

  return (
    <Column small={7} centerOnSmall={true}>
      <Paper zDepth={5}>
        <div className={css.profileContainer}>
          <Tabs>
            <Tab
              data-route="/profile"
              label="Profile">
              <form
                className={css.profileForm}>
                <h3>Update Your Profile</h3>
                <Field
                  name="firstName"
                  component={RenderTextField}
                  label="First Name" />
                <Field
                  name="lastName"
                  component={RenderTextField}
                  label="Last Name" />
                <div className={css.buttons}>
                  <ButtonLoader
                    type="submit"
                    label="Save"
                    labelStyle={{ color: textColor, paddingRight: '5px' }}
                    onClick={props.updateProfile}
                    icon={<SaveIcon style={{ marginTop: '-10px', color: textColor }} />}
                    className='update-profile-submit'
                    disabled={disabled}
                    primary={true}>
                  </ButtonLoader>
                </div>
              </form>
            </Tab>
            <Tab
              data-route="/settings"
              onActive={redirectSettings}
              label="Settings">
              <Link to='/settings' />
            </Tab>
          </Tabs>
        </div>
      </Paper>
    </Column>
  );
};
const updateProfileForm = reduxForm({ form: 'updateProfileForm' })(muiThemeable()(ProfileView));
export default updateProfileForm;
