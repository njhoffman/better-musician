import { connect } from 'react-redux';
import { uiHideSnackbar } from 'store/ui';
import Snackbar from './Snackbar';

const mapDispatchToProps = { uiHideSnackbar };
const mapStateToProps = (state) => ({
  isOpen: state.ui.snackbar.isOpen,
  message: state.ui.snackbar.message
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
