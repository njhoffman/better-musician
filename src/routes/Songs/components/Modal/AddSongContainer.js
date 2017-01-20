import { connect } from 'react-redux';
import AddSongModal from './AddSong';
import { addSong, isOpen, hideModal } from '../../modules/songs';
import {
  artists as artistsSelector,
  artistsMatched as artistsMatchedSelector,
  instruments as instrumentsSelector,
  genres as genresSelector
} from '../../modules/selectors';
import {
  savedTabs as savedTabsSelector
} from 'routes/Fields/modules/selectors';
import { maxDifficulty as maxDifficultySelector } from 'selectors/users';

const mapDispatchToProps = {
  hideModal,
  addSong
};

const mapStateToProps = (state) => ({
  initialValues: state.modal.payload,
  activeField:   state.form.addSongForm ? state.form.addSongForm.active : null,
  formValues:    state.form.addSongForm ? state.form.addSongForm.values : null,
  savedTabs:     savedTabsSelector(state),
  matchedArtist: artistsMatchedSelector(state),
  maxDifficulty: maxDifficultySelector(state),
  genres:        genresSelector(state),
  instruments:   instrumentsSelector(state),
  artists:       artistsSelector(state),
  modal:         state.modal,
  isOpen:        isOpen(state.modal)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongModal);
