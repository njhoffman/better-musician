import React, { Component } from 'react';
import { Drawer, Divider, MenuItem } from 'material-ui';
import { Link, IndexLink } from 'react-router';

import OAuthSignInButton from 'components/OAuthSignInButton'
import SignOutButton from 'components/SignOutButton';
import ButtonLoader from 'components/ButtonLoader';
import facebookIcon from 'assets/fb-icon.png';
import googleIcon from 'assets/google-icon.png';

const googleIconComponent =
  <img
    src={googleIcon}
    style={{marginTop: '-10px', maxWidth: '30px', width: '30px', height: '30px' }} />;
const facebookIconComponent =
  <img
    src={facebookIcon}
    style={{marginTop: '-10px', width: '20px', maxWidth: '20px' }} />;


const linkStyle = {
  width: "100%",
  display: 'inline-block'
}

const renderSignedIn = (props) => (
  <div>
    <Drawer
      open={props.isOpen}
      docked={false}
      onRequestChange={props.hideDrawerMenu}>
      <MenuItem>
        <Link
          to='/'
          onClick={props.hideDrawerMenu}
          style={linkStyle}
          activeClassName='active'>
          Home
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to='/songs'
          onClick={props.hideDrawerMenu}
          style={linkStyle}
          activeClassName='active'>
          Songs
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to='/settings'
          onClick={props.hideDrawerMenu}
          style={linkStyle}
          activeClassName='active'>
          Settings
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to='/profile'
          onClick={props.hideDrawerMenu}
          style={linkStyle}
          activeClassName='active'>
          Profile
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <SignOutButton
          flatButton={true}
          label='LOGOUT'
          style={{ backgroundColor: 'transparent', width: '100%' }}
        />
      </MenuItem>
    </Drawer>
  </div>
);
const renderSignedOut = (props) => (
  <div>
    <Drawer
      open={props.isOpen}
      docked={false}
      onRequestChange={props.hideDrawerMenu}>
      <MenuItem>
        <Link
          to='/'
          style={linkStyle}
          onClick={props.hideDrawerMenu}
          activeClassName='active'>
          Home
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to='/register'
          onClick={props.hideDrawerMenu}
          style={linkStyle}
          activeClassName='active'>
          Register
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to='/reset'
          onClick={props.hideDrawerMenu}
          style={linkStyle}
          activeClassName='active'>
          Reset Password
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to='/contact'
          onClick={props.hideDrawerMenu}
          style={linkStyle}
          activeClassName='active'>
          Contact Support
        </Link>
      </MenuItem>
      <Divider />
      <OAuthSignInButton
        style={{ width: '245px', margin: '5px 0px 5px 5px' }}
        backgroundColor={'#4c69ba'}
        labelColor={'#ffffff'}
        icon={facebookIconComponent}
        provider="facebook">
        Sign In With Facebook
      </OAuthSignInButton>
      <OAuthSignInButton
        style={{ width: '245px', margin: '0px 0px 5px 5px' }}
        backgroundColor={'#4285f4'}
        labelColor={'#ffffff'}
        icon={googleIconComponent}
        provider="google">
        Sign In With Google
      </OAuthSignInButton>
      <Link
        to='/profile'
        onClick={props.hideDrawerMenu}
        activeClassName='active'>
        <ButtonLoader
          icon={googleIconComponent}
          backgroundColor={'#ffffff'}
          labelColor={'#000000'}
          style={{ width: '245px', margin: '0px 0px 5px 5px' }}>
          Sign In With Email
        </ButtonLoader>
      </Link>
    </Drawer>
  </div>
);

class DrawerMenu extends Component {
  render() {
    const { props } = this;
    const isSignedIn = props.user && props.user.get('isSignedIn');
    if (isSignedIn) {
      return renderSignedIn(props);
    } else {
      return renderSignedOut(props);
    }
  }
}


export default DrawerMenu;
