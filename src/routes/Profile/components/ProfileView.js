import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { reduxForm } from 'redux-form';
import { updateUser } from 'store/api';
import { withRouter } from 'react-router';

import {
  MdAccountCircle as AvatarIcon,
  MdSave as SaveIcon
} from 'react-icons/md';

import {
  Avatar, Paper, Tabs, Tab,
  AppBar, Typography, withStyles
} from '@material-ui/core';

import Button from 'components/Button';
import FormField, { FormRow }  from 'components/Field';

const styles = (theme) => ({
  root: {
    textAlign: 'center'
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100px',
    height: '100px'
  },
  avatarIcon: {
    width: '100px',
    height: '100px'
  }
});

const ProfileImage = ({ classes }) => (
  <Column centerOnSmall>
    <Avatar className={classes.avatar}>
      <AvatarIcon className={classes.avatarIcon} />
    </Avatar>
    <Typography>
      No Picture
    </Typography>
    <Button secondary variant='raised' label='Add a Picture' />
  </Column>
);

ProfileImage.propTypes = {
  classes: PropTypes.object.isRequired
};

export const ProfileView = (props) => {
  const {
    history,
    api: { isFetching }
  } = props;
  const disabled = isFetching;

  return (
    <Column className={props.classes.root} centerOnSmall small={12} medium={10} large={8}>
      <Paper elevation={5}>
        <AppBar position='static'>
          <Tabs centered={true} fullWidth={true} onChange={(e, value) => history.push(value)} value='profile'>
            <Tab data-route='/profile' value='profile' label='Profile' />
            <Tab data-route='/settings' value='settings' label='Settings' />
            <Tab data-route='/fields' value='fields' label='Fields' />
          </Tabs>
        </AppBar>
        <form autoComplete='off'>
          <Typography>
            Update Your Profile
          </Typography>
          <FormRow small={6}>
            { ProfileImage(props) }
          </FormRow>
          <FormRow small={6}>
            <FormField
              name='email'
              disabled
              type='text'
              label='User Name' />
          </FormRow>
          <FormRow small={6}>
            <FormField
              name='firstName'
              type='text'
              label='First Name' />
          </FormRow>
          <FormRow small={6}>
            <FormField
              name='lastName'
              type='text'
              label='Last Name' />
          </FormRow>
          <FormRow small={6}>
            <FormField
              name='notificationsEmail'
              type='text'
              label='Notifications Email' />
          </FormRow>
          <FormRow small={6}>
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
          </FormRow>
        </form>
      </Paper>
    </Column>
  );
};

ProfileView.propTypes = {
  history:       PropTypes.object.isRequired,
  api:           PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  classes:       PropTypes.object.isRequired
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

const profileForm = reduxForm({ form: 'updateProfileForm' })(withStyles(styles)(ProfileView));
export default withRouter(connect(mapStateToProps, mapActionCreators)(profileForm));
