import React from 'react';
import { Dialog, Paper } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { AuthGlobals } from 'redux-auth/material-ui-theme';

import 'coreStyles';
import css from './CoreLayout.scss';
import Header from 'containers/HeaderContainer';
import Footer from 'containers/FooterContainer';
import DrawerMenu from 'containers/DrawerMenuContainer';
import instrumentalDarkTheme from 'themes/instrumentalDark';
import { Row } from 'react-foundation';

const style = {
  margin: 15

};
export const CoreLayout = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(instrumentalDarkTheme)}>
    <div className={css.appWrapper}>
      {AuthGlobals}
      <DrawerMenu />
      <Header />
      <Row className={css.contentWrapper}>
        <Paper style={style} zDepth={5}>
          {children}
        </Paper>
      </Row>
      <Footer />
    </div>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
