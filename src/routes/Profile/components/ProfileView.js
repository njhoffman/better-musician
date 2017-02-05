import React from 'react';
import { Avatar, Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { Row, Column } from 'react-foundation';
import  ButtonLoader from 'components/ButtonLoader';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FormField from 'components/Field';
import css from './ProfileView.scss';
import {
  MdAccountCircle as AvatarIcon,
  MdSave as SaveIcon
} from 'react-icons/lib/md';

const renderImage = (props) => {
  return (
    <Column>
      <Avatar
        icon={<AvatarIcon />}
        className={css.avatar}
        backgroundColor={props.muiTheme.palette.primary1Color}
        size={100} />
      <div>No Picture</div>
      <RaisedButton
        secondary={true}
        label="Add Picture"
      />
    </Column>
  );
}


export const ProfileView = (props) => {
  const user = props.user && props.user.get('attributes') ? props.user.get('attributes') : null;
  // (
  //   this.props.auth.getIn(["user", "isSignedIn"]) ||
  //   this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
  // );
  let disabled = props.api.isFetching;
  const redirectSettings = () => browserHistory.push('/settings');
  const redirectFields = () => browserHistory.push('/fields');
  const redirectStats = () => browserHistory.push('/stats');

  const textColor = props.muiTheme.palette.textColor;

  return (
    <Column small={12} medium={10} large={8} centerOnSmall={true}>
      <Paper zDepth={5}>
        <div className={css.profileContainer}>
          <Tabs>
            <Tab
              value="profile"
              data-route="/profile"
              label="Profile">
              <form
                className={css.profileForm}>
                <h3>Update Your Profile</h3>
                <Row>
                  { renderImage(props) }
                </Row>
                <Row>
                  <FormField
                    name="email"
                    disabled={true}
                    type='text'
                    label="User Name" />
                </Row>
                <Row>
                  <FormField
                    name="firstName"
                    type='text'
                    label="First Name" />
                </Row>
                <Row>
                  <FormField
                    name="lastName"
                    type='text'
                    label="Last Name" />
                </Row>
                <Row>
                  <FormField
                    name="notificationsEmail"
                    type='text'
                    label="Notifications Email" />
                </Row>
                <Row className={css.buttons}>
                  <Column>
                    <ButtonLoader
                      type="submit"
                      label="Save"
                      loading={props.api.isFetching}
                      labelStyle={{ color: textColor, paddingRight: '5px' }}
                      onClick={props.updateProfile}
                      icon={<SaveIcon style={{ marginTop: '-10px', color: textColor }} />}
                      className='update-profile-submit'
                      disabled={disabled}
                      primary={true}>
                    </ButtonLoader>
                  </Column>
                </Row>
              </form>
            </Tab>
            <Tab
              data-route="/stats"
              value="stats"
              onActive={redirectStats}
              label="Stats">
            </Tab>
            <Tab
              data-route="/settings"
              onActive={redirectSettings}
              value="settings"
              label="Settings">
            </Tab>
            <Tab
              data-route="/fields"
              value="fields"
              onActive={redirectFields}
              label="Fields">
            </Tab>
          </Tabs>
        </div>
      </Paper>
    </Column>
  );
};
const updateProfileForm = reduxForm({ form: 'updateProfileForm' })(muiThemeable()(ProfileView));
export default updateProfileForm;
