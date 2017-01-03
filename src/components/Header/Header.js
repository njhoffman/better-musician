import React, { Component }  from 'react';
import { IndexLink, Link } from 'react-router';
import { Row, Column, Breakpoints } from 'react-foundation';
import { Drawer, MenuItem, Popover, RaisedButton } from 'material-ui';
import _ from 'lodash';

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
      searchPopoverOpen: false,
      songPopoverOpen: false
    };
  };

  toggleSearchPopover() {
    this.setState({
      searchPopoverOpen: !this.state.searchPopoverOpen
    });
  }

  toggleSongPopover() {
    this.setState({
      songPopoverOpen: true
    });
  }

  onRequestClose() {
    this.setState({
      searchPopoverOpen: false,
      songPopoverOpen: false
    });
  }

  showAddSongModal() {
    this.onRequestClose();
    this.props.showAddSongModal();
  };

  renderSongActionButton() {
    if (this.props.location !== '/songs') {
      return (
        <a>
          <Link to='/songs' activeClassName='route--active'>
            View Songs
          </Link>
        </a>
      )
    } else if ( _.isEmpty(this.props.currentSong) ) {
      return (
        <a onClick={ this.props.showAddSongModal }>
          <AddIcon />Add Song
        </a>
      );
    }
    return (
      <a>
        <EditIcon />Edit Song
        <ArrowDropDownIcon onTouchTap={this.toggleSongPopover.bind(this)} />
        <Popover
          open={this.state.songPopoverOpen}
          onRequestClose={this.onRequestClose.bind(this)} >
          <Row>
            <Column>
              <a onClick={ this.showAddSongModal.bind(this) } >
                <AddIcon />Add Song</a>
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

  renderScoreButton() {
    if (this.props.user.get("isSignedIn")) {
      return (
        <span>{ this.props.user.get("attributes").get("email") }</span>
      );
    }
    return (
      <div>
        <Link to='/login'>
          <RaisedButton className={css.loginButton} label="LOGIN" primary={true} />
        </Link>
        <Link to='/register'>
          <RaisedButton className={css.registerButton} label="REGISTER" />
        </Link>
      </div>
    );
  }


  render () {
    const props = this.props;
    return (
      <div className={css.actionBar}>
        <Row className="display top">
          <Column small={8} medium={3} style={{ textAlign: 'left' }}>
            <div className={css.columnWrapper}>
              <a onClick={this.props.toggleDrawerMenu}>
                <MenuIcon />
              </a>
              <IndexLink to ='/' activeClassName='route--active'>
                instrumental.com
              </IndexLink>
            </div>
          </Column>
          <Column showFor={Breakpoints.MEDIUM}>

            { this.renderSongActionButton(props) }

          </Column>
          <Column showFor={Breakpoints.MEDIUM}>
            <div className={css.columnWrapper}>
              <a onClick={props.showFiltersModal} >
                <FilterIcon />Filters
              </a>
            </div>
          </Column>
          <Column showFor={Breakpoints.MEDIUM}>
            <div className={css.columnWrapper}>
              <a onClick={ this.toggleSearchPopover.bind(this) }>
                <SearchIcon />Search
                <SearchPopover
                  open={ this.state.searchPopoverOpen }
                  onRequestClose={ this.onRequestClose.bind(this) } />
              </a>
            </div>
          </Column>
          <Column small={4} medium={3}>
            { this.renderScoreButton() }
          </Column>

        </Row>
        <Row className="display bottom" showOnlyFor={Breakpoints.SMALL}>
          <Column centerOnSmall>
            <div className={css.columnWrapper}>
              <Link to='/songs' activeClassName='route--active'>
                <SortIcon /> Sort
              </Link>
            </div>
          </Column>
          <Column centerOnSmall>
            <div className={css.columnWrapper}>
              <Link to='/songs' activeClassName='route--active'>
                <SortIcon /> Sort
              </Link>
            </div>
          </Column>
          <Column centerOnSmall>
            <div className={css.columnWrapper}>
              <Link to='/songs' activeClassName='route--active'>
                <SortIcon /> Sort
              </Link>
            </div>
          </Column>
        </Row>
      </div>
    )
  }
};

Header.propTypes = {
  showFiltersModal: React.PropTypes.func.isRequired,
  toggleDrawerMenu: React.PropTypes.func.isRequired,
  searchClose:      React.PropTypes.func.isRequired,
  showAddSongModal: React.PropTypes.func.isRequired
};

export default Header;
