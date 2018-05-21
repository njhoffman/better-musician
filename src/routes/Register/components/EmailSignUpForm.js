import React from 'react';
import PropTypes from 'prop-types';
import ContentSend from 'material-ui-icons/Send';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import withTheme from 'material-ui/styles/withTheme';
import { Row, Column } from 'react-foundation';

import { MdHelp as HelpIcon } from 'react-icons/lib/md';

import { Button } from 'material-ui';
import ButtonLoader from 'components/ButtonLoader';
import FormField from 'components/Field';
import { emailSignUp } from 'actions/emailSignUp';
import css from './EmailSignUpForm.scss';

export class EmailSignUpForm extends React.Component {
  static propTypes = {
    auth:                   PropTypes.object.isRequired,
    endpoint:               PropTypes.string,
    next:                   PropTypes.func.isRequired,
    emailSignUp:            PropTypes.func.isRequired,
    dispatch:               PropTypes.func.isRequired,
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
      this.props.endpoint || false
      // this.props.auth.getIn(['configure', 'currentEndpointKey']) ||
      // this.props.auth.getIn(['configure', 'defaultEndpointKey'])
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    let formData = this.props.registerForm.values;
    this.props.dispatch(this.props.emailSignUp(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render() {
    let disabled = (this.props.isSignedIn ||
      this.props.auth.getIn(['emailSignUp', this.getEndpoint(), 'loading'])
    );

    const errors = this.props.auth.getIn(['emailSignUp', this.getEndpoint(), 'errors']);

    return (
      <form className='redux-auth email-sign-up-form clearfix'
        style={{ clear: 'both', overflow: 'hidden' }}
        onSubmit={this.handleSubmit}>
        <Row>
          <Column>
            {errors && errors.map(error =>
              <p className='error'>{error}</p>
            )}
          </Column>
        </Row>
        <Row>
          <FormField
            type='text'
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
            {...this.props.inputProps.password} />
        </Row>
        <Row>
          <FormField
            type='text'
            label='Password Confirmation'
            name='email-sign-up-password-confirmation'
            disabled={disabled}
            {...this.props.inputProps.passwordConfirmation} />
        </Row>
        <Row className={css.buttonWrapper}>
          <Column centerOnSmall small={12} medium={5} pushOnMedium={7}>
            <ButtonLoader
              className={css.signupButton}
              loading={this.props.auth.getIn(['emailSignUp', this.getEndpoint(), 'loading'])}
              type='submit'
              label='Sign Up'
              name='email-sign-up-submit'
              primary
              icon={ContentSend}
              disabled={disabled}
              onClick={() => this.handleSubmit()}
              {...this.props.inputProps.submit} />
          </Column>
          <Column centerOnSmall small={12} medium={7} pullOnMedium={5}>
            <Button
              variant='raised'
              className={css.resetButton}
              color='secondary'
              icon={<HelpIcon />}>
              Reset Password
            </Button>
          </Column>
        </Row>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth:         state.auth,
    registerForm: state.form.register,
    emailSignUp:  emailSignUp,
    isSignedIn:  state.user.isSignedIn
  };
};

export default withTheme()(connect(mapStateToProps)(reduxForm({ form: 'register' })(EmailSignUpForm)));
