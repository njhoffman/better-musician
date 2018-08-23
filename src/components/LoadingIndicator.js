import React from 'react';
import { Typography, withTheme } from '@material-ui/core';
import { BarLoader } from 'react-spinners';

const LoadingIndicator = ({ isLoading, pastDelay, error, theme }) => {
  if (isLoading && pastDelay) {
    // TODO: add color property to loader
    return (
      <div>
        <Typography>Loading...</Typography>
        <BarLoader
          color={theme.palette.primary.main}
          loading={isLoading}
        />
      </div>
    );
  } else if (error && !isLoading) {
    return (
      <div>
        <Typography>Error!</Typography>
        <Typography>{error.name}</Typography>
        <Typography>{error.message}</Typography>
        <BarLoader
          color={theme.palette.primary.main}
          loading={true} />
      </div>
    );
  } else {
    return null;
  }
};

export default withTheme()(LoadingIndicator);
