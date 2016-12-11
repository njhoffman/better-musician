import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import muiThemeable from 'material-ui/styles/muiThemeable';

export const DrawerMenu = (props) => {

  return (
    <div>
      <Drawer
        open={props.isOpen}
        docked={false}
        onRequestChange={props.hideDrawerMenu}
      >
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </div>
  );
}

DrawerMenu.propTypes = {
  isOpen:      React.PropTypes.bool.isRequired,
  hideDrawerMenu: React.PropTypes.func.isRequired
};


export default muiThemeable()(DrawerMenu);
