import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { Paper } from 'material-ui';
import OAuthSignInButton from 'components/OAuthSignInButton';
// import { emailSignUpFormUpdate, emailSignUp } from 'redux-auth';

import EmailSignUpForm from './EmailSignUpForm';
import { handleRegisterSuccess } from '../modules/register';
import SocialIcon from 'components/SocialIcon';
import css from './RegisterView.scss';

const so = {
  facebookButton: {
    backgroundColor: '#4c69ba',
    labelColor: '#ffffff'
  },
  googleButton: {
    backgroundColor: '#4285f4',
    labelColor: '#ffffff'
  }
};

export const RegisterView = (props) => (
  <Column className='registerView' small={12} medium={10} large={8}>
    <Paper elevation={5}>
      <div className={css.registerContainer}>
        <h3>Sign Up for instrumental.io</h3>
        <p>It's free. It's easy. It takes 5 seconds.</p>
        <div className={css.fieldWrapper}>
          <OAuthSignInButton
            className={css.facebookButton}
            {...so.facebookButton}
            icon={<SocialIcon name='facebook' className={css.facebookIcon} />}
            provider='facebook'>
            Sign Up with Facebook
          </OAuthSignInButton>
        </div>
        <div className={css.fieldWrapper}>
          {/* <OAuthSignInButton */}
          {/*   className={css.googleButton} */}
          {/*   {...so.googleButton} */}
          {/*   icon={<SocialIcon name='google' className={css.googleIcon} />} */}
          {/*   provider='google'> */}
          {/*   Sign Up With Google */}
          {/* </OAuthSignInButton> */}
        </div>
        <div className={css.divider}>
          <span>or, sign up with email</span>
        </div>
        {/* <EmailSignUpForm */}
        {/*   next={props.handleRegisterSuccess} */}
        {/* /> */}
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
