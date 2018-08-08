import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MdMenu as MenuIcon } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { uiToggleDrawerMenu } from 'actions/ui';

import Button from 'components/Button';

const styles = (theme) => ({
  homeLink: {
    color: theme.palette.text.primary,
    marginLeft: '5px',
    textDecoration: 'none',
    '&:hover':  {
      textShadow: '0px 0px 3px rgba(255,255,255,0.3), 0px -0px 3px rgba(255,255,255,0.5)'
    }
  },
  menuIcon: {
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center'
  }
});

const HeaderLeft = ({ classes, toggleDrawerMenu }) => (
  <div className={classes.headerLeft}>
    <Button
      icon={<MenuIcon onClick={toggleDrawerMenu} />}
    />
    <Link className={classes.homeLink} to='/'>
      instrumental.io
    </Link>
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
