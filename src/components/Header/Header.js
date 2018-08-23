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
    alignItems: 'center'
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
    [theme.breakpoints.up('sm')] : {
      flexWrap: 'nowrap'
    }
  },
});

const Header = ({ classes, ...props }) => (
  <AppBar position='static' className={classes.appBar}>
    {props.isSignedIn && isWidthUp('sm', props.width) && (
      <Toolbar className={classes.toolbar}>
        <HeaderLeft {...props} />
        <HeaderControls {...props} />
        <HeaderRight {...props} />
      </Toolbar>
    )}
    {props.isSignedIn && !isWidthUp('sm', props.width) && (
      <Toolbar className={classes.toolbar}>
        <HeaderLeft {...props} />
        <HeaderRight {...props} />
        <HeaderControls {...props} />
      </Toolbar>
    )}
    {!props.isSignedIn && (
      <Toolbar className={classes.toolbar}>
        <HeaderLeft {...props} />
        <HeaderRight {...props} />
      </Toolbar>
    )}
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isSignedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isSignedIn: state.user.isSignedIn
});

export default connect(mapStateToProps)(withStyles(styles)(withWidth()(Header)));
