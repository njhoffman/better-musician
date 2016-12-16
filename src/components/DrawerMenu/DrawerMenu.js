import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link, IndexLink } from 'react-router';

import muiThemeable from 'material-ui/styles/muiThemeable';

export const DrawerMenu = (props) => {

  return (
    <div>
      <Drawer
        open={props.isOpen}
        docked={false}
        onRequestChange={props.hideDrawerMenu}
      >
          <MenuItem>
              <Link to='/' activeClassName='route--active'>Home</Link>
          </MenuItem>
          <MenuItem>
              <Link to='/login' activeClassName='route--active'>Login</Link>
          </MenuItem>
          <MenuItem>
              <Link to='/songs' activeClassName='route--active'>Songs</Link>
          </MenuItem>
          <MenuItem>
              <Link to='/settings' activeClassName='route--active'>Settings</Link>
          </MenuItem>
          <MenuItem>
              <Link to='/profile' activeClassName='route--active'>Profile</Link>
          </MenuItem>
      </Drawer>
    </div>
  );
}

DrawerMenu.propTypes = {
  isOpen:      React.PropTypes.bool.isRequired,
  hideDrawerMenu: React.PropTypes.func.isRequired
};


export default muiThemeable()(DrawerMenu);
