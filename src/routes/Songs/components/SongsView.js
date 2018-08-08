import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, withStyles } from '@material-ui/core';
import { Column } from 'react-foundation';

import SongsPagination from './SongsPagination';
import SongsList from './SongsList';
import FiltersModal from './Filters/FiltersModal';
import AddSongModal from './AddSong/AddSongModal';

const styles = (theme) => ({
  songsContainer: {
    textAlign: 'center',
    margin: '5px',
    padding: '5px'
  },
  contentContainer: {
    margin: '0px',
    [theme.breakpoints.up('md')]: {
      margin: '10px 5px'
    },
    [theme.breakpoints.up('sm')]: {
      margin: '3px 3px'
    }
  },
});

export const SongsView = ({ classes, ...props }) => (
  <Column small={12} medium={12} large={10}>
    <Paper elevation={5} className={classes.contentContainer}>
      <div className={classes.songsContainer}>
        <AddSongModal />
        <SongsList {...props} />
        <SongsPagination />
        <FiltersModal />
      </div>
    </Paper>
  </Column>
);

SongsView.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapActionCreators = {};
const mapStateToProps = (state) => ({});

const withConnect = connect(mapStateToProps, mapActionCreators);
const decorators = (View) => withConnect(withStyles(styles)(View));
export default decorators(SongsView);
