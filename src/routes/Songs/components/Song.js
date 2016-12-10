import React, { PropTypes } from 'react';
import StarIcon from 'react-icons/lib/md/star';
import css from './Song.scss';

const Song = ({ onClick, completed, title, artist, progress, difficulty }) => {
    return (
        <li
            onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            <span className={css.title}>
                { title }
            </span>
            <span className={css.artist}>
                { artist }
            </span>
            <span className={css.icons}>
                <span className={css.songProgress}>
                    { [...Array(progress)].map((x,i) => <StarIcon key={i} /> )}
                </span>
                <span className={css.songDifficulty}>{ difficulty }</span>
                {/* { Array.apply(0,progress)).map(function(x,i) { return StarIcon />;  )} */}
            </span>
        </li>
    );
};

Song.propTypes = {
    onClick:   PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    title:     PropTypes.string.isRequired,
    artist:    PropTypes.string,
    progress:  PropTypes.number,
    difficulty: PropTypes.number
};

export default Song;
