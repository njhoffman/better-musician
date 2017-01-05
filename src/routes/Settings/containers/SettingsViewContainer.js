import { connect } from 'react-redux';
import { increment } from '../modules/settings';
import SettingsView from '../components/SettingsView';

const mapActionCreators = {
  increment
};

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps, mapActionCreators)(SettingsView);
