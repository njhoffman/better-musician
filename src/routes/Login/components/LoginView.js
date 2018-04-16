import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import { Column } from 'react-foundation';
import withTheme from 'material-ui/styles/withTheme';
import css from './LoginView.scss';
import EmailSignInForm from './EmailSignInForm';
import { handleLoginSuccess } from '../modules/login';

export const LoginView = (props) => (
  <Column className='loginView' centerOnSmall small={12} medium={10} large={8}>
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

const mapActionCreators = {
  handleLoginSuccess
};
const mapStateToProps = (state) => ({
  settings: state.login
});

export default connect(mapStateToProps, mapActionCreators)(withTheme()(LoginView));
