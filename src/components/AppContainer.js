import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ConnectedRouter } from 'react-router-redux';

import { Row } from 'react-foundation';

import 'coreStyles';
import css from './AppContainer.scss';
import Header from 'components/Header/HeaderContainer';
import Footer from 'components/Footer/FooterContainer';
import DrawerMenu from 'components/DrawerMenu/DrawerMenuContainer';
import Snackbar from 'components/Snackbar/SnackbarContainer';
import Routes from 'routes'
import processTheme from 'styles/themes';

import { init as initLog } from 'shared/logger';
const { info } = initLog('AppContainer');

const theme = processTheme();

class AppContainer extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <MuiThemeProvider theme={theme} >
        <ConnectedRouter history={this.props.history}>
          <div className={css.appWrapper}>
            <DrawerMenu />
            <Snackbar />
            <Header />
            <div className={css.contentWrapper} style={{background: theme.backgroundColor}}>
              <Row horizontalAlignment='center'>
                <Routes />
              </Row>
            </div>
            <Footer />
            <div style={{ background: theme.instrumental.footerFiller }} className={css.footerFiller} />
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
