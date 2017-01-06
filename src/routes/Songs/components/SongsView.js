import React from 'react';
import { Row, Column} from 'react-foundation';
import { Paper } from 'material-ui';
import SongsList from '../containers/SongsListContainer';
import ModalBase from '../containers/Modal';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { RaisedButton } from 'material-ui';

import css from './SongsView.scss';

export const SongsView = (props) => (
    <Column small={12}>
      <Paper zDepth={5}>
        <div className={css.songsContainer}>
          <SongsList />
          <ModalBase />
        </div>
      </Paper>
    </Column>
);

SongsView.PropTypes = {
  showAddSongModal: React.PropTypes.func.isRequired
};

export default SongsView;
