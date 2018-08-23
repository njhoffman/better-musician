import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography, withStyles, Paper } from '@material-ui/core';
import { Column } from 'react-foundation';

import EmailSignInForm from './EmailSignInForm';
import { handleLoginSuccess } from '../modules/reducer';
import SignOutButton from 'components/SignOutButton';

const styles = (theme) => ({
  loginContainer: {
    textAlign: 'center',
    margin: '30px',
    padding: '30px'
  }
});

export const LoginView = ({
  classes,
  isSignedIn,
  ...props
}) => (
  <Column small={12} medium={10} large={8}>
    <Paper elevation={5} className={classes.contentContainer}>
      <div className={classes.loginContainer}>
        <Typography variant='title'>
          This is the Login Page
        </Typography>
        {isSignedIn && (
          <div>
            <Typography variant='body2'>
              You are already logged in.  Would you like to log out?!
            </Typography>
            <SignOutButton label='LOGOUT' next={() => { }} />
          </div>
        )}
        {!isSignedIn && (
          <EmailSignInForm next={handleLoginSuccess} />
        )}
      </div>
    </Paper>
  </Column>
);

LoginView.propTypes = {
  handleLoginSuccess: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isSignedIn: PropTypes.bool.isRequired
};

const mapActionCreators = {
  handleLoginSuccess
};
const mapStateToProps = (state) => ({
  settings: state.login,
  isSignedIn: state.user.isSignedIn
});

const withConnect = connect(mapStateToProps, mapActionCreators);
const decorators = (View) => withConnect(withStyles(styles)(View));
export default decorators(LoginView);
