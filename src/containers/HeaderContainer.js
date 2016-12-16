import { connect } from 'react-redux';
// import { showModal } from '../store/modal';

import Header from '../components/Header';

const localState = {
  searchIsOpen: false,
};

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

export const searchClose = () => {
  debugger;
};

export const toggleSearchPopover = () => {
  return (localState.searchIsOpen = !localState.searchIsOpen);
};

const mapActionCreators = {
  showFiltersModal,
  toggleDrawerMenu,
  searchClose,
  toggleSearchPopover
};

const mapStateToProps = (state) => ({
  searchIsOpen: localState.searchIsOpen,
  currentSong: state.songs.currentSong
});

export default connect(mapStateToProps, mapActionCreators)(Header);
