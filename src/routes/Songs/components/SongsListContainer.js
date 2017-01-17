import { connect } from 'react-redux';
import { getVisibleSongs, setCurrentSong, setSort, viewSong } from 'routes/Songs/modules/songs';
import { maxDifficulty as maxDifficultySelector} from 'selectors/users';
import SongsList from './SongsList';

const getCurrentSong = (state) => {
  return state.songsView && state.songsView.currentSong
    ? state.songsView.currentSong
    : "";
};

const mapStateToProps = (state, action) => ({
  songsCollection: getVisibleSongs(state),
  currentSong:     getCurrentSong(state),
  maxDifficulty:   maxDifficultySelector(state)
});

const mapActionCreators = ({
  onSongClick: setCurrentSong,
  onSortClick: setSort,
  viewSong
});

export default connect(
    mapStateToProps,
    mapActionCreators
)(SongsList);

