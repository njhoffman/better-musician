import React, { Component }  from 'react';
import { IndexLink, Link } from 'react-router';
import { Row, Column, Breakpoints } from 'react-foundation';
import { Drawer, MenuItem, Popover, RaisedButton, Avatar } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {
  MdFilterList    as FilterIcon,
  MdImportExport  as SortIcon,
  MdSearch        as SearchIcon,
  MdLibraryAdd    as AddIcon,
  MdModeEdit      as EditIcon,
  MdDelete        as DeleteIcon,
  MdDashboard     as ViewIcon,
  MdArrowDropDown as ArrowDropDownIcon
} from 'react-icons/lib/md';

import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import SearchPopover from './SearchPopover';
import css from './Header.scss';

class Header extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      searchPopoverOpen: false,
      searchPopoverAnchor: {},
      songPopoverOpen: false,
      songPopoverAnchor: {}
    };
  };

  toggleSearchPopover(e) {
    e.preventDefault();
    this.setState({
      searchPopoverOpen: !this.state.searchPopoverOpen,
      searchPopoverAnchor: e.currentTarget.parentElement
    });
  }

  toggleSongPopover(e) {
    e.preventDefault();
    this.setState({
      songPopoverOpen: true,
      songPopoverAnchor: e.currentTarget.parentElement
    });
  }

  onRequestClose() {
    this.setState({
      searchPopoverOpen: false,
      songPopoverOpen: false
    });
  }

  showEditSongModal() {
    this.onRequestClose();
    this.props.showAddSongModal('edit');
  };

  showAddSongModal() {
    this.onRequestClose();
    this.props.showAddSongModal('add');
  };

  renderSongButtonOther() {
      return (
        <Link className={css.headerLink} to='/songs'>
          <span className={css.iconWrapper}>
            <ViewIcon className={css.icon} />
            <span className={css.iconText}>View Songs</span>
          </span>
        </Link>
      )
  }

  renderSongButtonAdd() {
      return (
        <a className={css.headerLink} onClick={ this.showAddSongModal.bind(this) }>
          <span className={css.iconWrapper}>
            <AddIcon className={css.icon} />
            <span className={css.iconText}>Add Song</span>
          </span>
        </a>
      );
  }

  renderSongButtonEdit() {
    return (
      <a className={css.headerLink}>
        <span className={css.iconWrapper}>
          <EditIcon className={css.icon} />
          <span className={css.iconText}>Edit Song</span>
          <ArrowDropDownIcon
            className={css.downArrow}
            onTouchTap={this.toggleSongPopover.bind(this)} />
          <Popover
            open={this.state.songPopoverOpen}
            anchorEl={this.state.songPopoverAnchor}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            style={{ width: '15%' }}
            onRequestClose={this.onRequestClose.bind(this)} >
            <Row>
              <Column style={{ padding: '0px', textAlign: 'center', height: '100%' }}>
                <a style={{ padding: "5px 0px" }} className={css.headerLink} onClick={ this.showEditSongModal.bind(this) } >
                  <span className={css.iconWrapper}>
                    <AddIcon style={{ margin: "0px 12px 0px -12px" }} className={css.icon} />
                    <span className={css.iconText}>Add Song</span>
                  </span>
                </a>
              </Column>
            </Row>
            <Row style={{ padding: "5px 0px" }}>
              <Column style={{ padding: '0px', textAlign: 'center', height: '100%' }}>
                <a style={{ padding: "5px 0px" }} className={css.headerLink}>
                  <span className={css.iconWrapper}>
                    <DeleteIcon className={css.icon} />
                    <span className={css.iconText}>Delete Song</span>
                  </span>
                </a>
              </Column>
            </Row>
          </Popover>
        </span>
      </a>
    );
  }

  renderSongButton() {
    if (this.props.currentView === 'songsView') {
      if (this.props.currentSong) {
        return this.renderSongButtonEdit();
      }
      return this.renderSongButtonAdd()
    }
    return this.renderSongButtonOther()
  }


  renderFiltersButton() {
    return (
      <a className={css.headerLink} onClick={this.props.showFiltersModal} >
        <span className={css.iconWrapper}>
          <FilterIcon className={css.icon} />
          <span className={css.iconText}>Filters</span>
        </span>
      </a>
    );
  }

  renderSearchButton() {
    return (
      <a className={css.headerLink}
        onTouchTap={ this.toggleSearchPopover.bind(this) }>
        <span className={css.iconWrapper}>
          <SearchIcon className={css.icon} />
          <span className={css.iconText}>Search</span>
          <SearchPopover
            open={ this.state.searchPopoverOpen }
            anchorEl={this.state.searchPopoverAnchor}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={ this.onRequestClose.bind(this) } />
        </span>
      </a>
    );
  }

  renderMiddleColumn() {
    return (
      <Row className={css.wrapper}>
        <Column style={{ padding: '0px', height: '100%' }}>
          { this.renderSongButton() }
        </Column>
        <Column style={{ padding: '0px', height: '100%' }}>
          { this.renderFiltersButton() }
        </Column>
        <Column style={{ padding: '0px', height: '100%' }}>
          { this.renderSearchButton() }
        </Column>
      </Row>
    );
  }

  render () {
    const props = this.props;
    const signedIn = this.props.user.get('isSignedIn');
    if (signedIn) {
      return (
        <div
          style={{
            backgroundColor: this.props.muiTheme.palette.canvasColor,
            color: this.props.muiTheme.instrumental.headerLinksColor
          }}
          className={css.header + ' ' + css.loggedIn }>
          <Row className={css.wrapper}>
            <Column
              small={6}
              medium={3}
              style={{ padding: '0px 0px 0px 15px', textAlign: 'left' }}>
              <HeaderLeft {...props} />
            </Column>
            <Column
              medium={6}
              showFor={Breakpoints.MEDIUM} >
              { this.renderMiddleColumn() }
            </Column>
            <Column
              small={6}
              medium={3}
              style={{ textAlign: 'right', padding: '0px' }}>
              <HeaderRight {...props} />
            </Column>
          </Row>
          <Row className={css.wrapper} showOnlyFor={Breakpoints.SMALL}>
            <Column>
              { this.renderMiddleColumn() }
            </Column>
          </Row>
        </div>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: this.props.muiTheme.palette.canvasColor,
            color: this.props.muiTheme.instrumental.headerLinksColor
          }}
          className={css.header + ' ' + css.loggedOut}>
          <Row className={css.wrapper}>
            <Column
              small={6}
              style={{ padding: '0px 0px 0px 15px', textAlign: 'left' }}>
              <HeaderLeft {...props} />
            </Column>
            <Column
              small={6}
              style={{ textAlign: 'right', padding: '0px' }}>
              <HeaderRight {...props} />
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

export default muiThemeable()(Header);
