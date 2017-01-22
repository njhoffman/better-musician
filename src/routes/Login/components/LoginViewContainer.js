import { connect } from 'react-redux';
import { increment } from '../modules/login';
import LoginView from './LoginView';
import { handleLoginSuccess } from '../modules/login';

const mapActionCreators = {
  handleLoginSuccess
};

const mapStateToProps = (state) => ({
  settings: state.login
});

export default connect(mapStateToProps, mapActionCreators)(LoginView);
