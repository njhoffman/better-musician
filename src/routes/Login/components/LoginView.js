import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Typography, withStyles, Paper } from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import { withRouter } from 'react-router';

import OAuthSignInButton from 'components/OAuthSignInButton';
import SocialIcon from 'components/SocialIcon';
import SignOutButton from 'components/SignOutButton';
import EmailSignInForm from 'components/Forms/EmailSignIn';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    }
  },
  loginContainer: {
    textAlign: 'center',
    margin: '30px',
    padding: '30px'
  },
  divider: {
    whiteSpace: 'nowrap',
    margin: '1em 0',
    display: 'table',
    width: '100%',
    marginBottom: '2em',
    '&:before': {
      content: '""',
      display: 'table-cell',
      width: '42%',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    '&:after': {
      content: '""',
      display: 'table-cell',
      width: '42%',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
  },
  dividerText: {
    display: 'table-cell',
    width: '16%',
    padding: '0 0.5em',
    position: 'relative',
    top: '.6em'
  },
  facebookButton: {
    width: '250px',
    margin: '5px',
    background: '#4c69ba'
  },
  googleButton: {
    width: '250px',
    margin: '5px',
    background: '#4285f4'
  }
});

const LoginView = ({
  classes,
  history,
  isSignedIn,
  ...props
}) => (
  <Column small={12} medium={8} large={6} className={classes.root}>
    <Paper elevation={5} className={classes.contentContainer}>
      <div className={classes.loginContainer}>
        {isSignedIn && (
        <Fragment>
          <Typography variant='body2'>
                You are already logged in.  Would you like to log out?!
            <SignOutButton label='LOGOUT' next={() => { }} />
          </Typography>
        </Fragment>
        )}
        {!isSignedIn && (
        <Fragment>
          <Typography variant='body1'>
                Sign in to
            <br />
            <i>BetterMusician.io</i>
          </Typography>
          <Row>
            <Column>
              <OAuthSignInButton
                label='Sign Up with Facebook'
                primary
                iconAlign='left'
                iconHeight={1.8}
                className={classes.facebookButton}
                icon={<SocialIcon name='facebook' />}
                provider='facebook'
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <OAuthSignInButton
                label='Sign Up With Google'
                primary
                iconAlign='left'
                className={classes.googleButton}
                iconHeight={1.8}
                icon={<SocialIcon name='google' />}
                provider='google'
              />
            </Column>
          </Row>
          <div className={classes.divider}>
            <Typography className={classes.dividerText}>or, sign up with email</Typography>
          </div>
          <EmailSignInForm next={() => history.push('/songs')} />
        </Fragment>
        )}
      </div>
    </Paper>
  </Column>
);

LoginView.propTypes = {
  history:    PropTypes.instanceOf(Object).isRequired,
  classes:    PropTypes.instanceOf(Object).isRequired,
  isSignedIn: PropTypes.bool.isRequired
};

const actionCreators = { };
const stateProps = (state) => ({
  settings: state.login,
  isSignedIn: state.user.isSignedIn
});

export default compose(
  withRouter,
  connect(stateProps, actionCreators),
  withStyles(styles),
)(LoginView);
