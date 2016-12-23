import React from 'react';
import { Link } from 'react-router';
import DuckImage from '../assets/Duck.jpg';

import { Row, Column} from 'react-foundation';
import css from './HomeView.scss';

export const HomeView = (props) => (
    <Column small={11} className={css.home}>
      <p>This is the home screen</p>
        <Link to='/songs' activeClassName='route--active'>
          Songs
        </Link>

    </Column>
);

export default HomeView;
