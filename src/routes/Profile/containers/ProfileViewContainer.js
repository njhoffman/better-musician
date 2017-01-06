import { connect } from 'react-redux';
import { increment } from '../modules/profile';
import ProfileView from '../components/ProfileView';

const mapActionCreators = {
  increment
};

const mapStateToProps = (state) => ({
  settings: state.login
});

export default connect(mapStateToProps, mapActionCreators)(ProfileView);
