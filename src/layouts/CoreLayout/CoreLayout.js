import React from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import 'coreStyles';
import css from './CoreLayout.scss';
import Header from 'containers/HeaderContainer';
import DrawerMenu from 'containers/DrawerMenuContainer';
import instrumentalDarkTheme from 'themes/instrumentalDark';
import { Row } from 'react-foundation';

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(instrumentalDarkTheme)}>
    <div className={css.appWrapper}>
      <DrawerMenu />
      <Header />
      <Row className={css.contentWrapper}>
        {children}
      </Row>
    </div>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
