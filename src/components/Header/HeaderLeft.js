import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { MdMenu as MenuIcon } from 'react-icons/md';
import { uiToggleDrawerMenu } from 'actions/ui';

import Button from 'components/Button';
import logoIcon from 'assets/logo-small.png';

const LogoIcon = ({ classes }) => <img src={logoIcon} className={classes.homeLogo} />;

const styles = (theme) => ({
  headerLeft: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    height: theme.app.headerHeight
  },
  homeButton: {
    padding: '2px',
    marginLeft: '15px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px'
    },
  },
  homeLogo: {
    height: '1.75em',
    minWidth: '3.1em',
    textDecoration: 'none',
    '&:hover':  {
      textShadow: '0px 0px 3px rgba(255,255,255,0.3), 0px -0px 3px rgba(255,255,255,0.5)'
    },
    padding: '0px',
    filter: 'invert(1)',
  },
  menuIcon: {
  }
});

const HeaderLeft = ({ classes, toggleDrawerMenu }) => (
  <div className={classes.headerLeft}>
    <Button
      onClick={toggleDrawerMenu}
      icon={<MenuIcon className={classes.menuIcon} />}
    />
    <Button
      className={classes.homeButton}
      link='/'
      icon={<LogoIcon classes={classes} />}
    />
  </div>
);

HeaderLeft.propTypes = {
  toggleDrawerMenu: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = () => ({ });
const mapActionCreators = {
  toggleDrawerMenu : uiToggleDrawerMenu
};

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(HeaderLeft));
