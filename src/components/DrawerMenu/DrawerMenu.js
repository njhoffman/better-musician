import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Divider, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';
import withTheme from 'material-ui/styles/withTheme';

// import { OAuthSignInButton } from 'redux-auth/material-ui-theme';
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
  display: 'inline-block',
  textAlign: 'center',
  textTransform: 'uppercase',
  textDecoration: 'none'
};

export class DrawerMenu extends Component {
  static propTypes = {
    hideDrawerMenu: PropTypes.func.isRequired,
    isOpen:         PropTypes.bool.isRequired,
    user:           PropTypes.object,
    theme:          PropTypes.object.isRequired
  };

  renderSignedIn() {
    return (
      <div className={css.drawerMenuContainer} >
        <Drawer
          open={this.props.isOpen}
          onClose={this.props.hideDrawerMenu}>
          <MenuItem>
            <Link
              to='/'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/songs'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Song List
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/profile'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/stats'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Statistics
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/settings'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Settings
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/fields'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
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
                // browserHistory.push('/');
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
      <div className={css.drawerMenuContainer} >
        <Drawer
          open={this.props.isOpen}
          onClose={this.props.hideDrawerMenu}>
          <MenuItem>
            <Link
              to='/'
              style={linkStyle}
              onClick={this.props.hideDrawerMenu}>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/register'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Register
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/reset'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Reset Password
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/contact'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Contact Support
            </Link>
          </MenuItem>
          <Divider />
          {/* <OAuthSignInButton */}
          {/*   style={{ width: '245px', margin: '5px 0px 5px 5px' }} */}
          {/*   backgroundColor={'#4c69ba'} */}
          {/*   labelColor={'#ffffff'} */}
          {/*   icon={facebookIconComponent} */}
          {/*   provider='facebook'> */}
          {/*   Sign In With Facebook */}
          {/* </OAuthSignInButton> */}
          {/* <OAuthSignInButton */}
          {/*   style={{ width: '245px', margin: '0px 0px 5px 5px' }} */}
          {/*   backgroundColor={'#4285f4'} */}
          {/*   labelColor={'#ffffff'} */}
          {/*   icon={googleIconComponent} */}
          {/*   provider='google'> */}
          {/*   Sign In With Google */}
          {/* </OAuthSignInButton> */}

          {/* icon={googleIconComponent} */}
          <Link to='/profile'>
            <ButtonLoader
              onClick={() => { this.props.hideDrawerMenu(); }}
              label='Sign In With Email' />
          </Link>
        </Drawer>
      </div>
    );
  }

  render() {
    const isSignedIn = this.props.user && this.props.user.get('isSignedIn');
    linkStyle = { ...linkStyle, ...{ color: this.props.theme.instrumental.headerLinksColor } };
    if (isSignedIn) {
      return this.renderSignedIn();
    } else {
      return this.renderSignedOut();
    }
  }
}

export default withTheme()(DrawerMenu);
