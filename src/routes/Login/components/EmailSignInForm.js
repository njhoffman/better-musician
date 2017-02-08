import React, { PropTypes } from 'react';
import { MdExitToApp } from 'react-icons/lib/md/';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Row } from 'react-foundation';
import muiThemeable from 'material-ui/styles/muiThemeable';

import ButtonLoader from './ButtonLoader';
import { RenderTextField } from 'components/Field';
import { emailSignIn } from 'store/auth/actions/email-sign-in';

class EmailSignInForm extends React.Component {
  static propTypes = {
    auth:        PropTypes.object.isRequired,
    loginForm:   PropTypes.object.isRequired,
    dispatch:    PropTypes.func.isRequired,
    endpoint:    PropTypes.string.isRequired,
    next:        PropTypes.func.isRequired,
    emailSignIn: PropTypes.func.isRequired,
    inputProps:  PropTypes.shape({
      email:     PropTypes.object,
      password:  PropTypes.object,
      submit:    PropTypes.object
    })
  };

  static defaultProps = {
    next: () => {},
    inputProps: {
      email: {},
      password: {},
      submit: {}
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
    event.preventDefault();
    let formData = this.props.loginForm.values;
    this.props.dispatch(emailSignIn(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render() {
    let disabled = (
      this.props.auth.getIn(['user', 'isSignedIn']) ||
      this.props.auth.getIn(['emailSignIn', this.getEndpoint(), 'loading'])
    );

    const errors = this.props.auth.getIn(['emailSignIn', this.getEndpoint(), 'errors']);

    return (
      <form className='redux-auth email-sign-in-form'
        style={{ clear: 'both', overflow: 'hidden' }}
        onSubmit={this.handleSubmit.bind(this)}>
        <Row>
          { errors && errors.map(error =>
            <p>{error}</p>
          )}
        </Row>
        <Row>
          <Field
            component={RenderTextField}
            floatingLabelText='Email'
            name='email-sign-in-email'
            className='email-sign-in-email'
            ref='emailSignInEmail'
            disabled={disabled}
            {...this.props.inputProps.email} />
        </Row>
        <Row>
          <Field
            type='password'
            component={RenderTextField}
            floatingLabelText='Password'
            name='email-sign-in-password'
            className='email-sign-in-password'
            disabled={disabled}
            {...this.props.inputProps.password} />

        </Row>
        <Row>
          <ButtonLoader
            loading={this.props.auth.getIn(['emailSignIn', 'loading'])}
            type='submit'
            icon={MdExitToApp}
            className='email-sign-in-submit'
            disabled={disabled}
            label='Sign In'
            onClick={this.handleSubmit.bind(this)}
            primary
            {...this.props.inputProps.submit} />
        </Row>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth:        state.auth,
    loginForm:   state.form.login,
    emailSignIn: emailSignIn
  };
};

export default connect(mapStateToProps)(muiThemeable()(reduxForm({ form: 'login' })(EmailSignInForm)));
