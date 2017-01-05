import React from 'react';
import css from './LoginView.scss';
import { EmailSignInForm } from 'redux-auth/material-ui-theme';

export const LoginView = (props) => (
  <Column small={8} centerOnSmall={true}>
    <Paper zDepth={5}>
      <div className={css.loginContainer}>
        <h2>This is the Login Page</h2>
        <EmailSignInForm  />
      </div>
    </Paper>
  </Column>
);

LoginView.propTypes = {
  settings: React.PropTypes.number.isRequired,
  increment   : React.PropTypes.func.isRequired
};

export default LoginView;
