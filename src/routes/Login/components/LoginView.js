import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography, withStyles, Paper } from '@material-ui/core';
import { Column } from 'react-foundation';

import EmailSignInForm from './EmailSignInForm';
import { withRouter } from 'react-router';
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
  history,
  isSignedIn,
  ...props
}) => (
  <Column small={12} medium={8} large={6}>
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
          <EmailSignInForm next={() => history.push('/songs')} />
        )}
      </div>
    </Paper>
  </Column>
);

LoginView.propTypes = {
  history:    PropTypes.object.isRequired,
  classes:    PropTypes.object.isRequired,
  isSignedIn: PropTypes.bool.isRequired
};

const mapActionCreators = { };
const mapStateToProps = (state) => ({
  settings: state.login,
  isSignedIn: state.user.isSignedIn
});

const withConnect = connect(mapStateToProps, mapActionCreators);
const decorators = (View) => withRouter(withConnect(withStyles(styles)(View)));
export default decorators(LoginView);
