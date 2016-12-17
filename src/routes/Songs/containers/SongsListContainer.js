import { connect } from 'react-redux';
import { getVisibleSongs, setCurrentSong } from 'routes/Songs/modules/songs';
import SongsList from 'routes/Songs/components/SongsList';

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

