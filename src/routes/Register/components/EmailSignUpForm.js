import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withStyles, Typography, Divider }  from '@material-ui/core';
import { Column } from 'react-foundation';

import { MdHelp as HelpIcon } from 'react-icons/md';
import ContentSend from '@material-ui/icons/Send';

import { init as initLog } from 'shared/logger';
import validate from 'utils/validate';
import { changedFields } from 'selectors/form';
import Button from 'components/Button';
import FormField, { FormRow } from 'components/Field';
import { emailSignUp } from 'actions/auth/register';

const { error } = initLog('emailSignInForm');

const styles = theme => ({
  button: {
    width: '250px',
    display: 'none'
  },
  divider: {
    margin: '20px 0px 5px 0px'
  },
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

  const formData = getFormValues([
    'email-sign-up-email',
    'email-sign-up-password',
    'email-sign-up-password-confirmation'
  ]);
  // TODO: dev/production check
  props.dispatch(props.emailSignUp(formData, getEndpoint(props)))
    .then(() => props.next(props.dispatch))
    .catch((e) => { error(e); });
};


const EmailSignUpForm = ({
  classes,
  isFetching,
  errors,
  registerForm,
  isSignedIn,
  ...props
}) => (
  <form>
    <FormRow small={10} medium={8}>
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
        className='_inst_email-sign-up'
        label='Email'
        name='email-sign-up-email'
        disabled={isSignedIn}
      />
    </FormRow>
    <FormRow small={10} medium={8}>
      <FormField
        type='text'
        label='Password'
        name='email-sign-up-password'
        disabled={isSignedIn}
      />
    </FormRow>
    <FormRow small={10} medium={8}>
      <FormField
        type='text'
        label='Password Confirmation'
        name='email-sign-up-password-confirmation'
        disabled={isSignedIn}
      />
    </FormRow>
    <Divider className={classes.divider} />
    <FormRow small={10} className={classes.buttonWrapper}>
      <Column centerOnSmall small={12} medium={7} pullOnMedium={5}>
        <Button
          className={classes.resetButton}
          variant='outlined'
          label='Reset Password'
          color='secondary'
          icon={<HelpIcon />}
        />
      </Column>
      <Column centerOnSmall small={12} medium={5} pushOnMedium={7}>
        <Button
          label='Sign Up'
          icon={<ContentSend />}
          className={classes.signupButton}
          loading={isFetching}
          disabled={Boolean(isSignedIn || registerForm.syncErrors || isFetching)}
          onClick={(e) => handleSubmit(e, props)}
        />
      </Column>
    </FormRow>
  </form>
);

const validateFields = {
  'email-sign-up-email': [
    ['required', 'Required'],
    ['isEmail', 'Invalid Email']
  ],
  'email-sign-up-password': [
    ['required', 'Required'],
  ],
  'email-sign-up-password-confirmation': [
    ['required', 'Required'],
  ]
};

EmailSignUpForm.propTypes = {
  classes:      PropTypes.instanceOf(Object).isRequired,
  config:       PropTypes.instanceOf(Object).isRequired,
  registerForm: PropTypes.instanceOf(Object),
  isFetching:   PropTypes.bool.isRequired,
  errors:       PropTypes.arrayOf(PropTypes.object),
  dispatch:     PropTypes.func.isRequired,
  endpoint:     PropTypes.string,
  next:         PropTypes.func,
  emailSignUp:  PropTypes.func.isRequired,
  isSignedIn:   PropTypes.bool.isRequired
};

EmailSignUpForm.defaultProps = {
  next:         () => {},
  errors:       [],
  endpoint:     null,
  registerForm: {}
};


const mapStateToProps = (state) => ({
  emailSignUp,
  registerForm: state.form.register,
  api:          state.api,
  isSignedIn:   state.user.isSignedIn,
  config:       state.config,
  errors:       state.api.auth.register.errors || [],
  syncErrors:   state.form.register ? state.form.register.syncErrors : {},
  isFetching:   state.api.auth.register.loading,
  changed:      changedFields(state.form.register),
});

export default withStyles(styles)(
  connect(mapStateToProps)(
    reduxForm({
      form: 'register',
      validate: validate(validateFields)
    })(EmailSignUpForm)
  )
);
