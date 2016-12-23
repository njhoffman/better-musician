import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import StarIcon from 'react-icons/lib/md/star';
import css from './Song.scss';

const Song = ({ songValues, columnWidths, ...custom }) => {
  return (
    <TableRow
      hoverable={true}
      displayBorder={true}
      {...custom}
    >
      <TableRowColumn style={columnWidths[0]} className={css.title}>
        { songValues.title }
      </TableRowColumn>
      <TableRowColumn style={columnWidths[1]} className={css.artist}>
        { songValues.artist.fullName }
      </TableRowColumn>
      <TableRowColumn style={columnWidths[2]} className={css.progress}>
        { [...Array(songValues.progress)].map((x,i) => <StarIcon key={i} /> )}
      </TableRowColumn>
      <TableRowColumn style={columnWidths[3]} className={css.difficulty}>
        { songValues.difficulty }
      </TableRowColumn>
  </TableRow>
  );
};

Song.propTypes = {
  songValues: PropTypes.shape({
    completed: PropTypes.bool,
    title:     PropTypes.string.isRequired,
    progress:  PropTypes.number,
    difficulty: PropTypes.number
  }),
  columnWidths: PropTypes.array
};

export default Song;
