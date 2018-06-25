import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Divider, MenuItem } from 'material-ui';
import { NavLink } from 'react-router-dom';
import withTheme from 'material-ui/styles/withTheme';
import config from 'data/config';

import OAuthSignInButton from 'components/OAuthSignInButton';
import SignOutButton from 'components/SignOutButton';
import Button from 'components/Button';
import facebookIcon from 'assets/fb-icon.png';
import googleIcon from 'assets/google-icon.png';
import EmailIcon from 'material-ui-icons/Email';
import css from './DrawerMenu.scss';

const googleIconComponent =
  <img
    src={googleIcon}
    style={{ position: 'absolute', left: '15px', width: '25px', height: '25px' }} />;

const facebookIconComponent =
  <img
    src={facebookIcon}
    style={{ position: 'absolute', left: '15px', width: '20px', height: '20px' }} />;

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
            <NavLink
              to='/'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Home
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/songs'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Song List
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/profile'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/stats'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Statistics
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/settings'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Settings
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/fields'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Field Builder
            </NavLink>
          </MenuItem>
          <Divider />
          <MenuItem>
            <SignOutButton
              label='LOGOUT'
              next={() => {
                this.props.hideDrawerMenu();
              }}
              style={{ backgroundColor: 'transparent', width: '100%' }} />
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
            <NavLink
              to='/'
              style={linkStyle}
              onClick={this.props.hideDrawerMenu}>
              Home
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/register'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Register
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/reset'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Reset Password
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/contact'
              onClick={this.props.hideDrawerMenu}
              style={linkStyle}>
              Contact Support
            </NavLink>
          </MenuItem>
          <Divider />
          <OAuthSignInButton
            style={{ width: '245px', margin: '5px 0px 5px 5px', height: '40px' }}
            label='Sign In With Facebook'
            icon={facebookIconComponent}
            provider='facebook'>
          </OAuthSignInButton>
          <OAuthSignInButton
            style={{ width: '245px', margin: '0px 0px 5px 5px', height: '40px' }}
            label='Sign In With Google'
            icon={googleIconComponent}
            provider='google'>
          </OAuthSignInButton>
          <NavLink to='/login'>
            <Button
              className={`${config.prefix}drawer_sign_in_email`}
              onClick={this.props.hideDrawerMenu}
              primary
              icon={<EmailIcon />}
              iconAlign='left'
              label='Sign In With Email'
              variant='raised'
              style={{
                width: 'calc(100% - 6px)',
                margin: '0px 3px 5px 3px',
              }}
            />
          </NavLink>
        </Drawer>
      </div>
    );
  }

  render() {
    const { isSignedIn, theme } = this.props;
    linkStyle = { ...linkStyle, ...{ color: theme.instrumental.headerLinksColor } };
    if (isSignedIn) {
      return this.renderSignedIn();
    } else {
      return this.renderSignedOut();
    }
  }
}

export default withTheme()(DrawerMenu);
