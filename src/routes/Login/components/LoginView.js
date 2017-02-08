import React, { PropTypes } from 'react';
import { Paper } from 'material-ui';
import { Column } from 'react-foundation';
import muiThemeable from 'material-ui/styles/muiThemeable';
import css from './LoginView.scss';
import EmailSignInForm from './EmailSignInForm';

export const LoginView = (props) => (
  <Column centerOnSmall small={8}>
    <Paper zDepth={5}>
      <div className={css.loginContainer}>
        <h2>This is the Login Page</h2>
        <EmailSignInForm next={props.handleLoginSuccess} />
      </div>
    </Paper>
  </Column>
);

LoginView.propTypes = {
  handleLoginSuccess: PropTypes.func.isRequired
};

export default muiThemeable()(LoginView);
