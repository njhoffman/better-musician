import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { reduxForm } from 'redux-form';
import { updateUser } from 'store/api';
import { withRouter } from 'react-router';
import {
  MdAccountCircle as AvatarIcon,
  MdSave as SaveIcon
} from 'react-icons/md';
import {
  Avatar, Paper, Tabs, Tab,
  Button as MatButton, AppBar, Typography
} from '@material-ui/core';

import Button from 'components/Button';
import FormField from 'components/Field';
import css from './ProfileView.scss';

const renderImage = (props) => {
  return (
    <Column>
      <Avatar
        icon={<AvatarIcon />}
        className={css.avatar}
        size={100} />
      <div>No Picture</div>
      <MatButton color='secondary' variant='raised'>
        Add Picture
      </MatButton>
    </Column>
  );
};
renderImage.propTypes = {
  muiTheme: PropTypes.object.isRequired
};

export const ProfileView = (props) => {
  const {
    history,
    api: { isFetching }
  } = props;
  const disabled = isFetching;

  return (
    <Column centerOnSmall small={12} medium={10} large={8}>
      <Paper elevation={5}>
        <div className={css.profileContainer}>
          <AppBar position='static'>
            <Tabs
              centered={true}
              fullWidth={true}
              onChange={(e, value) => history.push(value)}
              value='profile'>
              <Tab
                data-route='/profile'
                value='profile'
                label='Profile' />
              <Tab
                value='stats'
                data-route='/stats'
                label='Stats' />
              <Tab
                data-route='/settings'
                value='settings'
                label='Settings' />
              <Tab
                data-route='/fields'
                value='fields'
                label='Fields' />
            </Tabs>
          </AppBar>
          <form className={css.profileForm}>
            <Typography>Update Your Profile</Typography>
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
                  onClick={props.updateProfile}
                  icon={<SaveIcon style={{ marginTop: '-10px' }} />}
                  className='update-profile-submit'
                  primary
                  disabled={disabled} />
              </Column>
            </Row>
          </form>
        </div>
      </Paper>
    </Column>
  );
};

ProfileView.propTypes = {
  history:       PropTypes.object.isRequired,
  api:           PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapActionCreators = {
  updateProfile : updateUser
};

const mapStateToProps = (state) => {
  return ({
    api:           state.api,
    initialValues: state.user.attributes,
    settings:      state.user.attributes
  });
};

const profileForm = reduxForm({ form: 'updateProfileForm' })(ProfileView);
export default withRouter(connect(mapStateToProps, mapActionCreators)(profileForm));
