import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Drawer, Divider, withStyles } from '@material-ui/core';

import facebookIcon from 'assets/fb-icon.png';
import googleIcon from 'assets/google-icon.png';
import EmailIcon from '@material-ui/icons/Email';
import SignOutIcon from '@material-ui/icons/Lock';

import { signOut } from 'actions/auth/signout';
import { uiHideDrawerMenu } from 'actions/ui';

import DrawerMenuLink from './DrawerMenuLink';

const styles = (theme) => ({ });

const GoogleIcon = (props) => (
  <img src={googleIcon} style={{ height: '1.75em' }} {...props} />
);
const FacebookIcon = (props) => (
  <img src={facebookIcon} style={{ height: '1.25em' }} {...props} />
);
const SignedOut = ({ isOpen, ...props }) => (
  <Drawer open={isOpen} onClose={props.hideDrawerMenu}>
    <DrawerMenuLink link='/' label='Home' {...props} />
    <DrawerMenuLink link='/login' label='Login' {...props} />
    <DrawerMenuLink link='/register' label='Register' {...props} />
    <DrawerMenuLink link='/reset' label='Reset' {...props} />
    <DrawerMenuLink link='/contact' label='Contact' {...props} />
    <Divider />
    <DrawerMenuLink
      Icon={FacebookIcon}
      label='Facebook Sign In'
      loginLink='facebook'
      {...props}
    />
    <DrawerMenuLink
      Icon={GoogleIcon}
      label='Google Sign In'
      loginLink='google'
      {...props}
    />
    <DrawerMenuLink
      link='/login'
      Icon={EmailIcon}
      label='Email'
      loginLink='email'
      {...props}
    />
  </Drawer>
);

SignedOut.propTypes = {
  hideDrawerMenu : PropTypes.func.isRequired,
  isOpen         : PropTypes.bool.isRequired
};


const SignedIn = ({ isOpen, endpoint, authSignOut, hideDrawerMenu, ...props }) => (
  <Drawer open={isOpen} onClose={hideDrawerMenu}>
    <DrawerMenuLink link='/' label='Home' {...props} />
    <DrawerMenuLink link='/songs' label='Songs' {...props} />
    <DrawerMenuLink link='/profile' label='Profile' {...props} />
    <DrawerMenuLink link='/stats' label='Stats' {...props} />
    <DrawerMenuLink link='/settings' label='Settings' {...props} />
    <DrawerMenuLink link='/fields' label='Fields' {...props} />
    <Divider />
    <DrawerMenuLink
      label='Sign Out'
      Icon={SignOutIcon}
      onClick={() => authSignOut(endpoint).then(hideDrawerMenu).catch(() => {})}
      loginLink
      {...props}
    />
  </Drawer>
);

SignedIn.propTypes = {
  hideDrawerMenu : PropTypes.func.isRequired,
  isOpen         : PropTypes.bool.isRequired,
  authSignOut    : PropTypes.func.isRequired
};


const DrawerMenu = ({
  isSignedIn,
  ...props
}) => (
  <div>
    {isSignedIn && SignedIn(props)}
    {!isSignedIn && SignedOut(props)}
  </div>
);

DrawerMenu.propTypes = {
  isSignedIn     : PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  hideDrawerMenu : uiHideDrawerMenu,
  authSignOut: signOut
};

const mapStateToProps = (state) => ({
  isOpen: state.ui.drawer.isOpen,
  isSignedIn: state.user.isSignedIn,
  endpoint: state.config.auth.currentEndpointKey || state.config.auth.defaultEndpointKey
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DrawerMenu));
