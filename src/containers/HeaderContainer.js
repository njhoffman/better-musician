import { connect } from 'react-redux';
// import { showModal } from '../store/modal';

import Header from '../components/Header';

// const showAddSongModal = () => showModal('ADD_SONG');

export const showAddSongModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "SHOW_MODAL", modalType: "ADD_SONG", modalProps: {} });
  };
};

export const showFiltersModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "SHOW_MODAL", modalType: "FILTER_SONGS", modalProps: {} });
  };
};

export const toggleDrawerMenu = () => {
  console.log("toggleDrawerMenu");
  return (dispatch, getState) => {
    return dispatch({ type: "TOGGLE_DRAWER_MENU" });
  };
};

const mapDispatchToProps = {
  showAddSongModal,
  showFiltersModal,
  toggleDrawerMenu
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
