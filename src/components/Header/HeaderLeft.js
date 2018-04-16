import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { MdMenu as MenuIcon } from 'react-icons/lib/md';
import { Link } from 'react-router-dom';
import css from './Header.scss';

class HeaderLeft extends Component {
  static propTypes = {
    toggleDrawerMenu: PropTypes.func.isRequired
  }

  render() {
    return (
      <span className={css.headerLink}>
        <span className={css.iconWrapper}>
          <a className={css.menuIcon} onClick={this.props.toggleDrawerMenu}>
            <MenuIcon />
          </a>
          <Link className={css.homeLink} to='/'>
            instrumental.io
          </Link>
        </span>
      </span>
    );
  }
}
export default HeaderLeft;
