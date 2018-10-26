import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Column } from 'react-foundation';
import withStyles from '@material-ui/core/styles/withStyles';
import { Divider, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from 'components/Button';
import FormField, { FormRow } from 'components/Field';
import validate from 'utils/validate';
import { emailSignIn } from 'actions/auth/signin';
import { init as initLog } from 'shared/logger';

const { error } = initLog('emailSignInForm');

const styles = (theme) => ({
  divider: {
    margin: '20px 0px 5px 0px'
  },
  errorTitle: {
    color: 'red'
  },
  errorMessage: {
  }
});

const getEndpoint = ({ endpoint, config }) => (
  endpoint || config.auth.currentEndpointKey || config.auth.defaultEndpointkey
);

const getFormValues = (formKeys) => {
  const formData = {};
  formKeys.forEach((key) => {
    if (!formData[key]) {
      formData[key] = document.querySelector(`input[name="${key}"]`).value || '';
    }
  });
  return formData;
};

const handleSubmit = (event, props) => {
  event.preventDefault();

  const formData = getFormValues(['email-sign-in-email', 'email-sign-in-password']);
  // TODO: dev/production check
  props.dispatch(props.emailSignIn(formData, getEndpoint(props)))
    .then(() => props.next(props.dispatch))
    .catch((e) => { error(e); });
};

const EmailSignInForm = ({
  classes,
  isLoading,
  errors,
  loginForm,
  isSignedIn,
  ...props
}) => (
  <form>
    <FormRow>
      <Column>
        {errors && [].concat(errors).map((err, i) => (
          <div key={err.name}>
            <Typography variant='body1' className={classes.errorTitle}>
              {err && err.name ? err.name : ''}
              {err && err.err ? err.err : ''}
            </Typography>
            <Typography variant='caption' className={classes.errorMessage}>
              {err && err.message ? err.message : ''}
              {err && err.reason ? err.reason : ''}
            </Typography>
          </div>
        ))}
      </Column>
    </FormRow>
    <FormRow small={10} medium={8}>
      <FormField
        type='text'
        label='Email'
        name='email-sign-in-email'
        className='email-sign-in-email'
        disabled={isSignedIn}
      />
    </FormRow>
    <FormRow small={10} medium={8}>
      <FormField
        type='text'
        label='Password'
        name='email-sign-in-password'
        className='email-sign-in-password'
        disabled={isSignedIn}
      />
    </FormRow>
    <Divider className={classes.divider} />
    <FormRow small={10}>
      <Column centerOnSmall>
        <Button
          label='Sign In'
          primary
          icon={<ExitToAppIcon />}
          disabled={Boolean(isSignedIn || loginForm.syncErrors)}
          loading={isLoading}
          onClick={(e) => handleSubmit(e, props)}
        />
      </Column>
    </FormRow>
  </form>
);

const validateFields = {
  'email-sign-in-email': [
    ['required', 'Required'],
    ['isEmail', 'Invalid Email']
  ],
  'email-sign-in-password': [
    ['required', 'Required'],
  ]
};

EmailSignInForm.propTypes = {
  classes:     PropTypes.instanceOf(Object).isRequired,
  config:      PropTypes.instanceOf(Object).isRequired,
  loginForm:   PropTypes.instanceOf(Object),
  isLoading:   PropTypes.bool.isRequired,
  errors:      PropTypes.arrayOf(PropTypes.object),
  dispatch:    PropTypes.func.isRequired,
  endpoint:    PropTypes.string,
  next:        PropTypes.func,
  emailSignIn: PropTypes.func.isRequired,
  isSignedIn:  PropTypes.bool.isRequired
};

EmailSignInForm.defaultProps = {
  next:      () => {},
  errors:    [],
  endpoint:  null,
  loginForm: {}
};

const mapStateToProps = (state) => ({
  config:      state.config,
  isSignedIn:  state.user.isSignedIn,
  loginForm:   state.form.login,
  errors:      state.api.auth.login.errors || [],
  syncErrors:  state.form.updateProfileForm.syncErrors,
  isLoading:   state.api.auth.login.loading,
  emailSignIn
});

export default connect(mapStateToProps)(withStyles(styles)(reduxForm({
  form: 'login',
  validate: validate(validateFields)
})(EmailSignInForm)));
