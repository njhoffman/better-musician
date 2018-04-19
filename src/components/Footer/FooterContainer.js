import { connect } from 'react-redux';
import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
import {
  currentSong as currentSongSelector,
  songStats as songStatsSelector
} from 'routes/Songs/modules/selectors';

import Footer from './Footer';

const mapStateToProps = (state) => ({
  song:          currentSongSelector(state),
  isSignedIn:    state.auth ? state.auth.get('user') && state.auth.get('user').get('isSignedIn') : false,
  stats:         songStatsSelector(state),
  maxDifficulty: maxDifficultySelector(state)
});

// const mapActionCreators  = {};
export default connect(mapStateToProps /*, mapActionCreators */)(Footer);
