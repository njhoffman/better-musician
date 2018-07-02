import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import SongsPagination from './SongsPagination';
import SongsList from './SongsList';
import FiltersModal from './Filters/FiltersModal';
import AddSongModal from './AddSong/AddSongModal';

const styles = (theme) => ({
  loginContainer: {
    textAlign: 'center',
    margin: '30px',
    padding: '30px'
  }
});

export const SongsView = ({ classes, ...props }) => (
  <div className={classes.songsContainer}>
    <AddSongModal />
    <SongsList {...props} />
    <SongsPagination />
    <FiltersModal />
  </div>
);

const mapActionCreators = {};
const mapStateToProps = (state) => ({});

const withConnect = connect(mapStateToProps, mapActionCreators);
const decorators = (View) => withConnect(withStyles(styles)(View));
export default decorators(SongsView);
