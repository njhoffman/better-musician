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

const SongsList = ({ collection, onSongClick }) => (
  <Table
    selectable={true}
    onRowSelection={onSongClick}
  >
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn style={columnWidths[0]}>Title <SortIcon /></TableHeaderColumn>
        <TableHeaderColumn style={columnWidths[1]}>Artist <SortIcon /></TableHeaderColumn>
        <TableHeaderColumn style={columnWidths[2]}>Progress <SortIcon /></TableHeaderColumn>
        <TableHeaderColumn style={columnWidths[3]}>Difficulty <SortIcon /></TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      showRowHover={true}
      deselectOnClickaway={false}
      stripedRows={true}
    >
      {collection.map(song =>
        <Song
          key={song.id}
          songValues={song}
          columnWidths={columnWidths}
        />
      )}
    </TableBody>
  </Table>
);

SongsList.propTypes = {
    collection: PropTypes.arrayOf(
        PropTypes.shape({
            id:        PropTypes.number,
            completed: PropTypes.bool,
            title:     PropTypes.string
        }).isRequired).isRequired,
    onSongClick: PropTypes.func.isRequired
};

export default (SongsList);
