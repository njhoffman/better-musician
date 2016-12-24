import React from 'react';

import { Row, Column} from 'react-foundation';
import css from './SongsView.scss';
import SongsList from '../containers/SongsListContainer';
import ModalBase from '../containers/Modal';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { RaisedButton } from 'material-ui';

export const SongView = (props) => (
    <Column small={12} className={css.home}>
      <SongsList />
      <ModalBase />
    </Column>
);

SongView.PropTypes = {
  showAddSongModal: React.PropTypes.func.isRequired
};

export default muiThemeable()(SongView);
