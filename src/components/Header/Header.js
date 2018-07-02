import React, { Component }  from 'react';
import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';
import {
  withStyles,
  AppBar,
  Toolbar
} from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';

import HeaderLeft from './HeaderLeftContainer';
import HeaderMiddle from './HeaderMiddleContainer';
import HeaderRight from './HeaderRightContainer';

const styles = {
  Toolbar: {
    alignItems: 'stretch'
  }
};

export class Header extends Component {
  render() {
    const { classes, ...props } = this.props;
    if (props.isSignedIn) {
      return (
        <AppBar position='static'>
          <Toolbar className={classes.Toolbar}>
            <HeaderLeft {...props} />
            <HeaderMiddle {...props} />
            <HeaderRight {...props} />
          </Toolbar>
        </AppBar>
      );
    } else {
      return (
        <AppBar position='static'>
          <Toolbar>
            <HeaderLeft {...props} />
            <HeaderRight {...props} />
          </Toolbar>
        </AppBar>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  isSignedIn: state.user.isSignedIn
});

export default connect(mapStateToProps)(withStyles(styles)(Header));
