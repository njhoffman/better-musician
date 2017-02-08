import { connect } from 'react-redux';
import ProfileView from './ProfileView';
import { updateUser } from 'store/api';

const mapActionCreators = {
  updateProfile : updateUser
};

const mapStateToProps = (state) => {
  return ({
    api: state.api,
    user: state.auth ? state.auth.get('user') : null,
    initialValues: state.auth ? state.auth.get('user').get('attributes').toJS() : null
  });
};

export default connect(mapStateToProps, mapActionCreators)(ProfileView);
