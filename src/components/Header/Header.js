import React, { Component }  from 'react';
import { IndexLink, Link } from 'react-router';
import { Row, Column, Breakpoints } from 'react-foundation';
import { Drawer, MenuItem, Popover, RaisedButton, Avatar } from 'material-ui';
import _ from 'lodash';

import MenuIcon from 'react-icons/lib/md/menu';
import FilterIcon from 'react-icons/lib/md/filter-list';
import SortIcon from 'react-icons/lib/md/import-export';
import SearchIcon from 'react-icons/lib/md/search';
import AddIcon from 'react-icons/lib/md/library-add';
import EditIcon from 'react-icons/lib/md/mode-edit';
import DeleteIcon from 'react-icons/lib/md/delete';
import ArrowDropDownIcon from 'react-icons/lib/md/arrow-drop-down';
import AvatarIcon from 'react-icons/lib/md/account-circle';

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
        <Link className={css.headerLink} to='/songs'>
          <span>
            View Songs
          </span>
        </Link>
      )
    } else if ( _.isEmpty(this.props.currentSong) ) {
      return (
        <a className={css.headerLink} onClick={ this.props.showAddSongModal }>
          <span>
            <AddIcon />Add Song
          </span>
        </a>
      );
    }
    return (
      <a className={css.headerLink}>
        <span>
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
        </span>
      </a>
    );
  }

  renderLeftColumn() {
    debugger;
    return (
      <span className={css.headerLink + ' ' +  css.leftColumn}>
        <span>
          <a className={css.menuIcon} onClick={this.props.toggleDrawerMenu}>
            <MenuIcon />
          </a>
          <IndexLink className={css.homeLink} to ='/'>
            instrumental.com
          </IndexLink>
        </span>
      </span>
    );
  }

  renderRightColumn() {
    if (this.props.user && this.props.user.get("isSignedIn")) {
      return (
        <div className={css.headerLink}>
          <Link to='/profile' style={{ display: 'table-cell', verticalAlign: 'middle', paddingRight: '5px' }}>
            <span>{ this.props.user.get("attributes").get("email") }</span>
            <span>
              <Avatar
                icon={<AvatarIcon />}
                color={'#3333ff'}
                backgroundColor={'#33ff33'}
                size={35}
              />
            </span>
          </Link>
        </div>
      );
    }
    return (
      <div style={{ float: 'right', height: '100%', fontSize: '0.9em', paddingRight: '10px' }}>
        <div style={{ display: 'table', height: '100%' }}>
          <Link to='/login' style={{ display: 'table-cell', verticalAlign: 'middle', paddingRight: '5px' }}>
            <RaisedButton
              style={{ height: '25px', display: 'table-cell', minWidth: '0px' }}
              labelStyle={{ padding: '5px 10px', paddingLeft: '10px', display: 'table-cell' }}
              className={css.loginButton}
              label="LOGIN"
              primary={true} />
          </Link>
          <Link to='/register' style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <RaisedButton
              style={{ height: '25px', display: 'table-cell', minWidth: '0px' }}
              labelStyle={{ padding:'5px 10px', paddingLeft: '10px', display: 'table-cell' }}
              className={css.registerButton}
              label="REGISTER" />
          </Link>
        </div>
      </div>
    );
  }

  renderSongButton(Breakpoint) {
    return (
      <Column showFor={Breakpoint} style={{ padding: '0px' }}>
        { this.renderSongActionButton(this.props) }
      </Column>
    );
  }

  renderFiltersButton(Breakpoint) {
    return (
      <Column showFor={Breakpoint} style={{ padding: '0px' }}>
        <a className={css.headerLink} onClick={this.props.showFiltersModal} >
          <span>
            <FilterIcon />Filters
          </span>
        </a>
      </Column>
    );
  }

  renderSearchButton(Breakpoint) {
    return (
      <Column showFor={Breakpoint} style={{ padding: '0px' }}>
        <a className={css.headerLink}
          onClick={ this.toggleSearchPopover.bind(this) }>
          <span>
            <SearchIcon />Search
            <SearchPopover
              open={ this.state.searchPopoverOpen }
              onRequestClose={ this.onRequestClose.bind(this) } />
          </span>
        </a>
      </Column>
    );
  }

  render () {
    const props = this.props;
    const signedIn = this.props.user.get('isSignedIn');
    if (signedIn) {
      return (
        <div className={css.actionBar}>
          <Row className={css.wrapper}>
            <Column small={6} medium={3} style={{ padding: '0px 0px 0px 15px', textAlign: 'left' }}>
              { this.renderLeftColumn() }
            </Column>
            { this.renderSongButton(Breakpoints.MEDIUM) }
            { this.renderFiltersButton(Breakpoints.MEDIUM) }
            { this.renderSearchButton(Breakpoints.MEDIUM) }
            <Column small={6} medium={3} style={{ textAlign: 'right', padding: '0px' }}>
              { this.renderRightColumn() }
            </Column>
          </Row>
          <Row className={css.wrapper} showOnlyFor={Breakpoints.SMALL}>
            { this.renderSongButton() }
            { this.renderFiltersButton() }
            { this.renderSearchButton() }
          </Row>
        </div>
      );
    } else {
      return (
        <div className={css.actionBar}>
          <Row className={css.wrapper}>
            <Column small={6} style={{ padding: '0px 0px 0px 15px', textAlign: 'left' }}>
              { this.renderLeftColumn() }
            </Column>
            <Column small={6} style={{ textAlign: 'right', padding: '0px' }}>
              { this.renderRightColumn() }
            </Column>
          </Row>
        </div>
      );
    }
  }
};

Header.propTypes = {
  showFiltersModal: React.PropTypes.func.isRequired,
  toggleDrawerMenu: React.PropTypes.func.isRequired,
  searchClose:      React.PropTypes.func.isRequired,
  showAddSongModal: React.PropTypes.func.isRequired
};

export default Header;
