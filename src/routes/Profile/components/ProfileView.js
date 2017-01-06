import React from 'react';
import { Paper } from 'material-ui';
import { Row, Column } from 'react-foundation';
import css from './ProfileView.scss';

export const ProfileView = (props) => (
  <Column small={8} centerOnSmall={true}>
    <Paper zDepth={5}>
      <div className={css.profileContainer}>
        <h2>This is the Profile Page</h2>
      </div>
    </Paper>
  </Column>
);

export default ProfileView;
