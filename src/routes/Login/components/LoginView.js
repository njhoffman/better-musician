import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Typography } from 'material-ui';
import { Column } from 'react-foundation';
import withTheme from 'material-ui/styles/withTheme';
import css from './LoginView.scss';
import EmailSignInForm from './EmailSignInForm';
import { handleLoginSuccess } from '../modules/login';

export const LoginView = (props) => (
  <Column className='loginView' small={12} medium={10} large={8}>
    <Paper elevation={5}>
      <div className={css.loginContainer}>
        <Typography variant='title'>This is the Login Page</Typography>
        <EmailSignInForm next={props.handleLoginSuccess} />
      </div>
    </Paper>
  </Column>
);

LoginView.propTypes = {
  handleLoginSuccess: PropTypes.func.isRequired
};

const mapActionCreators = {
  handleLoginSuccess
};
const mapStateToProps = (state) => ({
  settings: state.login
});

export default connect(mapStateToProps, mapActionCreators)(withTheme()(LoginView));
