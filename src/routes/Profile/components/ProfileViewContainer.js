import { connect } from 'react-redux';
import ProfileView from './ProfileView';
import { updateUser } from 'store/api';

const mapActionCreators = {
  updateProfile : updateUser
};

const mapStateToProps = (state) => {
  const user = state.auth.get('user').get('attributes');
  const initialValues = {
    firstName: user.get('firstName'),
    lastName: user.get('lastName'),
    email: user.get('email'),
    notificationsEmail: user.get('notificationsEmail')
  };

  return ({
    api: state.api,
    user: state.auth.get('user'),
    initialValues: initialValues
  });
}

export default connect(mapStateToProps, mapActionCreators)(ProfileView);
