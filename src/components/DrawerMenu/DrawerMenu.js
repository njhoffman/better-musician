import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Drawer, Divider, withStyles } from '@material-ui/core';

import facebookIcon from 'assets/fb-icon.png';
import googleIcon from 'assets/google-icon.png';
import { Email as EmailIcon, Lock as SignOutIcon } from '@material-ui/icons';

import { signOut } from 'actions/auth/signout';
import { uiHideDrawerMenu } from 'actions/ui';

import DrawerMenuLink from './DrawerMenuLink';

const styles = (theme) => ({ });

const GoogleIcon = () => (<img src={googleIcon} style={{ height: '1.75em' }} />);
const FacebookIcon = () => (<img src={facebookIcon} style={{ height: '1.25em'}} />);

const SignedOut = ({ isOpen, ...props }) => (
  <Drawer open={isOpen} onClose={props.hideDrawerMenu}>
    <DrawerMenuLink link='/' label='Home' {...props} />
    <DrawerMenuLink link='/login' label='Login' {...props} />
    <DrawerMenuLink link='/register' label='Register' {...props} />
    <DrawerMenuLink link='/reset' label='Reset' {...props} />
    <DrawerMenuLink link='/contact' label='Contact' {...props} />
    <Divider />
    <DrawerMenuLink Icon={FacebookIcon} label='Facebook Sign In' loginLink {...props} />
    <DrawerMenuLink Icon={GoogleIcon} label='Google Sign In' loginLink {...props} />
    <DrawerMenuLink link='/login' Icon={EmailIcon} label='Email' loginLink {...props} />
  </Drawer>
);

SignedOut.propTypes = {
  hideDrawerMenu : PropTypes.func.isRequired,
  isOpen         : PropTypes.bool.isRequired
};


const SignedIn = ({ isOpen, endpoint, signOut, hideDrawerMenu, ...props }) => (
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
      onClick={() => signOut(endpoint).then(hideDrawerMenu).catch(() => {}) }
      loginLink
      {...props}
    />
  </Drawer>
);

SignedIn.propTypes = {
  hideDrawerMenu : PropTypes.func.isRequired,
  isOpen         : PropTypes.bool.isRequired
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
  signOut
};

const mapStateToProps = (state) => ({
  isOpen: state.ui.drawer.isOpen,
  isSignedIn: state.user.isSignedIn,
  endpoint: state.config.auth.currentEndpointKey || state.config.auth.defaultEndpointKey
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DrawerMenu));
