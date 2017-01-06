import React from 'react';
import { Link } from 'react-router';
import DuckImage from '../assets/Duck.jpg';
import { Paper } from 'material-ui';
import { Row, Column} from 'react-foundation';
import css from './HomeView.scss';

export const HomeView = (props) => (
  <Column small={8} centerOnSmall={true}>
    <Paper zDepth={5}>
      <div className={css.homeContainer}>
        <h2>This is the home screen</h2>
        <Link to='/songs' activeClassName='route--active'> Songs</Link>
        <br />
        <Link to='/profile' activeClassName='route--active'> Profile</Link>
        <br />
        <Link to='/login' activeClassName='route--active'> Login</Link>
        <br />
        <Link to='/register' activeClassName='route--active'> Register</Link>
        <br />
        <Link to='/reset' activeClassName='route--active'> Reset</Link>
        <br />
        <Link to='/settings' activeClassName='route--active'> Settings</Link>
      </div>
    </Paper>
  </Column>
);

export default HomeView;
