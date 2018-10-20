import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  AppBar,
  Toolbar
} from '@material-ui/core';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import HeaderLeft from './HeaderLeft';
import HeaderControls from './HeaderControls';
import HeaderRight from './HeaderRight';

const styles = (theme) => ({
  appBar: {
    alignItems: 'center',
    height: theme.app.headerHeight
  },
  songView: {
    [theme.breakpoints.down('sm')]: {
      height: `calc(${theme.app.headerHeight} * 5/3)`
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 'fit-content',
    maxWidth: '900px',
    width: '100%',
    paddingRight: '0px',
    paddingLeft: '0px',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')] : {
      flexWrap: 'nowrap'
    }
  },
});

const Header = ({ classes, currentView, isSignedIn, width, ...props }) => (
  <AppBar
    position='static'
    className={`${classes.appBar} ${currentView === 'Songs' ? classes.songView : ''}`}>
    {isSignedIn && isWidthUp('md', width) && (
      <Toolbar className={classes.toolbar}>
        <HeaderLeft {...props} />
        <HeaderControls {...props} />
        <HeaderRight {...props} />
      </Toolbar>
    )}
    {isSignedIn && !isWidthUp('md', width) && (
      <Toolbar className={classes.toolbar}>
        <HeaderLeft {...props} />
        <HeaderRight {...props} />
        {currentView === 'Songs' && (<HeaderControls {...props} />)}
      </Toolbar>
    )}
    {!isSignedIn && (
      <Toolbar className={classes.toolbar}>
        <HeaderLeft {...props} />
        <HeaderRight {...props} />
      </Toolbar>
    )}
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string,
    appBar: PropTypes.string
  }).isRequired,
  isSignedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isSignedIn: state.user.isSignedIn,
  currentView: state.ui.currentView
});

export default connect(mapStateToProps)(withStyles(styles)(withWidth()(Header)));
