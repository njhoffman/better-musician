import { connect } from 'react-redux';

import {
  visualTheme as visualThemeSelector,
  userDisplay as userDisplaySelector,
  userPoints as userPointsSelector
} from 'selectors/users';

import {
  uiToggleDrawerMenu,
  uiShowModal,
  MODAL_ADD_SONG,
  MODAL_FILTER_SONGS
} from 'store/ui';

import Header from './Header';

const localState = {
  searchIsOpen: false
};

export const showAddSongModal = (modalView) => uiShowModal(MODAL_ADD_SONG, modalView);
export const showFiltersModal = (modalView) => uiShowModal(MODAL_FILTER_SONGS, modalView);

export const searchClose = () => {
  debugger;
};

export const toggleSearchPopover = () => {
  return (localState.searchIsOpen = !localState.searchIsOpen);
};

const mapActionCreators = {
  showFiltersModal,
  toggleDrawerMenu : uiToggleDrawerMenu,
  searchClose,
  toggleSearchPopover,
  showAddSongModal
};

const mapStateToProps = (state) => ({
  searchIsOpen:    localState.searchIsOpen,
  currentSong:     state.songsView ? state.songsView.currentSong : null,
  user:            state.auth.get("user"),
  visualTheme:     visualThemeSelector(state),
  userDisplayName: userDisplaySelector(state),
  getUserPoints:   userPointsSelector(state),
  currentView:     state.location ? state.location.currentView : null,
});

export default connect(mapStateToProps, mapActionCreators)(Header);
