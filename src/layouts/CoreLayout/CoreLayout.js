import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Row } from 'react-foundation';
import { AuthGlobals } from 'redux-auth/material-ui-theme';

import 'coreStyles';
import css from './CoreLayout.scss';
import Header from 'components/Header/HeaderContainer';
import Footer from 'components/Footer/FooterContainer';
import DrawerMenu from 'components/DrawerMenu/DrawerMenuContainer';
import Snackbar from 'components/Snackbar/SnackbarContainer';
import { init as initLog } from 'shared/logger';

const { info } = initLog('coreLayout');

// export const CoreLayout = ({ getState }) => ({ children }) => {

export class CoreLayout extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired
  }

  processTheme() {
    const theme = require('themes/' + this.props.theme).default;
    if (!theme.instrumental) {
      theme.instrumental = {};
    }
    theme.instrumental.headerLinksColor = theme.instrumental.headerLinksColor || theme.palette.secondaryTextColor;
    theme.instrumental.footerFiller = theme.instrumental.footerFiller || theme.palette.canvasColor;
    theme.instrumental.fieldsViewLabel = theme.instrumental.fieldsViewLabel || theme.palette.accent1Color;
    return theme;
  }

  humanMemorySize(bytes, si) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }

  memoryStats() {
    if (window.performance && window.performance.memory) {
      info(`Total JS Heap Size:  ${this.humanMemorySize(window.performance.memory.totalJSHeapSize, true)}`);
      info(`Used JS Heap Size:   ${this.humanMemorySize(window.performance.memory.usedJSHeapSize, true)}`);
    }
  }

  render() {
    const theme = this.processTheme();
    this.memoryStats();
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div className={css.appWrapper}>
          <AuthGlobals />
          <DrawerMenu />
          <Snackbar />
          <Header />
          <div className={css.contentWrapper} style={{ background: theme.backgroundColor }}>
            <Row>
              {this.props.children}
            </Row>
          </div>
          <Footer />
          <div
            style={{ background: theme.instrumental.footerFiller }}
            className={css.footerFiller} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.auth && state.auth.get('user') && state.auth.get('user').get('attributes')
  ? state.auth.get('user').get('attributes').get('visualTheme')
  : 'steelBlue-dark'
});

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
};

export default connect(mapStateToProps)(CoreLayout);
