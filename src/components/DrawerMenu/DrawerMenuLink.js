import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { MenuItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { uiHideDrawerMenu } from 'store/ui';

const styles = (theme) => ({
  navLink: {
    width: '100%',
    display: 'inline-block',
    textAlign: 'center',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: theme.instrumental.headerLinksColor
  }
});

export const DrawerMenuLink = ({
  label,
  link,
  hideDrawerMenu,
  classes
}) => (
  <MenuItem>
    <NavLink
      onClick={hideDrawerMenu}
      to={link}
      className={classes.navLink}>
      {label}
    </NavLink>
  </MenuItem>
);

DrawerMenuLink.propTypes = {
  hideDrawerMenu: PropTypes.func.isRequired,
  classes:        PropTypes.object.isRequired,
  link:           PropTypes.string.isRequired,
  label:          PropTypes.string
};

const mapStateToProps = (state) => ({});
const mapActionCreators = {
  hideDrawerMenu : uiHideDrawerMenu
};

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(DrawerMenuLink));
