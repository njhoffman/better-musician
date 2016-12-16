import React from 'react';
import css from './Settings.scss';

export const Settings = (props) => (
  <div className={css.settingsContainer}>
    <h2>This is the Settings Page</h2>
  </div>
);

Settings.propTypes = {
  settings: React.PropTypes.number.isRequired,
  increment   : React.PropTypes.func.isRequired
};

export default Settings;
