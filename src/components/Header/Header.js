import React, { Component }  from 'react';
import { IndexLink, Link } from 'react-router';
import { Row, Column, Breakpoints } from 'react-foundation';
import { Drawer, MenuItem, Popover } from 'material-ui';

import MenuIcon from 'react-icons/lib/md/menu';
import FilterIcon from 'react-icons/lib/md/filter-list';
import SortIcon from 'react-icons/lib/md/import-export';
import SearchIcon from 'react-icons/lib/md/search';
import AddIcon from 'react-icons/lib/md/library-add';
import EditIcon from 'react-icons/lib/md/mode-edit';
import DeleteIcon from 'react-icons/lib/md/delete';
import ArrowDropDownIcon from 'react-icons/lib/md/arrow-drop-down';

import SearchPopover from './SearchPopover';
import css from './Header.scss';

class Header extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      searchOpen: false,
      songPopoverOpen: false
    };
  };

  toggleSearchPopover() {
    this.setState({
      searchOpen: !this.state.searchOpen
    });
  }

  showSongPopover() {
    this.setState({
      songPopoverOpen: true
    });
  }

  onRequestClose() {
    this.setState({
      searchOpen: false
    });
  }

  renderSongActionButton() {
    if ( _.isEmpty(this.props.currentSong) ) {
      return (
        <a>
          <AddIcon />Add Song
        </a>
      );
    }

    return (
      <a onTouchTap={this.showSongPopover.bind(this)}>
        <EditIcon />Edit Song
        <ArrowDropDownIcon onTouchTap={this.showSongPopover.bind(this)} />
        <Popover open={this.state.songPopoverOpen} >
          <Row>
            <Column>
              <a><AddIcon />Add Song</a>
            </Column>
          </Row>
          <Row>
            <Column>
              <a><DeleteIcon />Delete Song</a>
            </Column>
          </Row>
        </Popover>
      </a>
    );
  }

  render () {
    const props = this.props;
    return (
      <div className={css.actionBar}>
        <Row className="display top">
          <Column small={8} medium={3} style={{ textAlign: 'left' }}>
            <a onClick={props.toggleDrawerMenu}>
              <MenuIcon />
            </a>
            <IndexLink to ='/' activeClassName='route--active'>
              instrumental.com
            </IndexLink>
          </Column>
          <Column showFor={Breakpoints.MEDIUM}>

              { this.renderSongActionButton(props) }

          </Column>
          <Column showFor={Breakpoints.MEDIUM}>
            <a onClick={props.showFiltersModal} >
              <FilterIcon />Filters
            </a>
          </Column>
          <Column showFor={Breakpoints.MEDIUM}>
            <a onClick={ this.toggleSearchPopover.bind(this) }>
              <SearchIcon />Search
              <SearchPopover
                open={ this.state.searchOpen }
                onRequestClose={ this.onRequestClose.bind(this) } />
            </a>
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
    )
  }
};

Header.propTypes = {
  showFiltersModal: React.PropTypes.func.isRequired,
  toggleDrawerMenu: React.PropTypes.func.isRequired,
  searchClose: React.PropTypes.func.isRequired
};

export default Header;
