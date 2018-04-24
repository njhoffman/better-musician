import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableBody, TableRow } from 'material-ui/Table';
import withTheme from 'material-ui/styles/withTheme';
import Tappable from 'react-tappable';

import { setCurrentSong, setSort } from 'routes/Songs/modules/songs';
import { songs as songsSelector } from 'routes/Songs/modules/selectors';
import SongsListHeader from './SongsListHeader';
import { uiShowModal, MODAL_ADD_SONG } from 'store/ui';
import Song from './Song';
import css from './SongList.scss';

const myTmp = 'hello';

export const SongsList = ({
  songsCollection,
  muiTheme,
  showViewSongModal,
  setCurrentSong,
  setSort,
  currentSongId }) => (
  <Tappable onPress={showViewSongModal}>
      <Table
      selectable
      onRowSelection={setCurrentSong}
      className={css.songsList}
      style={{ tableLayout: 'fixed' }}>
      <TableBody
          showRowHover
          stripedRows
          deselectOnClickaway
          displayRowCheckbox={false}>
          <TableRow>
          <SongsListHeader
              className={css.title}
              setSort={setSort}
              name='title'
              displayName='Title' />
          <SongsListHeader
              className={css.artist}
              setSort={setSort}
              name='artist'
              displayName='Artist' />
          <SongsListHeader
              className={css.progress}
              setSort={setSort}
              name='progress'
              displayName='Progress' />
          <SongsListHeader
              className={css.difficulty}
              setSort={setSort}
              name='difficulty'
              displayName='Difficulty' />
        </TableRow>
          {songsCollection && songsCollection.map(song => {
          return (
            <Song
              key={song.id}
              songValues={song}
              selectable={song.id !== currentSongId}
            />
          );
        })}
        </TableBody>
    </Table>
    </Tappable>
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
  showViewSongModal: PropTypes.func,
  currentSongId: PropTypes.string
};

const showViewSongModal = () => {
  return uiShowModal(MODAL_ADD_SONG, 'view');
};

const mapStateToProps = (state, action) => ({
  songsCollection: songsSelector(state),
  currentSongId:   state.songsView.currentSong
});

const mapActionCreators = ({
  showViewSongModal,
  setCurrentSong,
  setSort
});

export default connect(mapStateToProps, mapActionCreators)(withTheme()(SongsList));
