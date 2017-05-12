import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableRow } from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';

import SongsListHeader from './SongsListHeader';
import Song from './SongContainer';
import css from './SongList.scss';

export const SongsList = ({
  songsCollection,
  muiTheme,
  setCurrentSong,
  setSort,
  currentSongId }) => (
    <Table
      selectable
      onRowSelection={setCurrentSong}
      className={css.songsList}
      style={{ tableLayout: 'auto' }}>
      <TableBody
        showRowHover
        stripedRows
        deselectOnClickaway
        displayRowCheckbox={false}>
        <TableRow>
          <SongsListHeader setSort={setSort} name='title' displayName='Title' />
          <SongsListHeader setSort={setSort} name='artist' displayName='Artist' />
          <SongsListHeader setSort={setSort} name='progress' displayName='Progress' />
          <SongsListHeader setSort={setSort} name='difficulty' displayName='Difficulty' />
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
