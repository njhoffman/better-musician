import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MenuItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { uiHideDrawerMenu } from 'actions/ui';

const styles = (theme) => ({
  root: {
    padding: '0px',
    height: '48px',
  },
  navButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: '0px 24px'
  },
  navLink: {
    textDecoration: 'none',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  google: {
    borderRadius: '5px',
    background: '#4c69ba66',
    margin: '6px',
    height: '42px'
  },
  facebook: {
    background: '#4285f466',
    borderRadius: '5px',
    margin: '6px',
    height: '42px'
  },
  navText: {
    textAlign: 'center',
    color: theme.app.headerLinksColor,
    textTransform: 'uppercase',
    padding: '0px'
  },
  loginText: {
    display: 'flex',
    padding: '0px',
    justifyContent: 'center'
  },
  textWrapper: {
    padding: '0px',
    justifyContent: 'center'
  },
  icon: {
    marginRight: '10px'
  },
  iconWrapper: {
  }
});

const MenuLink = ({ classes, label, Icon, loginLink }) => (
  <Fragment>
    {Icon && (
      <ListItemIcon className={classes.iconWrapper}>
        <Icon className={classes.icon} />
      </ListItemIcon>
    )}
    <ListItemText
      inset={Icon && true}
      className={classes.textWrapper}
      primaryTypographyProps={{
        className: loginLink ? classes.loginText : classes.navText
      }}
      primary={label}
    />
  </Fragment>
);

MenuLink.defaultProps = {
  loginLink: '',
  label:     '',
  Icon:      null
};

MenuLink.propTypes = {
  classes:        PropTypes.instanceOf(Object).isRequired,
  label:          PropTypes.string,
  Icon:           PropTypes.func,
  loginLink:      PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

const DrawerMenuLink = ({
  link,
  hideDrawerMenu,
  classes,
  onClick,
  loginLink,
  ...props
}) => (
  <MenuItem
    onClick={onClick || hideDrawerMenu}
    className={`${classes.root} ${classes[loginLink] || ''}`}>
    <div className={classes.navButton}>
      {link && (
        <NavLink to={link} className={classes.navLink}>
          {MenuLink({ classes, loginLink, ...props })}
        </NavLink>
      )}
      {!link && (MenuLink({ classes, loginLink, ...props }))}
    </div>
  </MenuItem>
);

DrawerMenuLink.defaultProps = {
  onClick:   null,
  link:      '',
  loginLink: ''
};

DrawerMenuLink.propTypes = {
  hideDrawerMenu: PropTypes.func.isRequired,
  classes:        PropTypes.instanceOf(Object).isRequired,
  onClick:        PropTypes.func,
  link:           PropTypes.string,
  loginLink:      PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

const mapStateToProps = (state) => ({});
const mapActionCreators = {
  hideDrawerMenu : uiHideDrawerMenu
};

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(DrawerMenuLink));
