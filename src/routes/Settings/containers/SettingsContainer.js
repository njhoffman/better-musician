import { connect } from 'react-redux';
import { increment } from '../modules/settings';
import Settings from '../components/Settings';

const mapActionCreators = {
  increment
};

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps, mapActionCreators)(Settings);
