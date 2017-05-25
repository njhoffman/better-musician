import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableBody, TableRow } from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Tappable from 'react-tappable';

import { setCurrentSong, setSort } from 'routes/Songs/modules/songs';
import { songs as songsSelector } from 'routes/Songs/modules/selectors';
import SongsListHeader from './SongsListHeader';
import { uiShowModal, MODAL_ADD_SONG } from 'store/ui';
import Song from './Song';
import css from './SongList.scss';

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

export default connect(mapStateToProps, mapActionCreators)(muiThemeable()(SongsList));
