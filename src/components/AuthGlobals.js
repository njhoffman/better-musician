import React, { PropTypes } from 'react';
// import EmailSignInSuccessModal from './Modals/EmailSignInSuccessModal';
// import EmailSignInErrorModal from './Modals/EmailSignInErrorModal';
// import OAuthSignInSuccessModal from './Modals/OAuthSignInSuccessModal';
// import OAuthSignInErrorModal from './Modals/OAuthSignInErrorModal';
import EmailSignUpSuccessModal from './Modals/EmailSignUpSuccessModal';
import EmailSignUpErrorModal from './Modals/EmailSignUpErrorModal';
// import SignOutSuccessModal from './Modals/SignOutSuccessModal';
// import SignOutErrorModal from './Modals/SignOutErrorModal';
// import FirstTimeLoginSuccessModal from './Modals/FirstTimeLoginSuccessModal';
// import FirstTimeLoginErrorModal from './Modals/FirstTimeLoginErrorModal';
// import RequestPasswordResetErrorModal from './Modals/RequestPasswordResetErrorModal';
// import RequestPasswordResetSuccessModal from './Modals/RequestPasswordResetSuccessModal';
// import UpdatePasswordErrorModal from './Modals/UpdatePasswordErrorModal';
// import UpdatePasswordSuccessModal from './Modals/UpdatePasswordSuccessModal';
// import DestroyAccountErrorModal from './Modals/DestroyAccountErrorModal';
// import DestroyAccountSuccessModal from './Modals/DestroyAccountSuccessModal';
// import PasswordResetSuccessModal from './Modals/PasswordResetSuccessModal';
import TokenBridge from './TokenBridge';
import { connect } from 'react-redux';

