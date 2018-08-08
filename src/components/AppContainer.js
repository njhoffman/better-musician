import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { Row } from 'react-foundation';

import 'coreStyles';
import Routes from 'routes';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/FooterContainer';
import DrawerMenu from 'components/DrawerMenu/DrawerMenu';
import Snackbar from 'components/Snackbar/SnackbarContainer';

// import { init as initLog } from 'shared/logger';
// const { info } = initLog('AppContainer');

const styles = (theme) => ({
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
    background: theme.backgroundColor
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
    flexGrow: 1,
    background: theme.instrumental.footerFiller
  }
});

const AppContainer = ({
  history,
  classes: { appWrapper, contentWrapper, contentContainer, footerFiller },
  store,
  ...props
}) => (
  <div className={appWrapper}>
    <DrawerMenu />
    <Snackbar />
    <Header />
    <div className={contentWrapper}>
      <Row horizontalAlignment='center'>
        <Routes store={store} history={history} classes={ contentContainer } />
      </Row>
    </div>
    <Footer />
    <div className={footerFiller} />
  </div>
);

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  store:   PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  theme: state.auth && state.auth.get('user') && state.auth.get('user').get('attributes')
    ? state.auth.get('user').get('attributes').get('visualTheme')
    : 'steelBlue'
});
import { withRouter } from 'react-router';

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AppContainer)));
