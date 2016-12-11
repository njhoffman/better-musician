import { connect } from 'react-redux';

import DrawerMenu from 'components/DrawerMenu';

export const isOpen = (drawerMenu) => {
  console.log("isOPen", drawerMenu);
  return (drawerMenu.isOpen ? true : false);
};

export const hideDrawerMenu = () => {
  return (dispatch) => {
    return dispatch({ type: "HIDE_DRAWER_MENU" });
  };
}


const mapDispatchToProps = { hideDrawerMenu };
const mapStateToProps = (state) => ({
  isOpen: isOpen(state.drawerMenu)
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
