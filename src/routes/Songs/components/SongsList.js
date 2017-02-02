import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SortIcon from 'react-icons/lib/md/import-export';

import Song from './Song';
import css from './SongList.scss';


const columnWidths = [
  { textAlign: 'center' },
  { textAlign: 'center' },
  { textAlign: 'center' },
  { textAlign: 'center' }
];

const SongsList = ({ songsCollection, muiTheme, setCurrentSong, onSortClick, currentSong, viewSong, maxDifficulty }) => (
  <Table
    selectable={true}
    onRowSelection={setCurrentSong.bind(undefined, songsCollection)}
    className={css.songsList}
    style={{ tableLayout: 'auto' }}>
    <TableBody
      showRowHover={true}
      displayRowCheckbox={false}
      deselectOnClickaway={true}
      stripedRows={true}>
      <TableRow>
        <TableHeaderColumn style={columnWidths[0]}>
          <a
            style={{ color: muiTheme.palette.accent1Color }}
            onClick={onSortClick.bind(undefined, 'title')}>
            Title
            <SortIcon />
          </a>
        </TableHeaderColumn>
        <TableHeaderColumn style={columnWidths[1]}>
          <a
            style={{ color: muiTheme.palette.accent1Color }}
            onClick={onSortClick.bind(undefined, 'artist')}>
            Artist
            <SortIcon />
          </a>
        </TableHeaderColumn>
        <TableHeaderColumn style={columnWidths[2]}>
          <a
            style={{ color: muiTheme.palette.accent1Color }}
            onClick={onSortClick.bind(undefined, 'progress')} >
            Progress
            <SortIcon />
          </a>
        </TableHeaderColumn>
        <TableHeaderColumn style={columnWidths[3]}>
          <a
            style={{ color: muiTheme.palette.accent1Color }}
            onClick={onSortClick.bind(undefined, 'difficulty')}>
            Difficulty
            <SortIcon />
          </a>
        </TableHeaderColumn>
      </TableRow>
      {songsCollection && songsCollection.map(song =>
        <Song
          key={song.id}
          songValues={song}
          maxDifficulty={maxDifficulty}
          columnWidths={columnWidths}
          viewSong={viewSong}
          selected={song.id === currentSong}
        />
      )}
    </TableBody>
  </Table>
);

SongsList.propTypes = {
  songsCollection: PropTypes.arrayOf(
    PropTypes.shape({
      id:        PropTypes.string,
      title:     PropTypes.string
    }).isRequired),
  onSortClick: PropTypes.func.isRequired
};

export default muiThemeable()(SongsList);
