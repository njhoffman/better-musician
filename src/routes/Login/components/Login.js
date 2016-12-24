import React from 'react';
import css from './Login.scss';
import { EmailSignInForm } from 'redux-auth/material-ui-theme';

export const Login = (props) => (
  <div className={css.LoginContainer}>

    <h2>This is the Login Page</h2>
    <EmailSignInForm />
  </div>
);

Login.propTypes = {
  settings: React.PropTypes.number.isRequired,
  increment   : React.PropTypes.func.isRequired
};

export default Login;
