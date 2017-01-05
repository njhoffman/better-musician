import React from 'react';
import css from './SettingsView.scss';

export const SettingsView = (props) => (
  <div className={css.settingsContainer}>
    <h2>This is the Settings Page</h2>
  </div>
);

SettingsView.propTypes = {
  settings: React.PropTypes.number.isRequired,
  increment   : React.PropTypes.func.isRequired
};

export default SettingsView;
