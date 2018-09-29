import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Column } from 'react-foundation';
import withStyles from '@material-ui/core/styles/withStyles';
import { Divider, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from 'components/Button';
import FormField, { FormRow } from 'components/Field';
import { emailSignIn } from 'actions/auth/signin';

import { init as initLog } from 'shared/logger';
const { error } = initLog('emailSignInForm');

const styles = theme => ({
  divider: {
    margin: '20px 0px 5px 0px'
  },
  errorTitle: {
    color: 'red'
  },
  errorMessage: {
  }
});

export class EmailSignInForm extends React.Component {
  static propTypes = {
    classes:     PropTypes.object.isRequired,
    config:      PropTypes.object.isRequired,
    isLoading:   PropTypes.bool.isRequired,
    errors:      PropTypes.any,
    auth:        PropTypes.object,
    dispatch:    PropTypes.func.isRequired,
    endpoint:    PropTypes.string,
    next:        PropTypes.func.isRequired,
    emailSignIn: PropTypes.func.isRequired,
    loginForm:   PropTypes.object,
    inputProps:  PropTypes.shape({
      email:     PropTypes.object,
      password:  PropTypes.object,
      submit:    PropTypes.object
    }),
    isSignedIn:  PropTypes.bool.isRequired
  };

  static defaultProps = {
    next: () => {},
    inputProps: {
      email: {},
      password: {},
      submit: {}
    }
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEndpoint() {
    return (
      this.props.endpoint ||
      this.props.config.auth.currentEndpointKey ||
      this.props.config.auth.defaultEndpointkey
    );
  }

  getFormValue(key, formData= {}) {
    if (!formData[key]) {
      formData[key] = document.querySelector(`input[name="${key}"]`).value || '';
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let formData = this.props.loginForm.values;
    // TODO: dev/production check
    this.getFormValue('email-sign-in-email', formData);
    this.getFormValue('email-sign-in-password', formData);
    this.props.dispatch(this.props.emailSignIn(formData, this.getEndpoint()))
      .then(() => this.props.next(this.props.dispatch))
      .catch((e) => { error(e); });
  }

  render() {
    // let disabled = (this.props.isSignedIn || this.props.auth.getIn(['emailSignIn', this.getEndpoint(), 'loading']));
    // const errors = this.props.auth.getIn(['emailSignIn', this.getEndpoint(), 'errors']);
    const { classes, inputProps, isLoading, errors } = this.props;
    const disabled = this.props.isSignedIn;

    return (
      <form>
        <FormRow>
          <Column>
            {errors && [].concat(errors).map((error, i) => (
              <Fragment key={i}>
                <Typography variant='body1' className={classes.errorTitle}>
                  {error && error.name ? error.name : ''}
                </Typography>
                <Typography variant='caption' className={classes.errorMessage}>
                  {error && error.message ? error.message : error || ''}
                </Typography>
              </Fragment>
            ))}
          </Column>
        </FormRow>
        <FormRow small={6}>
          <FormField
            type='text'
            label='Email'
            name='email-sign-in-email'
            className='email-sign-in-email'
            disabled={disabled}
            {...inputProps.email} />
        </FormRow>
        <FormRow small={6}>
          <FormField
            type='text'
            label='Password'
            name='email-sign-in-password'
            className='email-sign-in-password'
            disabled={disabled}
            {...inputProps.password} />

        </FormRow>
        <Divider className={classes.divider} />
        <FormRow small={6}>
          <Column centerOnSmall>
            <Button
              label='Sign In'
              primary
              icon={<ExitToAppIcon />}
              disabled={disabled}
              loading={isLoading}
              onClick={this.handleSubmit} />
          </Column>
        </FormRow>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config:      state.config,
    auth:        state.auth,
    isSignedIn:  state.user.isSignedIn,
    loginForm:   state.form.login,
    errors:      state.api.auth.login.errors,
    isLoading:   state.api.auth.login.loading,
    emailSignIn: emailSignIn
  };
};

export default connect(mapStateToProps)(withStyles(styles)(reduxForm({ form: 'login' })(EmailSignInForm)));
