import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeaderColumn, TableRow } from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SortIcon from 'react-icons/lib/md/import-export';

import Song from './SongContainer';
import css from './SongList.scss';

const SongsList = ({
  songsCollection,
  muiTheme,
  setCurrentSong,
  setSort,
  currentSongId }) => (
    <Table
      selectable
      onRowSelection={setCurrentSong.bind(undefined, songsCollection)}
      className={css.songsList}
      style={{ tableLayout: 'auto' }}>
      <TableBody
        showRowHover
        stripedRows
        deselectOnClickaway
        displayRowCheckbox={false}>
        <TableRow>
          <TableHeaderColumn style={{ textAlign: 'center' }}>
            <a
              style={{ color: muiTheme.palette.accent1Color }}
              onClick={setSort.bind(undefined, 'title')}>
              Title
              <SortIcon />
            </a>
          </TableHeaderColumn>
          <TableHeaderColumn style={{ textAlign: 'center' }}>
            <a
              style={{ color: muiTheme.palette.accent1Color }}
              onClick={setSort.bind(undefined, 'artist')}>
              Artist
              <SortIcon />
            </a>
          </TableHeaderColumn>
          <TableHeaderColumn style={{ textAlign: 'center' }}>
            <a
              style={{ color: muiTheme.palette.accent1Color }}
              onClick={setSort.bind(undefined, 'progress')} >
              Progress
              <SortIcon />
            </a>
          </TableHeaderColumn>
          <TableHeaderColumn style={{ textAlign: 'center' }}>
            <a
              style={{ color: muiTheme.palette.accent1Color }}
              onClick={setSort.bind(undefined, 'difficulty')}>
              Difficulty
              <SortIcon />
            </a>
          </TableHeaderColumn>
        </TableRow>
        {songsCollection && songsCollection.map(song => {
          return (
            <Song
              key={song.id}
              songValues={song}
              selectable={song.id !== currentSongId}
            />
          );
        }
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
  setSort: PropTypes.func.isRequired,
  muiTheme: PropTypes.object,
  setCurrentSong: PropTypes.func,
  currentSongId: PropTypes.string
};

export default muiThemeable()(SongsList);
