import { connect } from 'react-redux';
import { maxDifficulty as maxDifficultySelector} from 'selectors/users';
import {
  currentSong as currentSongSelector,
  songStats as songStatsSelector } from 'routes/Songs/modules/selectors';

import Footer from './Footer';

const mapStateToProps = (state) => ({
  song:          currentSongSelector(state),
  signedIn:      state.auth.get('user').get('isSignedIn'),
  stats:         songStatsSelector(state),
  maxDifficulty: maxDifficultySelector(state)
});

const mapActionCreators  = {};

export default connect(mapStateToProps /*, mapActionCreators */)(Footer);
