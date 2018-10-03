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
import Song from './Song';

const styles = (theme) => ({
  root: {
    tableLayout: 'auto'
  },
  columnTitle: {
    width: '200px',
  },
  columnArtist: {
    textAlign: 'center'
  },
  columnProgress: {
    textAlign: 'center',
    width: '80px'
  },
  columnDifficulty: {
    textAlign: 'center',
    width: '80px',
    paddingRight: '12px !important'
  }
});

export const SongsList = ({
  songsCollection,
  setCurrentSong,
  setSort,
  currentSongId,
  classes
}) => (
  <Table padding='dense' className={classes.root}>
    <TableHead>
      <TableRow>
        <SongsListHeader
          name='title'
          displayName='Title'
          className={classes.columnTitle}
          setSort={setSort}
        />
        <SongsListHeader
          name='artist'
          displayName='Artist'
          className={classes.columnArtist}
          setSort={setSort}
        />
        <SongsListHeader
          name='progress'
          displayName='Progress'
          className={classes.columnProgress}
          setSort={setSort}
        />
        <SongsListHeader
          name='difficulty'
          displayName='Difficulty'
          className={classes.columnDifficulty}
          setSort={setSort}
        />
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
  setSort:           PropTypes.func.isRequired,
  setCurrentSong:    PropTypes.func,
  currentSongId:     PropTypes.string,
  classes:           PropTypes.object.isRequired
};

const mapStateToProps = (state, action) => ({
  songsCollection: songsSelector(state),
  currentSongId:   state.SongsView ? state.SongsView.currentSong : null
});

const mapActionCreators = ({
  setCurrentSong,
  setSort
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SongsList));
