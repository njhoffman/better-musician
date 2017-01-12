import { connect } from 'react-redux';
// import { showModal } from '../store/modal';

import Header from './Header';

const localState = {
  searchIsOpen: false,
};

// TODO: these are Songs route specific actionCreators but are in global headerContainer
// extract Songs route specific header elements, dynamically based on route
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

export const showAddSongModal = (modalView) => (dispatch, getState) => {
  return dispatch({
    type: "SHOW_MODAL",
    meta: {
      modalType: "MODAL_ADD_SONG",
      modalView,
      modalProps: {}
    }
  });
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
  currentView: state.location ? state.location.currentView : null,
});

export default connect(mapStateToProps, mapActionCreators)(Header);
