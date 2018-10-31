import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import { Typography } from '@material-ui/core';

const StatsFooter = ({ classes, stats }) => (
  <Row className={classes.footerStats}>
    <Column small={3} centerOnSmall className={classes.leftColumn}>
      <div className={classes.fieldWrapper}>
        <div className={classes.field}>
          <Typography>No Filters</Typography>
        </div>
      </div>
    </Column>
    <Column small={6} centerOnSmall className={classes.middleColumn}>
      <div className={classes.fieldWrapper}>
        <div className={classes.field}>
          <Typography>
            {`Total ${stats.songCount} songs`}
          </Typography>
          <Typography>
            {`from ${stats.artistCount} artists`}
          </Typography>
          <Typography>
            {`in ${stats.genreCount} genres`}
          </Typography>
        </div>
      </div>
    </Column>
    <Column small={3} centerOnSmall className={classes.rightColumn}>
      <div className={classes.fieldWrapper}>
        <div className={classes.field}>
          <Typography>Average Difficulty</Typography>
          <Typography>Average Progress</Typography>
          <Typography>Progress Rate</Typography>
        </div>
      </div>
    </Column>
  </Row>
);

StatsFooter.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  stats: PropTypes.instanceOf(Object).isRequired
};

export default StatsFooter;
