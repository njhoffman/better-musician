import { connect } from 'react-redux';
import AddSongModal from './AddSong';
import { addSong, isOpen, hideModal } from '../../modules/songs';
import {
  currentSong as currentSongSelector,
  savedTabs as savedTabsSelector,
} from 'routes/Songs/modules/selectors';
import {
  artists as artistsSelector,
  artistsMatched as artistsMatchedSelector,
  instruments as instrumentsSelector,
  genres as genresSelector,
} from 'selectors/songs';
import { maxDifficulty as maxDifficultySelector } from 'selectors/users';

const mapDispatchToProps = {
  hideModal,
  addSong
};

const initialValues = song => {
  if (song) {
    const iv = Object.assign({}, song.ref);
    if (song.customFields) {
      song.customFields.forEach(cf => {
        iv[cf.id] = cf.value;
      });
      iv.artist = song.artist.fullName;
      iv.genre = song.genre.name;
      iv.instrument = song.instrument.name;
    }
    return iv;
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
  modal:         state.modal,
  isOpen:        isOpen(state.modal)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongModal);
