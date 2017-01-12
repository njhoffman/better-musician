import { connect } from 'react-redux';
import SettingsView from './SettingsView';
import { updateSettings } from '../modules/settings';

const mapActionCreators = {
  updateSettings
};

const mapStateToProps = (state) => ({
  settings: state.user
});

export default connect(mapStateToProps, mapActionCreators)(SettingsView);
