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

export const showAddSongModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "SHOW_MODAL", modalType: "ADD_SONG", modalProps: {} });
  };
};

export const toggleSearchPopover = () => {
  return (localState.searchIsOpen = !localState.searchIsOpen);
};

const mapActionCreators = {
  showFiltersModal,
  toggleDrawerMenu,
  searchClose,
  toggleSearchPopover,
  showAddSongModal
};

const mapStateToProps = (state) => ({
  searchIsOpen: localState.searchIsOpen,
  currentSong: state.songsView ? state.songsView.currentSong : null,
  user: state.auth.get("user"),
  location: state.location ? state.location.pathname : null
});

export default connect(mapStateToProps, mapActionCreators)(Header);
