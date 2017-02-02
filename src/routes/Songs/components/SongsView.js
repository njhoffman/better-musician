import React from 'react';
import { Row, Column} from 'react-foundation';
import { Paper } from 'material-ui';
import SongsPagination from './SongsPaginationContainer';
import SongsList from './SongsListContainer';
import ModalBase from './Modal';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { RaisedButton } from 'material-ui';
import { UserAuthWrapper }  from 'redux-auth-wrapper';
import { updateLocation } from 'store/location';

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
