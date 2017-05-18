import { connect } from 'react-redux';
import AddSongMainTab from './AddSongMainTab';

import {
  artists as artistsSelector,
  artistsMatched as artistsMatchedSelector,
  instruments as instrumentsSelector,
  genres as genresSelector
} from 'selectors/songs';

import { maxDifficulty as maxDifficultySelector } from 'selectors/users';

const mapStateToProps = (state) => ({
  activeField:   state.form.addSongForm ? state.form.addSongForm.active : null,
  matchedArtist: artistsMatchedSelector(state),
  maxDifficulty: maxDifficultySelector(state),
  genres:        genresSelector(state),
  instruments:   instrumentsSelector(state),
  artists:       artistsSelector(state)
});

export default connect(mapStateToProps)(AddSongMainTab);
