import { connect } from 'react-redux';
import { uiHideSnackbar } from 'actions/ui';
import Snackbar from './Snackbar';

const mapDispatchToProps = { uiHideSnackbar };
const mapStateToProps = (state) => ({
  isOpen: state.ui.snackbar.isOpen,
  message: state.ui.snackbar.message
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
