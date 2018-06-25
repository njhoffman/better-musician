import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { Paper, Typography } from 'material-ui';
// import Button from 'components/Button';
import OAuthSignInButton from 'components/OAuthSignInButton';
// import { emailSignUpFormUpdate, emailSignUp } from 'redux-auth';

import EmailSignUpForm from './EmailSignUpForm';
import { handleRegisterSuccess } from '../modules/reducer';
import SocialIcon from 'components/SocialIcon';
import css from './RegisterView.scss';

export const RegisterView = (props) => (
  <Column className='registerView' small={12} medium={10} large={8}>
    <Paper elevation={5}>
      <div className={css.registerContainer}>
        <Typography variant='title'>Sign Up for instrumental.io</Typography>
        <Typography>It's free. It's easy. It takes 5 seconds.</Typography>
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
        <div className={css.divider}>
          <Typography>or, sign up with email</Typography>
        </div>
        <EmailSignUpForm next={props.handleRegisterSuccess} />
      </div>
    </Paper>
  </Column>
);

RegisterView.propTypes = {
  handleRegisterSuccess: PropTypes.func.isRequired
};

const mapActionCreators = {
  // emailSignUp,
  // emailSignUpFormUpdate,
  handleRegisterSuccess
};

const mapStateToProps = (state) => ({
  settings: state.register
});

export default connect(mapStateToProps, mapActionCreators)(RegisterView);
