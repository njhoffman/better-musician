import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import css from './Song.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { RenderStars, RenderDifficulty } from 'components/Field';

const Song = ({ songValues, viewSong, maxDifficulty, columnWidths, muiTheme, ...custom }) => {

  return (
    <TableRow
      hoverable={true}
      onDoubleClick={viewSong.bind(undefined, songValues)}
      displayBorder={true}
      {...custom}>
      <TableRowColumn
        data-rowId={songValues.id}
        style={columnWidths[0]}
        className={css.title}>
        { songValues.title }
      </TableRowColumn>
      <TableRowColumn
        data-rowId={songValues.id}
        style={columnWidths[1]}
        className={css.artist}>
        { songValues.artist.fullName }
      </TableRowColumn>
      <TableRowColumn
        data-rowId={songValues.id}
        style={columnWidths[2]}
        className={css.progress}>
        <RenderStars number={songValues.progress} starColor={muiTheme.starColor} />
      </TableRowColumn>
      <TableRowColumn
        data-rowId={songValues.id}
        style={columnWidths[3]}
        className={css.difficulty}>
        <RenderDifficulty
          difficulty={songValues.difficulty}
          maxDifficulty={maxDifficulty} />
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

export default muiThemeable()(Song);
