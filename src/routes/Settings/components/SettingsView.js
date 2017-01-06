import React from 'react';
import css from './SettingsView.scss';
import { Paper } from 'material-ui';
import { Row, Column } from 'react-foundation';

export const SettingsView = (props) => (
  <Column small={8} centerOnSmall={true}>
    <Paper zDepth={5}>
      <div className={css.settingsContainer}>
        <h2>This is the Settings Page</h2>
      </div>
    </Paper>
  </Column>
);

SettingsView.propTypes = {
  settings: React.PropTypes.number.isRequired,
  increment   : React.PropTypes.func.isRequired
};

export default SettingsView;
