import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MdMenu as MenuIcon } from 'react-icons/lib/md';
import { Link } from 'react-router-dom';
import css from './Header.scss';
import config from 'data/config';

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
  },
});

class HeaderLeft extends Component {
  static propTypes = {
    toggleDrawerMenu: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className={this.props.classes.headerLeft}>
        <Button
          icon={<MenuIcon onClick={this.props.toggleDrawerMenu} />}
        />
        <Link className={this.props.classes.homeLink} to='/'>
          instrumental.io
        </Link>
      </div>
    );
  }
}
export default withStyles(styles)(HeaderLeft);
