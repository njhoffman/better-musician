import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Divider, MenuItem } from 'material-ui';
import withStyles from '@material-ui/core/styles/withStyles';

import OAuthSignInButton from 'components/OAuthSignInButton';
import SignOutButton from 'components/SignOutButton';
import Button from 'components/Button';
import facebookIcon from 'assets/fb-icon.png';
import googleIcon from 'assets/google-icon.png';
import EmailIcon from 'material-ui-icons/Email';

import DrawerMenuLink from './DrawerMenuLink';
import css from './DrawerMenu.scss';

const googleIconComponent = <img src={googleIcon} />;

const facebookIconComponent = <img src={facebookIcon} />;

const styles = (theme) => ({
  buttonLink: {
    width: 'calc(100% - 6px)',
    margin: '3px'
  }
});

export class DrawerMenu extends Component {
  static propTypes = {
    hideDrawerMenu : PropTypes.func.isRequired,
    isOpen         : PropTypes.bool.isRequired,
    user           : PropTypes.object,
    classes        : PropTypes.object,
    isSignedIn     : PropTypes.bool.isRequired
  };

  renderSignedIn() {
    return (
      <div className={css.drawerMenuContainer} >
        <Drawer open={this.props.isOpen} onClose={this.props.hideDrawerMenu}>
          <DrawerMenuLink link='/' label='Home' />
          <DrawerMenuLink link='/songs' label='Songs' />
          <DrawerMenuLink link='/profile' label='Profile' />
          <DrawerMenuLink link='/stats' label='Stats' />
          <DrawerMenuLink link='/settings' label='Settings' />
          <DrawerMenuLink link='/fields' label='Fields' />
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
        <Drawer open={this.props.isOpen} onClose={this.props.hideDrawerMenu}>
          <DrawerMenuLink link='/' label='Home' />
          <DrawerMenuLink link='/register' label='Register' />
          <DrawerMenuLink link='/reset' label='Reset' />
          <DrawerMenuLink link='/contact' label='Contact' />
          <Divider />
          <OAuthSignInButton
            label='Sign In With Facebook'
            iconAlign='left'
            className={this.props.classes.buttonLink}
            icon={facebookIconComponent}
            provider='facebook' />
          <OAuthSignInButton
            label='Sign In With Google'
            icon={googleIconComponent}
            className={this.props.classes.buttonLink}
            iconHeight={1.5}
            iconAlign='left'
            provider='google' />
          <Button
            href='/login'
            className={this.props.classes.buttonLink}
            onClick={this.props.hideDrawerMenu}
            primary
            icon={<EmailIcon />}
            iconAlign='left'
            label='Sign In With Email'
            variant='raised'
          />
        </Drawer>
      </div>
    );
  }

  render() {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
      return this.renderSignedIn();
    } else {
      return this.renderSignedOut();
    }
  }
}

export default withStyles(styles)(DrawerMenu);
