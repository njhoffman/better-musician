import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { Typography } from '@material-ui/core';

const StatsFooter = ({ classes, stats }) => (
  <Row className={classes.footerStats}>
    <Column small={6} className={`${classes.leftColumn} ${classes.statsColumn}`}>
      <div className={classes.statsRow}>
        <Typography variant='caption' className={classes.statsLabel}>
          Song Count
        </Typography>
        <Typography variant='caption' color='secondary' className={classes.statsValue}>
          {stats.songCount}
        </Typography>
      </div>
      <div className={classes.statsRow}>
        <Typography variant='caption' className={classes.statsLabel}>
          Artists
        </Typography>
        <Typography variant='caption' color='secondary' className={classes.statsValue}>
          {stats.artistCount}
        </Typography>
      </div>
      <div className={classes.statsRow}>
        <Typography variant='caption' className={classes.statsLabel}>
          Genres
        </Typography>
        <Typography variant='caption' color='secondary' className={classes.statsValue}>
          {stats.genresCount}
        </Typography>
      </div>
    </Column>
    <Column small={6} className={`${classes.rightColumn} ${classes.statsColumn}`}>
      <div className={classes.statsRow}>
        <Typography variant='caption' className={classes.statsLabel}>
         Average Difficulty
        </Typography>
        <Typography variant='caption' color='secondary' className={classes.statsValue}>
          --
        </Typography>
      </div>
      <div className={classes.statsRow}>
        <Typography variant='caption' className={classes.statsLabel}>
          Average Progress
        </Typography>
        <Typography variant='caption' color='secondary' className={classes.statsValue}>
          --
        </Typography>
      </div>
      <div className={classes.statsRow}>
        <Typography variant='caption' className={classes.statsLabel}>
          Progress Rate
        </Typography>
        <Typography variant='caption' color='secondary' className={classes.statsValue}>
          --
        </Typography>
      </div>
    </Column>
  </Row>
);

StatsFooter.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  stats: PropTypes.instanceOf(Object).isRequired
};

export default StatsFooter;
