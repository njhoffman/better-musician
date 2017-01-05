import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import SortIcon from 'react-icons/lib/md/import-export';

import Song from './Song';
import css from './SongList.scss';


const columnWidths = [
  { width: '35%' },
  { width: '30%' },
  { width: '20%' },
  { width: '15%' },
];

const SongsList = ({ songsCollection, onSongClick, onSortClick, currentSong }) => (
  <Table
    selectable={true}
    onCellClick={onSongClick}
  >
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn style={columnWidths[0]}>
          <a onClick={onSortClick.bind(undefined, 'title')}>
            Title
            <SortIcon />
          </a>
        </TableHeaderColumn>
        <TableHeaderColumn style={columnWidths[1]}>
          <a onClick={onSortClick.bind(undefined, 'artist')}>
            Artist
            <SortIcon />
          </a>
        </TableHeaderColumn>
        <TableHeaderColumn style={columnWidths[2]}>
          <a onClick={onSortClick.bind(undefined, 'progress')}>
            Progress
            <SortIcon />
          </a>
        </TableHeaderColumn>
        <TableHeaderColumn style={columnWidths[3]}>
          <a onClick={onSortClick.bind(undefined, 'difficulty')}>
            Difficulty
            <SortIcon />
          </a>
        </TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      showRowHover={true}
      deselectOnClickaway={false}
      stripedRows={true}
    >
      {songsCollection && songsCollection.map(song =>
        <Song
          key={song.id}
          songValues={song}
          columnWidths={columnWidths}
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
  onSongClick: PropTypes.func.isRequired,
  onSortClick: PropTypes.func.isRequired,
  currentSong: PropTypes.string.isRequired
};

export default (SongsList);
