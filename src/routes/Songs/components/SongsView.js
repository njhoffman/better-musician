import React from 'react';

import { Row, Column} from 'react-foundation';
import css from './SongsView.scss';
import SongsList from '../containers/SongsListContainer';
import ModalBase from '../containers/Modal';

export const SongView = (props) => (
    <Column small={11} className={css.home}>
      <SongsList />
      <ModalBase />
    </Column>
);

export default SongView;
