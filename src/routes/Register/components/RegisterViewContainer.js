import { connect } from 'react-redux';
import RegisterView from './RegisterView';
import { emailSignUpFormUpdate, emailSignUp } from 'redux-auth';
import { handleRegisterSuccess } from '../modules/register';

const mapActionCreators = {
  emailSignUp,
  emailSignUpFormUpdate,
  handleRegisterSuccess
};

const mapStateToProps = (state) => ({
  settings: state.register
});

export default connect(mapStateToProps, mapActionCreators)(RegisterView);
