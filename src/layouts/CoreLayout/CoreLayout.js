import React from 'react';
import { Paper } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import 'coreStyles';
import css from './CoreLayout.scss';
import AuthGlobals from 'components/AuthGlobals';
import Header from 'components/Header/HeaderContainer';
import Footer from 'components/Footer/FooterContainer';
import DrawerMenu from 'components/DrawerMenu/DrawerMenuContainer';
import instrumentalDarkTheme from 'themes/instrumentalDark';
import { Row } from 'react-foundation';

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(instrumentalDarkTheme)}>
    <div className={css.appWrapper}>
      <AuthGlobals />
      <DrawerMenu />
      <Header />
      <Row className={css.contentWrapper}>
        {children}
      </Row>
      <Footer />
    </div>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
