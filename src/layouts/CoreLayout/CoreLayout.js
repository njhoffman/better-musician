import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import 'coreStyles';
import css from './CoreLayout.scss';
import Header from 'components/Header';
import instrumentalDarkTheme from 'themes/instrumentalDark';

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(instrumentalDarkTheme)}>
    <div className={css.appWrapper}>
      <Header />
      <div className={css.appContent}>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
