import { connect } from 'react-redux';
import DrawerMenu from './DrawerMenu';

export const hideDrawerMenu = () => {
  return (dispatch) => {
    return dispatch({ type: "HIDE_DRAWER_MENU" });
  };
}

const mapDispatchToProps = {
  hideDrawerMenu
};

const mapStateToProps = (state) => ({
  isOpen: state.drawer.isOpen,
  user: state.auth && state.auth.get('user')
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
