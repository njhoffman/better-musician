import { connect } from 'react-redux';
import { getVisibleSongs, setCurrentSong, setSort } from 'routes/Songs/modules/songs';
import { songs as songsSelector } from 'routes/Songs/modules/selectors';
import { maxDifficulty as maxDifficultySelector} from 'selectors/users';
import SongsList from './SongsList';

const mapStateToProps = (state, action) => ({
  songsCollection: songsSelector(state),
  currentSongId:   state.songsView.currentSong
});

const mapActionCreators = ({
  setCurrentSong,
  setSort
});

export default connect(
    mapStateToProps,
    mapActionCreators
)(SongsList);

