import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  AppBar,
  Toolbar
} from '@material-ui/core';

import HeaderLeft from './HeaderLeft';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';

const styles = {
  Toolbar: {
    alignItems: 'stretch',
    minHeight: 'fit-content'
  }
};

const Header = ({ classes, ...props }) => (
  <AppBar position='static'>
    {props.isSignedIn && (
      <Toolbar className={classes.Toolbar}>
        <HeaderLeft {...props} />
        <HeaderMiddle {...props} />
        <HeaderRight {...props} />
      </Toolbar>
    )}
    {!props.isSignedIn && (
      <Toolbar className={classes.Toolbar}>
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

export default connect(mapStateToProps)(withStyles(styles)(Header));
