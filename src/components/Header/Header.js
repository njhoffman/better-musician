import React from 'react';
import { IndexLink, Link } from 'react-router';
import { Row, Column, Breakpoints } from 'react-foundation';
import MenuIcon from 'react-icons/lib/md/menu';
import FilterIcon from 'react-icons/lib/md/filter-list';
import SortIcon from 'react-icons/lib/md/import-export';
import SearchIcon from 'react-icons/lib/md/search';

import css from './Header.scss';

export const Header = (props) => (
  <div className={css.actionBar}>
    <Row className="display top">
      <Column small={8} medium={3} style={{ textAlign: 'left' }}>
        <IndexLink to='/' activeClassName='route--active'>
          <MenuIcon /> instrumental.com
        </IndexLink>
      </Column>
      <Column showFor={Breakpoints.MEDIUM}>
        <a onClick={props.showAddSongModal}>
          <SearchIcon />Search
        </a>
      </Column>
      <Column showFor={Breakpoints.MEDIUM}>
        <a onClick={props.showFiltersModal} >
          <FilterIcon />Filter
        </a>
      </Column>
      <Column showFor={Breakpoints.MEDIUM}>
          <Link to='/songs' activeClassName='route--active'>
            <SortIcon /> Sort
          </Link>
      </Column>
      <Column small={4} medium={3}>
        <Link to='/counter' activeClassName='route--active'>
          Score (Counter)
        </Link>
      </Column>

    </Row>
    <Row className="display bottom" showOnlyFor={Breakpoints.SMALL}>
      <Column centerOnSmall>
          <Link to='/songs' activeClassName='route--active'>
            <SortIcon /> Sort
          </Link>
      </Column>
      <Column centerOnSmall>
          <Link to='/songs' activeClassName='route--active'>
            <SortIcon /> Sort
          </Link>
      </Column>
      <Column centerOnSmall>
          <Link to='/songs' activeClassName='route--active'>
            <SortIcon /> Sort
          </Link>
      </Column>
    </Row>
  </div>
);

Header.propTypes = {
  showAddSongModal: React.PropTypes.func.isRequired,
  showFiltersModal: React.PropTypes.func.isRequired
};

export default Header;
