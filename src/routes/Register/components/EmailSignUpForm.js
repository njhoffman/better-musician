import React, { PropTypes } from 'react';
import ContentSend from 'material-ui/svg-icons/content/send';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Row, Column } from 'react-foundation';

import { MdHelp as HelpIcon } from 'react-icons/lib/md';

import { RaisedButton } from 'material-ui';
import ButtonLoader from 'components/ButtonLoader';
import FormField from 'components/Field';
import { emailSignUp } from 'redux-auth';
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

  getEndpoint() {
    return (
      this.props.endpoint ||
      this.props.auth.getIn(['configure', 'currentEndpointKey']) ||
      this.props.auth.getIn(['configure', 'defaultEndpointKey'])
    );
  }

  handleSubmit(event) {
    console.log('@-->handling submit');
    event.preventDefault();

    let formData = this.props.registerForm.values;
    this.props.dispatch(this.props.emailSignUp(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render() {
    let disabled = (
      this.props.auth.getIn(['user', 'isSignedIn']) ||
      this.props.auth.getIn(['emailSignUp', this.getEndpoint(), 'loading'])
    );

    const errors = this.props.auth.getIn(['emailSignUp', this.getEndpoint(), 'errors']);

    return (
      <form className='redux-auth email-sign-up-form clearfix'
        style={{ clear: 'both', overflow: 'hidden' }}
        onSubmit={this.handleSubmit.bind(this)}>
        <Row>
          <Column>
            {errors && errors.map(error =>
              <p>{error}</p>
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
          <Column centerOnSmall small={7}>
            <RaisedButton
              label='Reset Password'
              secondary
              style={{ marginRight: '10px' }}
              icon={<HelpIcon />}
            />
          </Column>
          <Column centerOnSmall small={5}>
            <ButtonLoader
              loading={this.props.auth.getIn(['emailSignUp', this.getEndpoint(), 'loading'])}
              type='submit'
              name='email-sign-up-submit'
              primary
              icon={ContentSend}
              disabled={disabled}
              onClick={this.handleSubmit.bind(this)}
              {...this.props.inputProps.submit}>
              Sign Up
            </ButtonLoader>
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
    emailSignUp:  emailSignUp
  };
};

export default connect(mapStateToProps)(muiThemeable()(reduxForm({ form: 'register' })(EmailSignUpForm)));
