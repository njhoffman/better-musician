import React, { Component }  from 'react';
import { MdMenu as MenuIcon } from 'react-icons/lib/md';
import { IndexLink } from 'react-router';
import css from './Header.scss';

class HeaderLeft extends Component {
  render() {
    return (
      <span className={css.headerLink}>
        <span className={css.iconWrapper}>
          <a className={css.menuIcon} onClick={this.props.toggleDrawerMenu}>
            <MenuIcon />
          </a>
          <IndexLink className={css.homeLink} to ='/'>
            instrumental.io
          </IndexLink>
        </span>
      </span>
    );
  }
}
export default HeaderLeft;
