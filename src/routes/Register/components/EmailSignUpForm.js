import React, { PropTypes } from "react";
import { RenderTextField } from 'components/Field';
import ContentSend from "material-ui/svg-icons/content/send";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ButtonLoader from './ButtonLoader';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { emailSignUp } from 'store/auth/actions/email-sign-up';

class EmailSignUpForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    next: PropTypes.func,
    emailSignUp: PropTypes.func,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
      passwordConfirmation: PropTypes.object,
      submit: PropTypes.object
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

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.getIn(["configure", "currentEndpointKey"]) ||
      this.props.auth.getIn(["configure", "defaultEndpointKey"])
    );
  }

  handleSubmit (event) {
    console.log("@-->handling submit");
    event.preventDefault();

    let formData = this.props.registerForm.values;
    this.props.dispatch(this.props.emailSignUp(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render () {
    let disabled = (
      this.props.auth.getIn(["user", "isSignedIn"]) ||
      this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "loading"])
    );

    const errors = this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "errors"]);

    return (
      <form className='redux-auth email-sign-up-form clearfix'
            style={{clear: "both", overflow: "hidden"}}
            onSubmit={this.handleSubmit.bind(this)}>
          <div>
            { errors && errors.map(error =>
                <p>{error}</p>
            )}
          </div>
        <Field
          component={RenderTextField}
          floatingLabelText="Email"
          name="email-sign-up-email"
          disabled={disabled}
          {...this.props.inputProps.email} />

        <Field type="password"
          component={RenderTextField}
          floatingLabelText="Password"
          name="email-sign-up-password"
          disabled={disabled}
          {...this.props.inputProps.password} />

        <Field type="password"
          component={RenderTextField}
          floatingLabelText="Password Confirmation"
          name="email-sign-up-password-confirmation"
          disabled={disabled}
          {...this.props.inputProps.passwordConfirmation} />

        <ButtonLoader loading={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "loading"])}
          type="submit"
          name="email-sign-up-submit"
          primary={true}
          style={{float: "right"}}
          icon={ContentSend}
          disabled={disabled}
          onClick={this.handleSubmit.bind(this)}
          {...this.props.inputProps.submit}>
          Sign Up
        </ButtonLoader>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    registerForm: state.form.register,
    emailSignUp: emailSignUp
  };
}

export default connect(mapStateToProps)( muiThemeable()(reduxForm({ form: 'register' })(EmailSignUpForm)) );
