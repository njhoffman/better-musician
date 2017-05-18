import { connect } from 'react-redux';
import AddSongModal from './AddSongModal';

import { addSong } from '../../modules/songs';

import { MODAL_ADD_SONG, uiShowModal, uiHideModal } from 'store/ui';

import {
  currentSong as currentSongSelector,
  savedTabs as savedTabsSelector
} from 'routes/Songs/modules/selectors';

import {
  artists as artistsSelector,
  artistsMatched as artistsMatchedSelector,
  instruments as instrumentsSelector,
  genres as genresSelector
} from 'selectors/songs';

import { maxDifficulty as maxDifficultySelector } from 'selectors/users';

export const showEditSongModal = () => uiShowModal(MODAL_ADD_SONG, 'edit');

const mapDispatchToProps = {
  uiHideModal,
  addSong,
  editSong : showEditSongModal
};

const initialValues = (song) => {
  if (song) {
    // return object for nested models, redux form tries to reset and breaks if not a plain object
    const ivSong = Object.assign({}, song);
    ivSong.artist = song.artist.ref;
    ivSong.genre = song.genre.ref;
    ivSong.instrument = song.instrument.ref;
    return ivSong;
  }
  return song;
};

const mapStateToProps = (state) => ({
  initialValues: initialValues(currentSongSelector(state)),
  activeField:   state.form.addSongForm ? state.form.addSongForm.active : null,
  formValues:    state.form.addSongForm ? state.form.addSongForm.values : null,
  savedTabs:     savedTabsSelector(state),
  matchedArtist: artistsMatchedSelector(state),
  maxDifficulty: maxDifficultySelector(state),
  genres:        genresSelector(state),
  instruments:   instrumentsSelector(state),
  artists:       artistsSelector(state),
  modal:         state.ui.modal,
  isOpen:        state.ui.modal.type === MODAL_ADD_SONG
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongModal);
