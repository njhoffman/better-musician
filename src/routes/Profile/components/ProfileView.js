import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { Row, Column } from 'react-foundation';
import Button from 'components/Button';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import withTheme from 'material-ui/styles/withTheme';
import { updateUser } from 'store/api';
import FormField from 'components/Field';
import css from './ProfileView.scss';
import {
  MdAccountCircle as AvatarIcon,
  MdSave as SaveIcon
} from 'react-icons/lib/md';

const renderImage = (props) => {
  const { muiTheme: { palette: { primary1Color } } } = props;
  return (
    <Column>
      <Avatar
        icon={<AvatarIcon />}
        className={css.avatar}
        backgroundColor={primary1Color}
        size={100} />
      <div>No Picture</div>
      <RaisedButton
        secondary
        label='Add Picture'
      />
    </Column>
  );
};
renderImage.propTypes = {
  muiTheme: PropTypes.object.isRequired
};

export const ProfileView = (props) => {
  // (
  //   this.props.auth.getIn(['user', 'isSignedIn']) ||
  //   this.props.auth.getIn(['emailSignIn', this.getEndpoint(), 'loading'])
  // );
  const redirectSettings = () => browserHistory.push('/settings');
  const redirectFields = () => browserHistory.push('/fields');
  const redirectStats = () => browserHistory.push('/stats');

  const {
    muiTheme: { palette: { textColor } },
    api: { isFetching }
  } = props;
  const disabled = isFetching;

  return (
    <Column centerOnSmall small={12} medium={10} large={8}>
      <Paper zDepth={5}>
        <div className={css.profileContainer}>
          <Tabs>
            <Tab
              value='profile'
              data-route='/profile'
              label='Profile'>
              <form
                className={css.profileForm}>
                <h3>Update Your Profile</h3>
                <Row>
                  { renderImage(props) }
                </Row>
                <Row>
                  <FormField
                    name='email'
                    disabled
                    type='text'
                    label='User Name' />
                </Row>
                <Row>
                  <FormField
                    name='firstName'
                    type='text'
                    label='First Name' />
                </Row>
                <Row>
                  <FormField
                    name='lastName'
                    type='text'
                    label='Last Name' />
                </Row>
                <Row>
                  <FormField
                    name='notificationsEmail'
                    type='text'
                    label='Notifications Email' />
                </Row>
                <Row className={css.buttons}>
                  <Column>
                    <Button
                      type='submit'
                      label='Save'
                      loading={isFetching}
                      labelStyle={{ color: textColor, paddingRight: '5px' }}
                      onClick={props.updateProfile}
                      icon={<SaveIcon style={{ marginTop: '-10px', color: textColor }} />}
                      className='update-profile-submit'
                      primary
                      disabled={disabled} />
                  </Column>
                </Row>
              </form>
            </Tab>
            <Tab
              data-route='/stats'
              value='stats'
              onActive={redirectStats}
              label='Stats' />
            <Tab
              data-route='/settings'
              onActive={redirectSettings}
              value='settings'
              label='Settings' />
            <Tab
              data-route='/fields'
              value='fields'
              onActive={redirectFields}
              label='Fields' />
          </Tabs>
        </div>
      </Paper>
    </Column>
  );
};

ProfileView.propTypes = {
  muiTheme:      PropTypes.object.isRequired,
  api:           PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const profileForm = reduxForm({ form: 'updateProfileForm' })(withTheme()(ProfileView));

const mapActionCreators = {
  updateProfile : updateUser
};

const mapStateToProps = (state) => {
  return ({
    api: state.api,
    user: state.auth ? state.auth.get('user') : null,
    initialValues: state.auth ? state.auth.get('user').get('attributes').toJS() : null
  });
};

export default connect(mapStateToProps, mapActionCreators)(profileForm);
