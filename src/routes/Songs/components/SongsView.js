import React from 'react';
import { Column } from 'react-foundation';
import { Paper } from 'material-ui';
import SongsPagination from './SongsPaginationContainer';
import SongsList from './SongsListContainer';
import FiltersModal from './Filters/FiltersModalContainer';
import AddSongModal from './AddSong/AddSongModalContainer';

import css from './SongsView.scss';

export const SongsView = (props) => (
  <Column small={12} className='songsView'>
    <Paper zDepth={5}>
      <div className={css.songsContainer}>
        <SongsList {...props} />
        <SongsPagination />
        <FiltersModal />
        <AddSongModal />
      </div>
    </Paper>
  </Column>
);

export default SongsView;
