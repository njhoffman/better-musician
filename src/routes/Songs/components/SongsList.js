import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import {
  Table,
  TableHead,
  TableBody,
  TableRow
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tappable from 'react-tappable';

import { setCurrentSong, setSortColumn } from 'routes/Songs/modules/reducer';
import { songs as songsSelector } from 'routes/Songs/modules/selectors';
import SongsListHeader from './SongsListHeader';
import Song from './Song';

const styles = (theme) => ({
  root: {
    // tableLayout: 'auto'
    tableLayout: 'fixed'
  },
  columnTitle: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      width: '66%',
    }
  },
  columnArtist: {
    textAlign: 'center'
  },
  columnProgress: {
    textAlign: 'center',
    width: '80px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  columnDifficulty: {
    textAlign: 'center',
    width: '80px',
    paddingRight: '12px !important',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

const clickOutside = ({ target }) => {
  if (target.classList && target.classList.value.indexOf('AppContainer-contentWrapper') !== -1) {
    return setCurrentSong();
  }
  return () => {};
};

const SongsList = ({
  songsCollection,
  setSong,
  currentSongId,
  classes,
  setSort,
  sortField,
  sortDirection
}) => (
  <Table padding='dense' className={classes.root}>
    <TableHead>
      <TableRow>
        <SongsListHeader
          name='title'
          displayName='Title'
          className={classes.columnTitle}
          setSort={setSort}
          sortDirection={sortDirection}
          sortField={sortField}
        />
        <SongsListHeader
          name='artist'
          displayName='Artist'
          className={classes.columnArtist}
          setSort={setSort}
          sortDirection={sortDirection}
          sortField={sortField}
        />
        <SongsListHeader
          name='progress'
          displayName='Progress'
          className={classes.columnProgress}
          setSort={setSort}
          sortDirection={sortDirection}
          sortField={sortField}
        />
        <SongsListHeader
          name='difficulty'
          displayName='Difficulty'
          className={classes.columnDifficulty}
          setSort={setSort}
          sortDirection={sortDirection}
          sortField={sortField}
        />
      </TableRow>
    </TableHead>
    <TableBody>
      {songsCollection && songsCollection.map(song => (
        <Tappable
          component={Song}
          songValues={song}
          onTap={(e) => setSong(song)}
          key={song.id}
          {...{ setSong }}
        />
      ))}
    </TableBody>
  </Table>
);

SongsList.defaultProps = {
  songsCollection: [],
  currentSongId: null,
  sortDirection: 'desc',
  sortField: null
};

SongsList.propTypes = {
  songsCollection: PropTypes.arrayOf(
    PropTypes.shape({
      id:        PropTypes.string,
      title:     PropTypes.string
    }).isRequired
  ),
  setSort:           PropTypes.func.isRequired,
  setSong:           PropTypes.func.isRequired,
  sortDirection:     PropTypes.string,
  sortField:         PropTypes.string,
  currentSongId:     PropTypes.string,
  classes:           PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = (state, action) => ({
  sortField:       state.SongsView.sortField,
  sortDirection:   state.SongsView.sortInverse ? 'desc' : 'asc',
  songsCollection: songsSelector(state),
  currentSongId:   state.SongsView ? state.SongsView.currentSong : null
});

const mapActionCreators = ({
  setSong:            setCurrentSong,
  setSort:            setSortColumn,
  handleClickOutside: clickOutside
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(onClickOutside(SongsList)));
