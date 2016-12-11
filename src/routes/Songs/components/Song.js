import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import StarIcon from 'react-icons/lib/md/star';
import css from './Song.scss';

const Song = ({ completed, title, artist, progress, difficulty, striped, selected }) => {
  return (
    <TableRow
      hoverable={true}
      displayBorder={true}
      striped={striped}
      selected={selected}
    >
      <TableRowColumn className={css.title}>
        { title }
      </TableRowColumn>
      <TableRowColumn className={css.artist}>
        { artist }
      </TableRowColumn>
      <TableRowColumn className={css.progress}>
        { [...Array(progress)].map((x,i) => <StarIcon key={i} /> )}
      </TableRowColumn>
      <TableRowColumn className={css.difficulty}>
        { difficulty }
      </TableRowColumn>
  </TableRow>
  );
};

Song.propTypes = {
    completed: PropTypes.bool.isRequired,
    title:     PropTypes.string.isRequired,
    artist:    PropTypes.string,
    progress:  PropTypes.number,
    difficulty: PropTypes.number
};

export default Song;
