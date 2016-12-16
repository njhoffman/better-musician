import React from 'react';
import css from './Login.scss';

export const Login = (props) => (
  <div className={css.LoginContainer}>
    <h2>This is the Login Page</h2>
  </div>
);

Login.propTypes = {
  settings: React.PropTypes.number.isRequired,
  increment   : React.PropTypes.func.isRequired
};

export default Login;
