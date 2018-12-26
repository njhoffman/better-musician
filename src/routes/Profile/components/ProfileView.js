import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';

import {
  MdAccountCircle as AvatarIcon,
  MdSave as SaveIcon
} from 'react-icons/md';

import {
  Avatar, Paper, Tabs, Tab, Divider,
  AppBar, Typography, withStyles
} from '@material-ui/core';

import { FIELD_VIEW } from 'constants/ui';
import { updateProfile } from 'actions/api';
import { changedFields } from 'selectors/form';
import validate from 'utils/validate';
import Button from 'components/Button';
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
  fields: { }
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
  update,
  errors,
  userId,
  changed,
  isFetching,
  syncErrors,
  ...props
}) => {
  const disabled = isFetching
    || Object.keys(changed).length === 0
    || Object.keys(syncErrors).length > 0;

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
          <FormRow small={10} medium={6}>
            { ProfileImage(classes) }
          </FormRow>
          <FormRow small={10} medium={6}>
            <FormField
              fullWidth={false}
              name='email'
              type='text'
              disabled
              mode={FIELD_VIEW}
            />
          </FormRow>
          <div className={classes.fields}>
            <FormRow small={10} medium={6}>
              <FormField name='firstName' type='text' label='First Name' fullWidth />
            </FormRow>
            <FormRow small={10} medium={6}>
              <FormField name='lastName' type='text' label='Last Name' fullWidth />
            </FormRow>
            <FormRow small={10} medium={6}>
              <FormField name='notificationsEmail' type='text' label='Notifications Email' fullWidth />
            </FormRow>
          </div>
          <Divider className={classes.buttonDivider} />
          <FormRow small={10} medium={6}>
            <Column className={classes.buttonBar}>
              <Button
                type='submit'
                label='Save'
                loading={isFetching}
                onClick={() => update(changed, userId)}
                icon={<SaveIcon />}
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

ProfileView.defaultProps = {
  isFetching: false,
  syncErrors: {},
  errors: []
};

ProfileView.propTypes = {
  history:       PropTypes.instanceOf(Object).isRequired,
  update:        PropTypes.func.isRequired,
  changed:       PropTypes.instanceOf(Object).isRequired,
  classes:       PropTypes.instanceOf(Object).isRequired,
  userId:        PropTypes.string.isRequired,
  isFetching:    PropTypes.bool,
  syncErrors:    PropTypes.instanceOf(Object),
  errors:        PropTypes.arrayOf(PropTypes.object)
};

const mapActionCreators = {
  update: updateProfile
};

const mapStateToProps = (state) => ({
  changed:       changedFields(state.form.profile),
  initialValues: _.get(state, 'user.attributes'),
  userId:        _.get(state, 'user.attributes.id'),
  syncErrors:    _.get(state, 'form.profile.syncErrors'),
  isFetching:    _.get(state, 'api.users.update.loading'),
  errors:        _.get(state, 'api.users.update.errors')
});

const validateFields = {
  notificationsEmail: [
    ['isEmail', 'Invalid Email']
  ]
};

const profileForm = reduxForm({
  form: 'profile',
  validate: validate(validateFields)
})(withStyles(styles)(ProfileView));

export default withRouter(connect(mapStateToProps, mapActionCreators)(profileForm));
