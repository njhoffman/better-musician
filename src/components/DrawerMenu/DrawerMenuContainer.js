import { connect } from 'react-redux';
import { uiHideDrawerMenu } from 'store/ui';
import DrawerMenu from './DrawerMenu';

const mapDispatchToProps = {
  hideDrawerMenu : uiHideDrawerMenu
};

const mapStateToProps = (state) => ({
  isOpen: state.ui.drawer.isOpen,
  user: state.auth && state.auth.get('user')
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
