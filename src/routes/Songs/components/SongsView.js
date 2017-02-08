import React from 'react';
import { Column } from 'react-foundation';
import { Paper } from 'material-ui';
import SongsPagination from './SongsPaginationContainer';
import SongsList from './SongsListContainer';
import ModalBase from './Modal';

import css from './SongsView.scss';

export const SongsView = (props) => (
  <Column small={12}>
    <Paper zDepth={5}>
      <div className={css.songsContainer}>
        <SongsList {...props} />
        <SongsPagination />
        <ModalBase />
      </div>
    </Paper>
  </Column>
);

export default SongsView;
