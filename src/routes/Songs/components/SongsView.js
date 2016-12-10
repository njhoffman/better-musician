import React from 'react';

import { Row, Column} from 'react-foundation';
import css from './SongsView.scss';
import SongsList from '../containers/SongsList';

export const SongView = (props) => (
    <Column small={11} className={css.home}>
      <SongsList />
    </Column>
);

export default SongView;
