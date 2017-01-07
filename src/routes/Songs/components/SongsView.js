import React from 'react';
import { Row, Column} from 'react-foundation';
import { Paper } from 'material-ui';
import SongsList from '../containers/SongsListContainer';
import ModalBase from '../containers/Modal';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { RaisedButton } from 'material-ui';
import { UserAuthWrapper }  from 'redux-auth-wrapper';
import { updateLocation } from 'store/location';

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

const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.get('user').toJS(), // how to get the user state
    redirectAction: updateLocation, // the redux action to dispatch for redirect
    wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

export default UserIsAuthenticated(SongsView);
