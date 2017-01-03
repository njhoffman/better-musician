import React from 'react';
import css from './Login.scss';
import { EmailSignInForm } from 'redux-auth/material-ui-theme';

export const Login = (props) => (
  <Column small={8} centerOnSmall={true}>
    <Paper zDepth={5}>
      <div className={css.loginContainer}>
        <h2>This is the Login Page</h2>
        <EmailSignInForm  />
      </div>
    </Paper>
  </Column>
);

Login.propTypes = {
  settings: React.PropTypes.number.isRequired,
  increment   : React.PropTypes.func.isRequired
};

export default Login;
