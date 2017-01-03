import { connect } from 'react-redux';
import { getVisibleSongs, setCurrentSong, setSort } from 'routes/Songs/modules/songs';
import SongsList from 'routes/Songs/components/SongsList';

const getCurrentSong = (state) => {
  return state.songsView && state.songsView.currentSong && state.songsView.currentSong[0]
    ? state.songsView.currentSong[0]
    : -1;
};

const mapStateToProps = (state, action) => ({
  songsCollection: getVisibleSongs(state),
  currentSong: getCurrentSong(state)
});

const mapActionCreators = ({
  onSongClick: setCurrentSong,
  onSortClick: setSort
});

export default connect(
    mapStateToProps,
    mapActionCreators
)(SongsList);

