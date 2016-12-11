import { connect } from 'react-redux';
// import { showModal } from '../store/modal';

import Header from '../components/Header';

export const showFiltersModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "SHOW_MODAL", modalType: "FILTER_SONGS", modalProps: {} });
  };
};

export const toggleDrawerMenu = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "TOGGLE_DRAWER_MENU" });
  };
};

const mapDispatchToProps = {
  showFiltersModal,
  toggleDrawerMenu
};

const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
