import { connect } from 'react-redux';
import { getVisibleSongs, setCurrentSong } from '../modules/songs';
import SongsList from '../components/SongsList';

// Song Entry:
//     - Year
//     - Notes

const mapStateToProps = (state, action) => ({
  collection: getVisibleSongs(state.songs)
});

const mapActionCreators = ({
    onSongClick: setCurrentSong
});

export default connect(
    mapStateToProps,
    mapActionCreators
)(SongsList);

