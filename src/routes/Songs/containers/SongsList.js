import { connect } from 'react-redux';
import { getVisibleSongs } from '../modules/songs';
import SongsList from '../components/SongsList';

// Song Entry:
//     - Year
//     - Notes

const mapStateToProps = (state, action) => ({
  collection: getVisibleSongs(state.songs)
});

const toggleSong = () => {
  return;
}

const mapActionCreators = ({
    onSongClick: toggleSong
});

export default connect(
    mapStateToProps,
    mapActionCreators
)(SongsList);

