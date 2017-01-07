import { connect } from 'react-redux';
import ProfileView from '../components/ProfileView';
import { updateProfile } from '../modules/profile';

const mapActionCreators = {
  updateProfile
};

const mapStateToProps = (state) => {
  const user = state.auth.get('user').get('attributes');
  const initialValues = {
    firstName: user.get('firstName'),
    lastName: user.get('lastName'),
    points: user.get('points')
  };

  return ({
    user: state.auth.get('user'),
    initialValues: initialValues
  });
}

export default connect(mapStateToProps, mapActionCreators)(ProfileView);
