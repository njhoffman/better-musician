import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, withStyles, TablePagination } from '@material-ui/core';
import { Column } from 'react-foundation';

// import SongsPagination from './SongsPagination';
import SongsList from './SongsList';
import FiltersModal from './FiltersModal';
import SongModal from './SongModal';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    }
  },
  songsContainer: {
    textAlign: 'center',
    margin: '5px',
    padding: '5px',
    overflow: 'hidden'
  },
  contentContainer: {
    margin: '0px',
    [theme.breakpoints.up('sm')]: {
      margin: '10px 5px'
    },
    [theme.breakpoints.up('xs')]: {
      margin: '3px 3px'
    }
  },
});

export const SongsView = ({ classes, ...props }) => (
  <Column small={12} medium={11} large={10} className={classes.root}>
    <Paper elevation={5} className={classes.contentContainer}>
      <div className={classes.songsContainer}>
        <SongModal />
        <FiltersModal />
        <SongsList {...props} />
        <TablePagination
          component='div'
          count={30}
          rowsPerPage={10}
          page={1}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={() => {}}
          onChangeRowsPerPage={() => {}}
        />
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
