import { connect } from 'react-redux';
import RegisterView from './RegisterView';
import { emailSignUpFormUpdate, emailSignUp } from "store/auth/actions/email-sign-up";

const mapActionCreators = {
  emailSignUp:           emailSignUp,
  emailSignUpFormUpdate: emailSignUpFormUpdate
};

const mapStateToProps = (state) => ({
  settings: state.register
});

export default connect(mapStateToProps, mapActionCreators)(RegisterView);
