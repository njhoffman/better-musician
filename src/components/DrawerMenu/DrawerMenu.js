import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link, IndexLink } from 'react-router';


const linkStyle = {
  width: "100%"
}

class DrawerMenu extends Component {
  render() {
    const { props } = this;
    return (
      <div>
        <Drawer
          open={props.isOpen}
          docked={false}
          onRequestChange={props.hideDrawerMenu}>
            <MenuItem>
              <Link
                to='/'
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
                <Link style={linkStyle} to='/login' activeClassName='active'>Login</Link>
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
        </Drawer>
      </div>
    );
  }
}


export default DrawerMenu;
