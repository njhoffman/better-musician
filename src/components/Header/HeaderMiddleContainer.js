import { connect } from 'react-redux';

import {
  uiShowModal,
  MODAL_ADD_SONG,
  MODAL_FILTER_SONGS
} from 'store/ui';

import HeaderMiddle from './HeaderMiddle';

const localState = {
  searchIsOpen: false
};

export const showAddSongModal = () => uiShowModal(MODAL_ADD_SONG, 'add');
export const showFiltersModal = () => uiShowModal(MODAL_FILTER_SONGS);

export const searchClose = () => {
};

export const toggleSearchPopover = () => {
  return (localState.searchIsOpen = !localState.searchIsOpen);
};

const mapActionCreators = {
  showFiltersModal,
  searchClose,
  toggleSearchPopover,
  showAddSongModal
};

const mapStateToProps = (state) => ({
  searchIsOpen : localState.searchIsOpen,
  modal        : state.ui.modal,
  currentSong  : state.songsView ? state.songsView.currentSong : null
});

export default connect(mapStateToProps, mapActionCreators)(HeaderMiddle);