class AuthGlobals extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    // signOutSuccessEnabled: PropTypes.bool,
    // signOutErrorEnabled: PropTypes.bool,
    // emailSignInSuccessEnabled: PropTypes.bool,
    // emailSignInErrorEnabled: PropTypes.bool,
    // oAuthSignInSuccessEnabled: PropTypes.bool,
    // oAuthSignInErrorEnabled: PropTypes.bool,
    emailSignUpSuccessEnabled: PropTypes.bool,
    emailSignUpErrorEnabled:   PropTypes.bool
    // firstTimeLoginSuccessEnabled: PropTypes.bool,
    // firstTimeLoginErrorEnabled: PropTypes.bool,
    // requestPasswordResetErrorEnabled: PropTypes.bool,
    // requestPasswordResetSuccessEnabled: PropTypes.bool,
    // updatePasswordErrorEnabled: PropTypes.bool,
    // updatePasswordSuccessEnabled: PropTypes.bool,
    // destroyAccountErrorEnabled: PropTypes.bool,
    // destroyAccountSuccessEnabled: PropTypes.bool,
    // passwordResetSuccessEnabled: PropTypes.bool,
    // passwordResetErrorEnabled: PropTypes.bool
  };

  static defaultProps = {
    signOutSuccessEnabled:              true,
    signOutErrorEnabled:                true,
    emailSignInSuccessEnabled:          true,
    emailSignInErrorEnabled:            true,
    oAuthSignInSuccessEnabled:          true,
    oAuthSignInErrorEnabled:            true,
    emailSignUpSuccessEnabled:          true,
    emailSignUpErrorEnabled:            true,
    firstTimeLoginSuccessEnabled:       true,
    firstTimeLoginErrorEnabled:         true,
    requestPasswordResetErrorEnabled:   true,
    requestPasswordResetSuccessEnabled: true,
    updatePasswordErrorEnabled:         true,
    updatePasswordSuccessEnabled:       true,
    destroyAccountErrorEnabled:         true,
    destroyAccountSuccessEnabled:       true,
    passwordResetSuccessEnabled:        true,
    passwordResetErrorEnabled:          true
  };

  render() {
    // let showEmailSignInSuccess = (
    //   this.props.emailSignInSuccessEnabled &&
    //   this.props.auth.getIn(['ui', 'emailSignInSuccessModalVisible'])
    // );
    //
    // let showEmailSignInError = (
    //   this.props.emailSignInErrorEnabled &&
    //   this.props.auth.getIn(['ui', 'emailSignInErrorModalVisible'])
    // );

    let showEmailSignUpSuccess = (
      this.props.emailSignUpSuccessEnabled &&
      this.props.auth.getIn(['ui', 'emailSignUpSuccessModalVisible'])
    );

    let showEmailSignUpError = (
      this.props.emailSignUpErrorEnabled &&
      this.props.auth.getIn(['ui', 'emailSignUpErrorModalVisible'])
    );

    // let showSignOutSuccess = (
    //   this.props.signOutSuccessEnabled &&
    //   this.props.auth.getIn(['ui', 'signOutSuccessModalVisible'])
    // );
    //
    // let showSignOutError = (
    //   this.props.signOutErrorEnabled &&
    //   this.props.auth.getIn(['ui', 'signOutErrorModalVisible'])
    // );
    //
    // let showFirstTimeLoginSuccess = (
    //   this.props.firstTimeLoginSuccessEnabled &&
    //   this.props.auth.getIn(['ui', 'firstTimeLoginSuccessModalVisible'])
    // );
    //
    // let showFirstTimeLoginError = (
    //   this.props.firstTimeLoginErrorEnabled &&
    //   this.props.auth.getIn(['ui', 'firstTimeLoginErrorModalVisible'])
    // );
    //
    // let showRequestPasswordResetError = (
    //   this.props.requestPasswordResetErrorEnabled &&
    //   this.props.auth.getIn(['ui', 'requestPasswordResetErrorModalVisible'])
    // );
    //
    // let showRequestPasswordResetSuccess = (
    //   this.props.requestPasswordResetSuccessEnabled &&
    //   this.props.auth.getIn(['ui', 'requestPasswordResetSuccessModalVisible'])
    // );
    //
    // let showOAuthSignInSuccess = (
    //   this.props.oAuthSignInSuccessEnabled &&
    //   this.props.auth.getIn(['ui', 'oAuthSignInSuccessModalVisible'])
    // );
    //
    // let showOAuthSignInError = (
    //   this.props.oAuthSignInErrorEnabled &&
    //   this.props.auth.getIn(['ui', 'oAuthSignInErrorModalVisible'])
    // );
    //
    // let updatePasswordSuccess = (
    //   this.props.updatePasswordSuccessEnabled &&
    //   this.props.auth.getIn(['ui', 'updatePasswordSuccessModalVisible'])
    // );
    //
    // let updatePasswordError = (
    //   this.props.updatePasswordErrorEnabled &&
    //   this.props.auth.getIn(['ui', 'updatePasswordErrorModalVisible'])
    // );
    //
    // let destroyAccountSuccess = (
    //   this.props.destroyAccountSuccessEnabled &&
    //   this.props.auth.getIn(['ui', 'destroyAccountSuccessModalVisible'])
    // );
    //
    // let destroyAccountError = (
    //   this.props.destroyAccountErrorEnabled &&
    //   this.props.auth.getIn(['ui', 'destroyAccountErrorModalVisible'])
    // );
    //
    // let passwordResetSuccess = (
    //   this.props.passwordResetSuccessEnabled &&
    //   this.props.auth.getIn(['ui', 'passwordResetSuccessModalVisible'])
    // );

    // let passwordResetError = (
    //   this.props.passwordResetErrorEnabled &&
    //   this.props.auth.getIn(['ui', 'passwordResetErrorModalVisible'])
    // );

    return (
      <div id='auth-modals'>
        {/* <EmailSignInSuccessModal show={showEmailSignInSuccess} /> */}
        {/* <EmailSignInErrorModal show={showEmailSignInError} /> */}
        {/* <OAuthSignInSuccessModal show={showOAuthSignInSuccess} /> */}
        {/* <OAuthSignInErrorModal show={showOAuthSignInError} /> */}
        <EmailSignUpSuccessModal show={showEmailSignUpSuccess} />
        <EmailSignUpErrorModal show={showEmailSignUpError} />
        {/* <SignOutSuccessModal show={showSignOutSuccess} /> */}
        {/* <SignOutErrorModal show={showSignOutError} /> */}
        {/* <FirstTimeLoginSuccessModal show={showFirstTimeLoginSuccess} /> */}
        {/* <FirstTimeLoginErrorModal show={showFirstTimeLoginError} /> */}
        {/* <RequestPasswordResetErrorModal show={showRequestPasswordResetError} /> */}
        {/* <RequestPasswordResetSuccessModal show={showRequestPasswordResetSuccess} /> */}
        {/* <UpdatePasswordErrorModal show={updatePasswordError} /> */}
        {/* <UpdatePasswordSuccessModal show={updatePasswordSuccess} /> */}
        {/* <DestroyAccountErrorModal show={destroyAccountError} /> */}
        {/* <DestroyAccountSuccessModal show={destroyAccountSuccess} /> */}
        {/* <PasswordResetSuccessModal show={passwordResetSuccess} /> */}
        <TokenBridge />
      </div>
    );
  }
}

export default connect(({ auth }) => ({ auth }))(AuthGlobals);
