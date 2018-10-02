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
        <SongsListHeader name='title' displayName='Title' setSort={setSort} />
        <SongsListHeader name='artist' displayName='Artist' centered setSort={setSort} />
        <SongsListHeader name='progress' displayName='Progress' centered setSort={setSort} />
        <SongsListHeader name='difficulty' displayName='Difficulty' centered setSort={setSort} />
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
  currentSongId:   state.SongsView.currentSong
});

const mapActionCreators = ({
  setCurrentSong,
  setSort
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SongsList));
