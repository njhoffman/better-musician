import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, withStyles, TablePagination } from '@material-ui/core';
import { Column } from 'react-foundation';

// import SongsPagination from './SongsPagination';
import {
  setPaginationPerPage,
  setPaginationCurrent
} from 'routes/Songs/modules/reducer';
import SongsList from './SongsList';
import FiltersModal from './FiltersModal';
import SongModal from './SongModal';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
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

export const SongsView = ({
  setPerPage,
  setCurrent,
  currentPage,
  perPage,
  songCount,
  classes,
  ...props
}) => (
  <Column small={12} medium={11} large={10} className={classes.root}>
    <Paper elevation={5} className={classes.contentContainer}>
      <div className={classes.songsContainer}>
        <SongModal />
        <FiltersModal />
        <SongsList {...props} />
        <TablePagination
          component='div'
          count={songCount}
          rowsPerPage={perPage}
          page={currentPage}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={(e, page) => setCurrent(page)}
          onChangeRowsPerPage={(e) => setPerPage(e.target.value)}
        />
      </div>
    </Paper>
  </Column>
);

SongsView.propTypes = {
  classes:    PropTypes.instanceOf(Object).isRequired,
  setPerPage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

const mapActionCreators = {
  setPerPage: setPaginationPerPage,
  setCurrent: setPaginationCurrent
};

const mapStateToProps = (state) => ({
  currentPage: state.SongsView.paginationCurrent,
  perPage:     state.SongsView.paginationPerPage,
  songCount:   state.orm.Song.items.length
});

const withConnect = connect(mapStateToProps, mapActionCreators);
const decorators = (View) => withConnect(withStyles(styles)(View));
export default decorators(SongsView);
