import React from 'react';
import DuckImage from '../assets/Duck.jpg';

import { Row, Column} from 'react-foundation';
import css from './HomeView.scss';

export const HomeView = (props) => (
    <Column small={11} className={css.home}>
      <p>This is the home screen</p>
    </Column>
);

export default HomeView;
