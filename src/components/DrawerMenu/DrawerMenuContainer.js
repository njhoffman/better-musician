import { connect } from 'react-redux';
import { uiHideDrawerMenu } from 'store/ui';
import DrawerMenu from './DrawerMenu';

const mapDispatchToProps = {
  hideDrawerMenu : uiHideDrawerMenu
};

const mapStateToProps = (state) => ({
  isOpen: state.ui.drawer.isOpen,
  isSignedIn: state.user.isSignedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
