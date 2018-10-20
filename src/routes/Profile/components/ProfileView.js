import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { reduxForm } from 'redux-form';
import { updateUser } from 'actions/api';
import { withRouter } from 'react-router';

import {
  MdAccountCircle as AvatarIcon,
  MdSave as SaveIcon
} from 'react-icons/md';

import {
  Avatar, Paper, Tabs, Tab, Divider,
  AppBar, Typography, withStyles
} from '@material-ui/core';

import validate from 'utils/validate';
import Button from 'components/Button';
import { FIELD_VIEW } from 'constants/ui';
import FormField, { FormRow }  from 'components/Field';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    }
  },
  form: {
    margin: '15px',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 5px',
      padding: '2px',
    }
  },
  buttonDivider: {
    marginTop: '5px',
    marginBottom: '10px'
  },
  buttonBar: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
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
  },
  fields: {
    margin: '15px',
    padding: '15px'
  }
});

const ProfileImage = (classes) => (
  <Column centerOnSmall>
    <Avatar className={classes.avatar}>
      <AvatarIcon className={classes.avatarIcon} />
    </Avatar>
    <Typography>
      No Picture
    </Typography>
    <Button secondary variant='contained' label='Add a Picture' />
  </Column>
);

export const ProfileView = ({
  history,
  classes,
  updateProfile,
  formTouched,
  errors,
  api: { isFetching },
  ...props
}) => {
  const disabled = isFetching || !formTouched || Boolean(errors);
  return (
    <Column className={classes.root} small={12} medium={10} large={8}>
      <Paper elevation={5} className={classes.contentContainer}>
        <AppBar position='static'>
          <Tabs value='profile' centered fullWidth onChange={(e, value) => history.push(value)}>
            <Tab data-route='/profile' value='profile' label='Profile' />
            <Tab data-route='/settings' value='settings' label='Settings' />
            <Tab data-route='/fields' value='fields' label='Fields' />
          </Tabs>
        </AppBar>
        <form className={classes.form} autoComplete='off'>
          <Typography>
            Update Your Profile
          </Typography>
          <FormRow small={10} medium={8}>
            { ProfileImage(classes) }
          </FormRow>
          <FormRow small={10} medium={8}>
            <FormField name='email' type='text' disabled mode={FIELD_VIEW} />
          </FormRow>
          <div className={classes.fields}>
            <FormRow small={10} medium={8}>
              <FormField name='firstName' type='text' label='First Name' fullWidth />
            </FormRow>
            <FormRow small={10} medium={8}>
              <FormField name='lastName' type='text' label='Last Name' fullWidth />
            </FormRow>
            <FormRow small={10} medium={8}>
              <FormField name='notificationsEmail' type='text' label='Notifications Email' fullWidth />
            </FormRow>
          </div>
          <Divider className={classes.buttonDivider} />
          <FormRow small={10} medium={8}>
            <Column className={classes.buttonBar}>
              <Button
                type='submit'
                label='Save'
                loading={isFetching}
                onClick={updateProfile}
                icon={<SaveIcon style={{ marginTop: '-10px' }} />}
                className='update-profile-submit'
                primary
                disabled={disabled}
                fullWidth
              />
            </Column>
          </FormRow>
        </form>
      </Paper>
    </Column>
  );
};

const validateFields = {
  'notificationsEmail': [
    ['isEmail', 'Invalid Email']
  ]
};

ProfileView.propTypes = {
  history:       PropTypes.instanceOf(Object).isRequired,
  api:           PropTypes.instanceOf(Object).isRequired,
  updateProfile: PropTypes.func.isRequired,
  classes:       PropTypes.instanceOf(Object).isRequired
};

const mapActionCreators = {
  updateProfile : updateUser
};

const mapStateToProps = (state) => ({
  api:           state.api,
  initialValues: state.user.attributes,
  settings:      state.user.attributes,
  formTouched:   state.form.updateProfileForm && state.form.updateProfileForm.anyTouched,
  errors:        state.form.updateProfileForm && state.form.updateProfileForm.syncErrors
});

const profileForm = reduxForm({
  form: 'updateProfileForm',
  validate: validate(validateFields)
})(withStyles(styles)(ProfileView));

export default withRouter(connect(mapStateToProps, mapActionCreators)(profileForm));
