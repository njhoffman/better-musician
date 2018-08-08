import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { Typography, withStyles, Paper } from '@material-ui/core';

import OAuthSignInButton from 'components/OAuthSignInButton';
import EmailSignUpForm from './EmailSignUpForm';
import { handleRegisterSuccess } from '../modules/reducer';
import SocialIcon from 'components/SocialIcon';

const styles = () => ({
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
      content: ' ',
      display: 'table-cell',
      width: '42%',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    '&:after': {
      content: ' ',
      display: 'table-cell',
      width: '42%',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }
    // span {
    //   display: table-cell;
    //   width: 16%;
    //   padding: 0 0.5em;
    //   position: relative;
    //   top: .6em;
    // }
  }
});

export const RegisterView = ({ classes, ...props }) => (
  <Column small={12} medium={10} large={8}>
    <Paper elevation={5} className={classes.contentContainer}>
      <div className={classes.registerContainer}>
        <Typography variant='title'>Sign Up for instrumental.io</Typography>
        <Typography>It&rsquo;s free. It&rsquo;s easy. It takes 5 seconds.</Typography>
        <Row>
          <Column>
            <OAuthSignInButton
              label='Sign Up with Facebook'
              primary
              iconAlign='left'
              style={{ width: '250px', margin: '5px' }}
              icon={<SocialIcon name='facebook' style={{ height: '1.8em' }} />}
              provider='facebook' />
          </Column>
        </Row>
        <Row>
          <Column>
            <OAuthSignInButton
              label='Sign Up With Google'
              primary
              iconAlign='left'
              style={{ width: '250px', margin: '5px' }}
              icon={<SocialIcon name='google'style={{ height: '1.8em' }} />}
              provider='google' />
          </Column>
        </Row>
        <div className={classes.divider}>
          <Typography>or, sign up with email</Typography>
        </div>
        <EmailSignUpForm next={props.handleRegisterSuccess} />
      </div>
    </Paper>
  </Column>
);

RegisterView.propTypes = {
  handleRegisterSuccess: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapActionCreators = {
  handleRegisterSuccess
};

const mapStateToProps = (state) => ({
  settings: state.register
});

const withConnect = connect(mapStateToProps, mapActionCreators);
const decorators = (View) => withConnect(withStyles(styles)(View));
export default decorators(RegisterView);
