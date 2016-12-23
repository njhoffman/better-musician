import { connect } from 'react-redux';
import { getVisibleSongs, setCurrentSong, setSort } from 'routes/Songs/modules/songs';
import SongsList from 'routes/Songs/components/SongsList';

const mapStateToProps = (state, action) => ({
   songsCollection: getVisibleSongs(state)
});

const mapActionCreators = ({
  onSongClick: setCurrentSong,
  onSortClick: setSort
});

export default connect(
    mapStateToProps,
    mapActionCreators
)(SongsList);

