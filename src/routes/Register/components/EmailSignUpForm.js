import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withStyles }  from '@material-ui/core';
import { Row, Column } from 'react-foundation';

import { MdHelp as HelpIcon } from 'react-icons/md';
import ContentSend from '@material-ui/icons/Send';

import Button from 'components/Button';
import FormField from 'components/Field';
import { emailSignUp } from 'actions/auth/register';
import css from './EmailSignUpForm.scss';

const styles = theme => ({
  button: {
    width: '250px',
    display: 'none'
  }
});

export class EmailSignUpForm extends React.Component {
  static propTypes = {
    config:                 PropTypes.object.isRequired,
    endpoint:               PropTypes.string,
    next:                   PropTypes.func.isRequired,
    emailSignUp:            PropTypes.func.isRequired,
    dispatch:               PropTypes.func.isRequired,
    isSignedIn:             PropTypes.bool,
    registerForm:           PropTypes.object,
    inputProps:             PropTypes.shape({
      email:                PropTypes.object,
      password:             PropTypes.object,
      passwordConfirmation: PropTypes.object,
      submit:               PropTypes.object
    })
  };

  static defaultProps = {
    next:       () => {},
    inputProps: {
      email:    {},
      password: {},
      submit:   {}
    }
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEndpoint() {
    return (
      this.props.endpoint
      || this.props.config.auth.currentEndpointKey
      || this.props.config.auth.defaultEndpointkey
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = this.props.registerForm.values;
    this.props.dispatch(this.props.emailSignUp(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render() {
    // let disabled = (this.props.isSignedIn ||
    //   this.props.auth.getIn(['emailSignUp', this.getEndpoint(), 'loading'])
    // );
    // const errors = this.props.auth.getIn(['emailSignUp', this.getEndpoint(), 'errors']);
    const disabled = this.props.isSignedIn;
    const { errors } = this.props.api.auth.register;

    return (
      <form
        className='redux-auth email-sign-up-form clearfix'
        style={{ clear: 'both', overflow: 'hidden' }}
        onSubmit={this.handleSubmit}>
        <Row>
          <Column>
            {errors && errors.map((error, i) =>
              <p key={i} className='error'>{error}</p>)}
          </Column>
        </Row>
        <Row>
          <FormField
            type='text'
            className='_inst_email-sign-up'
            label='Email'
            name='email-sign-up-email'
            disabled={disabled}
          />
        </Row>
        <Row>
          <FormField
            type='text'
            label='Password'
            name='email-sign-up-password'
            disabled={disabled}
            {...this.props.inputProps.password}
          />
        </Row>
        <Row>
          <FormField
            type='text'
            label='Password Confirmation'
            name='email-sign-up-password-confirmation'
            disabled={disabled}
            {...this.props.inputProps.passwordConfirmation}
          />
        </Row>
        <Row className={css.buttonWrapper}>
          <Column centerOnSmall small={12} medium={5} pushOnMedium={7}>
            <Button
              label='Sign Up'
              icon={<ContentSend />}
              className={css.signupButton}
              loading={this.props.isLoading}
              disabled={disabled}
              onClick={() => this.handleSubmit()}
              {...this.props.inputProps.submit}
            />
          </Column>
          <Column centerOnSmall small={12} medium={7} pullOnMedium={5}>
            <Button
              className={css.resetButton}
              label='Reset Password'
              color='secondary'
              icon={<HelpIcon />}
            />
          </Column>
        </Row>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  registerForm: state.form.register,
  emailSignUp,
  config:       state.config,
  api:          state.api,
  isSignedIn:   state.user.isSignedIn,
  isLoading:    state.api.auth.register.loading
});

export default withStyles(styles)(
  connect(mapStateToProps)(
    reduxForm({ form: 'register' })(
      EmailSignUpForm
    )
  )
);
