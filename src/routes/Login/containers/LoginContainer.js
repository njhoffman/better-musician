import { connect } from 'react-redux';
import { increment } from '../modules/login';
import Login from '../components/Login';

const mapActionCreators = {
  increment
};

const mapStateToProps = (state) => ({
  settings: state.login
});

export default connect(mapStateToProps, mapActionCreators)(Login);
