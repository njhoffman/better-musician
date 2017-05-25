import React from 'react';
import { connect } from 'react-redux';
import { Column } from 'react-foundation';
import { Paper } from 'material-ui';
import SongsPagination from './SongsPagination';
import SongsList from './SongsList';
import FiltersModal from './Filters/FiltersModal';
import AddSongModal from './AddSong/AddSongModal';

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

const mapActionCreators = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapActionCreators)(SongsView);
