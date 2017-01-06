import React from 'react';
import { Link } from 'react-router';
import { Paper } from 'material-ui';

import { Row, Column} from 'react-foundation';
import css from './ResetView.scss';

export const ResetView = (props) => (
  <Column small={8} centerOnSmall={true}>
    <Paper zDepth={5}>
      <p>This is the home screen</p>
      <Link to='/songs' activeClassName='route--active'>
        Songs
      </Link>
    </Paper>
  </Column>
);

export default HomeView;
