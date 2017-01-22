import { connect } from 'react-redux';
import SettingsView from './SettingsView';
import { updateUser } from 'store/api';

const mapActionCreators = {
  updateSettings : updateUser
};

const mapStateToProps = (state) => ({
  api: state.api,
  initialValues: state.auth.get('user').get('attributes').toJS(),
  settings: state.auth.get('user').get('attributes')
});

export default connect(mapStateToProps, mapActionCreators)(SettingsView);
