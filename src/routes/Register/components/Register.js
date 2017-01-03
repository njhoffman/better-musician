import React, { PropTypes } from "react";
import { Row, Column } from 'react-foundation';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Paper } from 'material-ui';
import EmailSignUpForm from './EmailSignUpForm';
import css from './Register.scss';


export const RegisterView = (props) => (
  <Column small={8} centerOnSmall={true}>
    <Paper zDepth={5}>
      <div className={css.registerContainer}>
        <h2>This is the Register Page</h2>
        <EmailSignUpForm  />
      </div>
    </Paper>
  </Column>
);

export default muiThemeable()(RegisterView);
