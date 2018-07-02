import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import {
  MuiThemeProvider,
  withStyles,
  Paper
} from '@material-ui/core';
import { Row, Column } from 'react-foundation';

import 'coreStyles';
import Routes from 'routes';
import themes from 'styles/themes';
import ErrorBoundary from 'components/ErrorBoundaries/Main';
import css from './AppContainer.scss';
import Header from 'components/Header/HeaderContainer';
import Footer from 'components/Footer/FooterContainer';
import DrawerMenu from 'components/DrawerMenu/DrawerMenuContainer';
import Snackbar from 'components/Snackbar/SnackbarContainer';

import { init as initLog } from 'shared/logger';
const { info } = initLog('AppContainer');

const theme = themes['steelBlue-dark'];
const styles = {
  appWrapper: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  contentWrapper: {
    width: '100%',
    height: '100%',
    maxHeight: 'calc(100vh - 90px - 75px)',
    overflowY: 'auto',
    position: 'relative',
    // form {
    //   margin: 10px;
    // }
  },
  contentContainer: {
    margin: '0px',
    [theme.breakpoints.up('md')]: {
      margin: '30px 5px'
    },
    [theme.breakpoints.up('sm')]: {
      margin: '10px 5px'
    }
  },
  footerFiller: {
    flexGrow: 1
  }
};

const AppContainer = ({ history, classes, store, ...props }) => (
  <MuiThemeProvider theme={theme} >
    <ConnectedRouter history={history}>
      <div className={classes.appWrapper}>
        <ErrorBoundary>
          <DrawerMenu />
          <Snackbar />
          <Header />
          <div className={classes.contentWrapper} style={{ background: theme.backgroundColor }}>
            <Row horizontalAlignment='center'>
              <Column small={12} medium={10} large={8}>
                <Paper elevation={5} className={classes.contentContainer}>
                  <Routes store={store} history={history} />
                </Paper>
              </Column>
            </Row>
          </div>
          <Footer />
          <div style={{ background: theme.instrumental.footerFiller }} className={classes.footerFiller} />
        </ErrorBoundary>
      </div>
    </ConnectedRouter>
  </MuiThemeProvider>
);

const mapStateToProps = (state) => ({
  theme: state.auth && state.auth.get('user') && state.auth.get('user').get('attributes')
    ? state.auth.get('user').get('attributes').get('visualTheme')
    : 'steelBlue'
});

export default connect(mapStateToProps)(withStyles(styles)(AppContainer));
