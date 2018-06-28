import React from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Typography } from 'material-ui';
import { Column } from 'react-foundation';
import withTheme from 'material-ui/styles/withTheme';
import css from './LoginView.scss';
import EmailSignInForm from './EmailSignInForm';
import { handleLoginSuccess } from '../modules/reducer';
import SignOutButton from 'components/SignOutButton';
import { push } from 'react-router-redux';

export const LoginView = (props) => {
  return (
    <Column className='loginView' small={12} medium={10} large={8}>
      <Paper elevation={5}>
        <div className={css.loginContainer}>
          <Typography variant='title'>This is the Login Page</Typography>
          {props.isSignedIn && (
            <div>
              <Typography variant='body2'>
                You are already logged in.  Would you like to log out?
              </Typography>
              <SignOutButton
                label='LOGOUT'
                next={() => { }}
                style={{ backgroundColor: 'transparent', width: '100%' }} />
            </div>
          )}
          {!props.isSignedIn && (
            <EmailSignInForm next={handleLoginSuccess} />
          )}
        </div>
      </Paper>
    </Column>
  );
};

LoginView.propTypes = {
  handleLoginSuccess: PropTypes.func.isRequired
};

const mapActionCreators = {
  handleLoginSuccess
};
const mapStateToProps = (state) => ({
  settings: state.login,
  isSignedIn: state.user.isSignedIn
});

const withConnect = connect(mapStateToProps, mapActionCreators);

export default withRouter(withConnect(withTheme()(LoginView)));
