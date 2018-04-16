import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import { Row } from 'react-foundation';

import 'coreStyles';
import css from 'styles/layout.scss';
import Header from 'components/Header/HeaderContainer';
// import Footer from 'components/Footer/FooterContainer';
import DrawerMenu from 'components/DrawerMenu/DrawerMenuContainer';
// import Snackbar from 'components/Snackbar/SnackbarContainer';

import HomeView from 'routes/Home';
import ResetView from 'routes/Reset';

import { init as initLog } from 'shared/logger';
const { info } = initLog('AppContainer');

const history = createHistory();

const steelTheme = require('themes/steelBlue-dark').default;

class AppContainer extends Component {

  shouldComponentUpdate() {
    return false;
  }

  processTheme() {
    console.info('Theme', this.props.theme);
    // const theme = require('themes/' + this.props.theme).default;
    const theme = steelTheme;
    if (!theme.instrumental) {
      theme.instrumental = {};
    }
    theme.instrumental.headerLinksColor = theme.instrumental.headerLinksColor || theme.palette.secondaryTextColor;
    theme.instrumental.footerFiller = theme.instrumental.footerFiller || theme.palette.canvasColor;
    theme.instrumental.fieldsViewLabel = theme.instrumental.fieldsViewLabel || theme.palette.accent1Color;
    return theme;
  }

  render() {
    const theme = this.processTheme();
    console.info('theme 3', theme);
    return (
      <MuiThemeProvider theme={createMuiTheme(theme)} >
        <ConnectedRouter history={history}>
          <div className={css.appWrapper}>
            {/* <AuthGlobals /> */}
            <DrawerMenu />
            {/* <Snackbar /> */}
            <Header />
            <div className={css.contentWrapper} style={{ background: theme.backgroundColor }}>
              <Row>
                <Switch>
                  <Route exact path='/' component={HomeView} />
                  <Route exact path='/reset' component={ResetView} />
                </Switch>
              </Row>
            </div>
            {/* <Footer /> */}
            <div
              style={{ background: theme.instrumental.footerFiller }}
              className={css.footerFiller} />
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.auth && state.auth.get('user') && state.auth.get('user').get('attributes')
    ? state.auth.get('user').get('attributes').get('visualTheme')
    : 'steelBlue-dark'
});

export default connect(mapStateToProps)(AppContainer);
