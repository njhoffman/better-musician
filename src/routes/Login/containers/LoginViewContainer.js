import { connect } from 'react-redux';
import { increment } from '../modules/login';
import LoginView from '../components/LoginView';

const mapActionCreators = {
  increment
};

const mapStateToProps = (state) => ({
  settings: state.login
});

export default connect(mapStateToProps, mapActionCreators)(LoginView);
