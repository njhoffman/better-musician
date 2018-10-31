import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { Typography, withStyles, Paper } from '@material-ui/core';

import OAuthSignInButton from 'components/OAuthSignInButton';
import SocialIcon from 'components/SocialIcon';
import { withRouter } from 'react-router';
import EmailSignUpForm from './EmailSignUpForm';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    }
  },
  registerContainer: {
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

export const RegisterView = ({
  history,
  classes,
  ...props
}) => (
  <Column small={12} medium={8} large={6} className={classes.root}>
    <Paper elevation={5} className={classes.contentContainer}>
      <div className={classes.registerContainer}>
        <Typography variant='body1'>
          Register for
          <br />
          <i>BetterMusician.io</i>
        </Typography>
        <Typography>It&rsquo;s free. It&rsquo;s easy. It takes 5 seconds.</Typography>
        <Row>
          <Column>
            <OAuthSignInButton
              label='Sign Up with Facebook'
              primary
              iconAlign='left'
              className={classes.facebookButton}
              style={{ width: '250px', margin: '5px' }}
              icon={<SocialIcon name='facebook' style={{ height: '1.8em' }} />}
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
              style={{ width: '250px', margin: '5px' }}
              icon={<SocialIcon name='google' style={{ height: '1.8em' }} />}
              provider='google'
            />
          </Column>
        </Row>
        <div className={classes.divider}>
          <Typography className={classes.dividerText}>or, sign up with email</Typography>
        </div>
        <EmailSignUpForm next={() => history.push('/profile')} />
      </div>
    </Paper>
  </Column>
);

RegisterView.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired
};

const mapActionCreators = { };

const mapStateToProps = (state) => ({
  settings: state.register
});

const withConnect = connect(mapStateToProps, mapActionCreators);
const decorators = (View) => withRouter(withConnect(withStyles(styles)(View)));
export default decorators(RegisterView);
