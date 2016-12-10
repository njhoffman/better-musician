import React, { PropTypes } from 'react';
import Song from './Song';
import css from './SongList.scss';

const SongsList = ({ collection, onSongClick }) => (
    <ul>
        {collection.map(song =>
            <Song
                key={song.id}
                {...song}
                onClick={() => onSongClick(song.id)}
            />
        )}
    </ul>
);

SongsList.propTypes = {
    collection: PropTypes.arrayOf(
        PropTypes.shape({
            id:        PropTypes.number,
            completed: PropTypes.bool,
            title:     PropTypes.string
        }).isRequired).isRequired,
    onSongClick: PropTypes.func
};

export default SongsList;
