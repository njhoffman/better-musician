import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, withStyles, withTheme } from '@material-ui/core';
import { Column } from 'react-foundation';
import { BarLoader } from 'react-spinners';

const styles = (theme) => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  barLoader: {
    color: theme.palette.primary.main,
    width: '100%'
  },
  error: {
    backgroundColor: theme.palette.error.dark
  }
});

// TODO: Investigate why hot reloading changes to this causes error (undefined export)
const LoadingIndicator = ({ isLoading, pastDelay, error, classes, theme }) => (
  <Column small={6}>
    {isLoading && pastDelay && (
      <Paper className={classes.paper}>
        <Typography variant='h5'>
          Loading...
        </Typography>
        <BarLoader
          width={100}
          widthUnit='%'
          height={20}
          color={theme.palette.text.primary}
          className={classes.barLoader}
          loading={isLoading}
        />
      </Paper>
    )}
    {!isLoading && error && (
      <Paper className={`${classes.paper} ${classes.error}`}>
        <Typography variant='h5'>
          Error!
        </Typography>
        <Typography>
          {error.name}
        </Typography>
        <Typography>
          {error.message}
        </Typography>
      </Paper>
    )}
  </Column>
);

LoadingIndicator.defaultProps = {
  error: null
};

LoadingIndicator.propTypes = {
  classes:   PropTypes.instanceOf(Object).isRequired,
  theme:     PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  pastDelay: PropTypes.bool.isRequired,
  error:     PropTypes.instanceOf(Object)
};

export default withTheme()(withStyles(styles)(LoadingIndicator));
