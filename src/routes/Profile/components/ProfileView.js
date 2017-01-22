import React from 'react';
import { Avatar, Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { Row, Column } from 'react-foundation';
import  ButtonLoader from 'components/ButtonLoader';
import { Field, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import {
  MdAccountCircle as AvatarIcon,
  MdSave as SaveIcon
} from 'react-icons/lib/md';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
  RenderSelectField,
  RenderTextField,
  RenderSliderField
} from 'components/Field';
import css from './ProfileView.scss';

const renderImage = (props) => {
  return (
    <div className={css.avatarFrame}>
      <Avatar
        icon={<AvatarIcon />}
        className={css.avatar}
        backgroundColor={props.muiTheme.palette.primary1Color}
        size={100} />
      <div>No Picture</div>
      <RaisedButton label="Add Picture" />
    </div>
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

  const textColor = props.muiTheme.palette.textColor;

  return (
    <Column small={8} centerOnSmall={true}>
      <Paper zDepth={5}>
        <div className={css.profileContainer}>
          <Tabs>
            <Tab
              data-route="/profile"
              label="Profile">
              <form
                className={css.profileForm}>
                <h3>Update Your Profile</h3>
                <div className={css.flexRow}>
                  { renderImage(props) }
                </div>
                <div className={css.flexRow}>
                  <Field
                    name="email"
                    disabled={true}
                    component={RenderTextField}
                    label="User Name" />
                </div>
                <div className={css.flexRow}>
                  <Field
                    name="firstName"
                    component={RenderTextField}
                    label="First Name" />
                </div>
                <div className={css.flexRow}>
                  <Field
                    name="lastName"
                    component={RenderTextField}
                    label="Last Name" />
                </div>
                <div className={css.flexRow}>
                  <Field
                    name="notificationsEmail"
                    component={RenderTextField}
                    label="Notifications Email" />
                </div>
                <div className={css.flexRow + ' ' + css.buttons}>
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
                </div>
              </form>
            </Tab>
            <Tab
              data-route="/settings"
              onActive={redirectSettings}
              label="Settings">
              <Link to='/settings' />
            </Tab>
            <Tab
              data-route="/fields"
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
const updateProfileForm = reduxForm({ form: 'updateProfileForm' })(muiThemeable()(ProfileView));
export default updateProfileForm;
