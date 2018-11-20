import _ from 'lodash';
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
    .catch((e) => {
      error(e);
    });
};


const EmailSignUpForm = ({
  classes,
  isFetching,
  errors,
  isSignedIn,
  syncErrors,
  ...props
}) => (
  <form>
    <FormRow small={10} medium={8}>
      <Column>
        {errors && [].concat(errors).map(({ name, title, message, reason }, i) => (
          <div key={name || title.replace(/[^\w]/g, '')}>
            <Typography variant='body1' className={classes.errorTitle}>
              {title || name}
            </Typography>
            <Typography variant='caption' className={classes.errorMessage}>
              {message}
              {reason}
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
          disabled={Boolean(isSignedIn || Object.keys(syncErrors).length > 0 || isFetching)}
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
  syncErrors:   PropTypes.instanceOf(Object),
  errors:       PropTypes.instanceOf(Object),
  isFetching:   PropTypes.bool.isRequired,
  dispatch:     PropTypes.func.isRequired,
  endpoint:     PropTypes.string,
  next:         PropTypes.func,
  emailSignUp:  PropTypes.func.isRequired,
  isSignedIn:   PropTypes.bool.isRequired
};

EmailSignUpForm.defaultProps = {
  next:         () => {},
  errors:       {},
  syncErrors:   {},
  endpoint:     null
};


const mapStateToProps = (state) => ({
  emailSignUp,
  config:       state.config,
  changed:      changedFields(_.get(state, 'form.register')),
  isSignedIn:   _.get(state, 'user.isSignedIn'),
  errors:       _.get(state, 'api.auth.register.errors'),
  syncErrors:   _.get(state, 'form.register.syncErrors'),
  isFetching:   _.get(state, 'api.auth.register.loading')
});

export default withStyles(styles)(
  connect(mapStateToProps)(
    reduxForm({
      form: 'register',
      validate: validate(validateFields)
    })(EmailSignUpForm)
  )
);
