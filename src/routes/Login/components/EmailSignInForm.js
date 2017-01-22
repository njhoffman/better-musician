import React, { PropTypes } from 'react';
import { MdExitToApp } from 'react-icons/lib/md/'
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import muiThemeable from 'material-ui/styles/muiThemeable';

import ButtonLoader from './ButtonLoader';
import { RenderTextField } from 'components/Field';
import { emailSignIn } from 'store/auth/actions/email-sign-in';

import css from './EmailSignInForm.scss';

class EmailSignInForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    next: PropTypes.func,
    emailSignIn: PropTypes.func,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
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
    event.preventDefault();
    let formData = this.props.loginForm.values;
    this.props.dispatch(emailSignIn(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render () {
    let disabled = (
      this.props.auth.getIn(["user", "isSignedIn"]) ||
      this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
    );

    const errors = this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "errors"]);

    return (
      <form className='redux-auth email-sign-in-form'
        style={{clear: "both", overflow: "hidden"}}
        onSubmit={this.handleSubmit.bind(this)}>
        <div>
          { errors && errors.map(error =>
            <p>{error}</p>
          )}
        </div>
        <div className={css.fieldWrapper}>
          <Field
            component={RenderTextField}
            floatingLabelText="Email"
            name="email-sign-in-email"
            className="email-sign-in-email"
            ref="emailSignInEmail"
            disabled={disabled}
            {...this.props.inputProps.email} />
        </div>
        <div className={css.fieldWrapper}>
          <Field
            type="password"
            component={RenderTextField}
            floatingLabelText="Password"
            name="email-sign-in-password"
            className="email-sign-in-password"
            disabled={disabled}
            {...this.props.inputProps.password} />

        </div>
        <div className={css.fieldWrapper}>
          <ButtonLoader
            loading={this.props.auth.getIn(["emailSignIn", "loading"])}
            type="submit"
            icon={MdExitToApp}
            className='email-sign-in-submit'
            disabled={disabled}
            onClick={this.handleSubmit.bind(this)}
            primary={true}
            {...this.props.inputProps.submit}>
            Sign In
          </ButtonLoader>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    loginForm: state.form.login,
    emailSignIn: emailSignIn
  };
}


export default connect(mapStateToProps)( muiThemeable()(reduxForm({ form: 'login' })(EmailSignInForm)) );
