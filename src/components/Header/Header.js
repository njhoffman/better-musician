import React from 'react';
import { IndexLink, Link } from 'react-router';
import { Row, Column, Breakpoints } from 'react-foundation';
import MenuIcon from 'react-icons/lib/md/menu';
import FilterIcon from 'react-icons/lib/md/filter-list';
import SortIcon from 'react-icons/lib/md/import-export';
import SearchIcon from 'react-icons/lib/md/search';

import css from './Header.scss';

export const Header = () => (
  <div className={css.actionBar}>
    <Row className="display top">
      <Column small={8} medium={3}>
        <IndexLink to='/' activeClassName='route--active'>
          <MenuIcon />
          instrumental.com
        </IndexLink>
      </Column>
      <Column showFor={Breakpoints.MEDIUM}><a href="#"><SearchIcon />Search</a></Column>
      <Column showFor={Breakpoints.MEDIUM}><a href="#"><FilterIcon />Filters</a></Column>
      <Column showFor={Breakpoints.MEDIUM}><a href="#"><SortIcon />Sort</a></Column>
      <Column small={4} medium={3}><a href="#">Score &amp; Icon</a></Column>

      <Link to='/counter' activeClassName='route--active'>
        Counter
      </Link>
    </Row>
    <Row className="display bottom" showOnlyFor={Breakpoints.SMALL}>
    </Row>
  </div>
);

export default Header;
