import { connect } from 'react-redux';

import {
  uiShowModal,
  MODAL_FILTER_SONGS
} from 'store/ui';

import HeaderMiddle from './HeaderMiddle';

const localState = {
  searchIsOpen: false
};

export const showFiltersModal = () => uiShowModal(MODAL_FILTER_SONGS);

const mapActionCreators = {
  showFiltersModal
};

const mapStateToProps = (state) => ({
  searchIsOpen : localState.searchIsOpen,
  modal        : state.ui.modal,
  currentSong  : state.songsView ? state.songsView.currentSong : null
});

export default connect(mapStateToProps, mapActionCreators)(HeaderMiddle);
