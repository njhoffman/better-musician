import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ConnectedRouter } from 'react-router-redux';

import { Row } from 'react-foundation';

import 'coreStyles';
import ErrorBoundary from 'components/ErrorBoundaries/Main';
import css from './AppContainer.scss';
import Header from 'components/Header/HeaderContainer';
import Footer from 'components/Footer/FooterContainer';
import DrawerMenu from 'components/DrawerMenu/DrawerMenuContainer';
import Snackbar from 'components/Snackbar/SnackbarContainer';
import Routes from 'routes';
import themes from 'styles/themes';

import { init as initLog } from 'shared/logger';
const { info } = initLog('AppContainer');

const theme = themes['steelBlue-dark'];

class AppContainer extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme} >
        <ConnectedRouter history={this.props.history}>
          <div className={css.appWrapper}>
            <ErrorBoundary>
              <DrawerMenu />
              <Snackbar />
              <Header />
              <div className={css.contentWrapper} style={{ background: theme.backgroundColor }}>
                <Row horizontalAlignment='center'>
                  <Routes store={this.props.store} />
                </Row>
              </div>
              <Footer />
              <div style={{ background: theme.instrumental.footerFiller }} className={css.footerFiller} />
            </ErrorBoundary>
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.auth && state.auth.get('user') && state.auth.get('user').get('attributes')
    ? state.auth.get('user').get('attributes').get('visualTheme')
    : 'steelBlue'
});

export default connect(mapStateToProps)(AppContainer);
