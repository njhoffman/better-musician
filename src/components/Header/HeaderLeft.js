import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { MdMenu as MenuIcon } from 'react-icons/md';
import { uiToggleDrawerMenu } from 'actions/ui';

import Button from 'components/Button';
import logoIcon from 'assets/logo-small.png';

const LogoIcon = () => (
  <img src={logoIcon} style={{ height: '1.75em', filter: 'invert(1)' }} />
  );

const styles = (theme) => ({
  homeLogo: {
    marginLeft: '15px',
    textDecoration: 'none',
    '&:hover':  {
      textShadow: '0px 0px 3px rgba(255,255,255,0.3), 0px -0px 3px rgba(255,255,255,0.5)'
    },
    padding: '0px'
  },
  homeButton: {
    padding: '2px',
    marginLeft: '15px'
  },
  menuIcon: {
  },
  headerLeft: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  }
});

const HeaderLeft = ({ classes, toggleDrawerMenu }) => (
  <div className={classes.headerLeft}>
    <Button
      icon={<MenuIcon className={classes.menuIcon} onClick={toggleDrawerMenu} />}
    />
    <Button
      className={classes.homeButton}
      link='/'
      icon={<LogoIcon className={classes.homeLogo}/>}
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
