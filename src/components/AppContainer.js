import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import { Row } from 'react-foundation';

import 'coreStyles';
import Routes from 'routes/Routes';
import Header from 'components/Header/Header';
import DevToolbar from 'components/DevTools/Toolbar';
import Footer from 'components/Footer/Footer';
import DrawerMenu from 'components/DrawerMenu/DrawerMenu';
import Snackbar from 'components/Snackbar/Snackbar';
import ErrorBoundary from 'components/ErrorBoundaries/Main';
import { onError } from 'utils/app';

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
    background: theme.backgroundColor,
    maxWidth: 'none',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    maxHeight: `calc(100vh - ${theme.app.headerHeight})`,
    overflowY: 'auto',
    position: 'relative',
    '&.Profile': {
      // maxHeight: `calc(100vh - (2 * ${theme.app.headerHeight}))`,
    },
    '&.Fields': {
      // maxHeight: `calc(100vh - (2 * ${theme.app.headerHeight}))`,
    },
    '&.Songs': {
      maxHeight: `calc(100vh - ${theme.app.headerHeight} - ${theme.app.footerHeight})`,
      [theme.breakpoints.down('sm')]: {
        maxHeight: `calc(100vh - (${theme.app.headerHeight} * 1.6) - ${theme.app.footerHeight})`,
      }
    },
  },
  contentContainer: {
    maxWidth: '1000px',
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  footerFiller: {
    flexGrow: 1,
    background: theme.app.footerFiller
  }
});

const AppContainer = ({
  history,
  currentView,
  classes: { appWrapper, contentWrapper, contentContainer, footerFiller },
  devToolbarVisible,
  store,
  ...props
}) => (
  <ErrorBoundary onError={onError}>
    <div className={appWrapper}>
      <Snackbar disableWindowBlurListener={false} />
      <DrawerMenu />
      <Header />
      <Row horizontalAlignment='center' className={`${contentWrapper} ${currentView}`}>
        <div className={contentContainer}>
          <Routes
            store={store}
            history={history}
            contentClass={contentContainer}
          />
        </div>
      </Row>
      <Footer />
      <div className={footerFiller} />
    </div>
    {devToolbarVisible && <DevToolbar visible={devToolbarVisible} />}
  </ErrorBoundary>
);

AppContainer.defaultProps = {
  currentView: '',
};

AppContainer.propTypes = {
  history           : PropTypes.instanceOf(Object).isRequired,
  store             : PropTypes.instanceOf(Object).isRequired,
  classes           : PropTypes.instanceOf(Object).isRequired,
  currentView       : PropTypes.string,
  devToolbarVisible : PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  currentView       : _.get(state, 'ui.currentView'),
  devToolbarVisible : _.get(state, 'config.dev.toolbar.show')
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
)(AppContainer);
