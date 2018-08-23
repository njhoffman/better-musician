import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableBody,
  TableRow
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import Tappable from 'react-tappable';

import { setCurrentSong, setSort } from 'routes/Songs/modules/reducer';
import { songs as songsSelector } from 'routes/Songs/modules/selectors';
import SongsListHeader from './SongsListHeader';
import { uiShowModal, MODAL_ADD_SONG } from 'store/ui';
import Song from './Song';

const styles = (theme) => { };

export const SongsList = ({
  songsCollection,
  showViewSongModal,
  setCurrentSong,
  setSort,
  currentSongId
}) => (
  <Table padding='dense'>
    <TableHead>
      <TableRow>
        <SongsListHeader
          setSort={setSort}
          name='title'
          displayName='Title' />
        <SongsListHeader
          setSort={setSort}
          name='artist'
          displayName='Artist' />
        <SongsListHeader
          setSort={setSort}
          name='progress'
          displayName='Progress' />
        <SongsListHeader
          setSort={setSort}
          name='difficulty'
          displayName='Difficulty' />
      </TableRow>
    </TableHead>
    <TableBody>
      {songsCollection && songsCollection.map(song => (
        <Song
          onClick={(e) => setCurrentSong(song)}
          key={song.id}
          songValues={song}
        />
      ))}
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
  setCurrentSong: PropTypes.func,
  showViewSongModal: PropTypes.func,
  currentSongId: PropTypes.string
};

const showViewSongModal = () => {
  return uiShowModal(MODAL_ADD_SONG, 'view');
};

const mapStateToProps = (state, action) => ({
  songsCollection: songsSelector(state),
  currentSongId:   state.SongsView.currentSong
});

const mapActionCreators = ({
  showViewSongModal,
  setCurrentSong,
  setSort
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SongsList));
