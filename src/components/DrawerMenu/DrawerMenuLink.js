import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MenuItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { uiHideDrawerMenu } from 'actions/ui';

const styles = (theme) => ({
  root: {
    padding: '0px',
    height: '48px'
  },
  navButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 24px'
  },
  navLink: {
    textDecoration: 'none',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 24px'
  },
  navText: {
    textAlign: 'center',
    color: theme.instrumental.headerLinksColor,
    textTransform: 'uppercase',
    padding: '0px'
  },
  loginText: {
    display: 'flex',
    padding: '0px'
  },
  textWrapper: {
    padding: '0px'
  }
});

export const DrawerMenuLink = ({
  label,
  link,
  hideDrawerMenu,
  Icon,
  classes,
  loginLink,
  onClick
}) => (
  <MenuItem onClick={onClick ? onClick : hideDrawerMenu} className={classes.root}>
    {link && (
      <NavLink to={link} className={classes.navLink}>
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          inset={Icon ? true : false}
          className={classes.textWrapper}
          primaryTypographyProps={{ className: loginLink ? classes.loginText : classes.navText }}
          primary={label} />
      </NavLink>
    )}
    {!link && (
      <div className={classes.navButton}>
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          inset={Icon ? true : false}
          className={classes.textWrapper}
          primary={label}
          primaryTypographyProps={{ className: loginLink ? classes.loginText : classes.navText }} />
      </div>
    )}
  </MenuItem>
);

DrawerMenuLink.propTypes = {
  hideDrawerMenu: PropTypes.func.isRequired,
  classes:        PropTypes.object.isRequired,
  onClick:        PropTypes.func,
  loginLink:      PropTypes.bool,
  link:           PropTypes.string,
  label:          PropTypes.string,
  Icon:           PropTypes.func
};

const mapStateToProps = (state) => ({});
const mapActionCreators = {
  hideDrawerMenu : uiHideDrawerMenu
};

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(DrawerMenuLink));
