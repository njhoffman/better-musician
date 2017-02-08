import React from 'react';
import { Link } from 'react-router';
import { Paper } from 'material-ui';
import { Column } from 'react-foundation';

export const ResetView = (props) => (
  <Column centerOnSmall small={8}>
    <Paper zDepth={5}>
      <p>This is the home screen</p>
      <Link to='/songs' activeClassName='route--active'>
        Songs
      </Link>
    </Paper>
  </Column>
);

export default ResetView;
