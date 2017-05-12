import React, { Component, PropTypes } from 'react';
import { Drawer, Divider, MenuItem } from 'material-ui';
import { Link, browserHistory } from 'react-router';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { OAuthSignInButton } from 'redux-auth/material-ui-theme';
import SignOutButton from 'components/SignOutButton';
import ButtonLoader from 'components/ButtonLoader';
import facebookIcon from 'assets/fb-icon.png';
import googleIcon from 'assets/google-icon.png';
import css from './DrawerMenu.scss';

const googleIconComponent = () =>
  <img
    src={googleIcon}
    style={{ marginTop: '-10px', maxWidth: '30px', width: '30px', height: '30px' }} />;

const facebookIconComponent = () =>
  <img
    src={facebookIcon}
    style={{ marginTop: '-10px', width: '20px', maxWidth: '20px' }} />;

let linkStyle = {
  width: '100%',
  display: 'inline-block'
};

export class DrawerMenu extends Component {
  static propTypes = {
    hideDrawerMenu: PropTypes.func.isRequired,
    isOpen:         PropTypes.bool.isRequired,
    user:           PropTypes.object.isRequired,
    muiTheme:       PropTypes.object.isRequired
  };

  renderSignedIn() {
    return (
      <div className={css.drawerMenuContainer}>
        <Drawer
          open={this.props.isOpen}
          docked={false}
          onRequestChange={this.props.hideDrawerMenu}>
          <MenuItem>
            <Link
              to='/'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}
              activeClassName='active'>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/songs'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}
              activeClassName='active'>
              Song List
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/profile'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}
              activeClassName='active'>
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/stats'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}
              activeClassName='active'>
              Statistics
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/settings'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}
              activeClassName='active'>
              Settings
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/fields'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}
              activeClassName='active'>
              Field Builder
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem>
            <SignOutButton
              flatButton
              label='LOGOUT'
              next={() => {
                this.props.hideDrawerMenu();
                browserHistory.push('/');
              }}
              style={{ backgroundColor: 'transparent', width: '100%' }}
            />
          </MenuItem>
        </Drawer>
      </div>
    );
  }

  renderSignedOut() {
    return (
      <div>
        <Drawer
          open={this.props.isOpen}
          docked={false}
          onRequestChange={this.props.hideDrawerMenu}>
          <MenuItem>
            <Link
              to='/'
              style={linkStyle}
              onClick={this.props.hideDrawerMenu}
              activeClassName='active'>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/register'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}
              activeClassName='active'>
              Register
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/reset'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}
              activeClassName='active'>
              Reset Password
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/contact'
              onClick={this.props.hideDrawerMenu}
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
            provider='facebook'>
            Sign In With Facebook
          </OAuthSignInButton>
          <OAuthSignInButton
            style={{ width: '245px', margin: '0px 0px 5px 5px' }}
            backgroundColor={'#4285f4'}
            labelColor={'#ffffff'}
            icon={googleIconComponent}
            provider='google'>
            Sign In With Google
          </OAuthSignInButton>
          <Link
            to='/profile'
            activeClassName='active'>
            <ButtonLoader
              icon={googleIconComponent}
              onClick={() => {
                this.props.hideDrawerMenu();
                browserHistory.push('/login');
              }}
              backgroundColor={'#ffffff'}
              labelColor={'#000000'}
              style={{ width: '245px', margin: '0px 0px 5px 5px' }}>
              Sign In With Email
            </ButtonLoader>
          </Link>
        </Drawer>
      </div>
    );
  }

  render() {
    const isSignedIn = this.props.user && this.props.user.get('isSignedIn');
    linkStyle.color = this.props.muiTheme.instrumental.headerLinksColor;
    if (isSignedIn) {
      return this.renderSignedIn();
    } else {
      return this.renderSignedOut();
    }
  }
}

export default muiThemeable()(DrawerMenu);
