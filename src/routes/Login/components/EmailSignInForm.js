import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Column } from 'react-foundation';
import withStyles from '@material-ui/core/styles/withStyles';
import { Divider, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from 'components/Button';
import FormField from 'components/Field';
import { emailSignIn } from 'actions/auth/login';

import config from 'data/config';

const styles = theme => ({
  divider: {
    margin: '20px 0px 5px 0px'
  }
});

export class EmailSignInForm extends React.Component {
  static propTypes = {
    config:      PropTypes.object.isRequired,
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

  getFormValue(key, formData = {}) {
    formData[key] = formData[key] || $(`input[name="${key}"]`).value || '';
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = this.props.loginForm.values;
    // TODO: dev/production check
    this.getFormValue('email-sign-in-email', formData);
    this.getFormValue('email-sign-in-password', formData);
    this.props.dispatch(this.props.emailSignIn(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render() {
    let disabled = (this.props.isSignedIn || this.props.auth.getIn(['emailSignIn', this.getEndpoint(), 'loading']));
    const errors = this.props.auth.getIn(['emailSignIn', this.getEndpoint(), 'errors']);

    return (
      <form className='redux-auth email-sign-in-form'
        style={{ clear: 'both', overflow: 'hidden' }}
        onSubmit={this.handleSubmit}>
        <Row>
          <Column>
            {errors && [].concat(errors).map((error, i) =>
              <Typography
                variant="body1"
                key={i} className='error'>
                {error}
              </Typography>
            )}
          </Column>
        </Row>
        <Row>
          <FormField
            type='text'
            label='Email'
            name='email-sign-in-email'
            className='email-sign-in-email'
            disabled={disabled}
            {...this.props.inputProps.email} />
        </Row>
        <Row>
          <FormField
            type='text'
            label='Password'
            name='email-sign-in-password'
            className='email-sign-in-password'
            disabled={disabled}
            {...this.props.inputProps.password} />

        </Row>
        <Divider className={this.props.classes.divider} />
        <Row>
          <Column centerOnSmall>
            <Button
              label='Sign In'
              primary
              className={`email-sign-in-submit ${config.prefix}sign_in_button`}
              icon={<ExitToAppIcon />}
              disabled={disabled}
              loading={this.props.isLoading}
              onClick={this.handleSubmit} />
          </Column>
        </Row>
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
    isLoading:   state.api.endpoints.login.loading,
    emailSignIn: emailSignIn
  };
};

export default connect(mapStateToProps)(withStyles(styles)(reduxForm({ form: 'login' })(EmailSignInForm)));
