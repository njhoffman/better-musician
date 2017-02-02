import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import css from './Song.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { RenderStars, RenderDifficulty } from 'components/Field';

const Song = ({ songValues, showViewSongModal, maxDifficulty, columnWidths, muiTheme, ...custom }) => {

  return (
    <TableRow
      hoverable={true}
      onDoubleClick={showViewSongModal}
      displayBorder={true}
      {...custom}>
      <TableRowColumn
        style={{ textAlign: 'center' }}
        data-rowId={songValues.id}
        className={css.title}>
        { songValues.title }
      </TableRowColumn>
      <TableRowColumn
        style={{ textAlign: 'center' }}
        data-rowId={songValues.id}
        className={css.artist}>
        { songValues.artist.fullName }
      </TableRowColumn>
      <TableRowColumn
        style={{ textAlign: 'center' }}
        data-rowId={songValues.id}
        className={css.progress}>
        <RenderStars number={songValues.progress} starColor={muiTheme.starColor} />
      </TableRowColumn>
      <TableRowColumn
        style={{ textAlign: 'center' }}
        data-rowId={songValues.id}
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
