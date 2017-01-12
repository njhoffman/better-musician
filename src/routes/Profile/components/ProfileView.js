import React from 'react';
import { Paper, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import  ButtonLoader from 'components/ButtonLoader';
import { Field, reduxForm } from 'redux-form';
import { RenderSelectField, RenderTextField, RenderSliderField } from 'components/Field';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import css from './ProfileView.scss';

export const ProfileView = (props) => {
  const user = props.user.get('attributes');
  let disabled =  false;
  // (
  //   this.props.auth.getIn(["user", "isSignedIn"]) ||
  //   this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
  // );
  const redirectSettings = () => browserHistory.push('/settings');

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
                <Field
                  name="points"
                  component={RenderTextField}
                  label="Points" />
                <ButtonLoader
                  type="submit"
                  onClick={props.updateProfile}
                  className='update-profile-submit'
                  disabled={disabled}
                  primary={true}>
                </ButtonLoader>
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
const updateProfileForm = reduxForm({ form: 'updateProfileForm' })(ProfileView);
export default updateProfileForm;
