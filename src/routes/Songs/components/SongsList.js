import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import Song from './Song';
import css from './SongList.scss';


const SongsList = ({ collection, onSongClick }) => (
  <Table
    selectable={true}
  >
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn>Title</TableHeaderColumn>
        <TableHeaderColumn>Artist</TableHeaderColumn>
        <TableHeaderColumn>Difficulty</TableHeaderColumn>
        <TableHeaderColumn>Progress</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      showRowHover={true}
      deselectOnClickaway={true}
      selectable={true}
      stripedRows={true}
    >
      {collection.map(song =>
        <Song
          key={song.id}
          {...song}
          onClick={() => onSongClick(song.id)}
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
    onSongClick: PropTypes.func
};

export default (SongsList);
