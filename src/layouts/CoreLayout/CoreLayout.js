import React from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import 'coreStyles';
import css from './CoreLayout.scss';
import Header from 'containers/Header';
import ModalBase from 'containers/Modal/ModalBase';
import instrumentalDarkTheme from 'themes/instrumentalDark';
import { Row } from 'react-foundation';

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(instrumentalDarkTheme)}>
    <div className={css.appWrapper}>
      <Header />
      <Row className={css.contentWrapper}>
        {children}
      </Row>
      <ModalBase />
    </div>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
