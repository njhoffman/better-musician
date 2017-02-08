import React, { Component, PropTypes }  from 'react';
import { Row, Column } from 'react-foundation';
import { Link } from 'react-router';
import { Popover }  from 'material-ui';
import SearchPopover from './SearchPopover';
/* eslint-disable no-multi-spaces */
import {
  MdFilterList    as FilterIcon,
  MdSearch        as SearchIcon,
  MdLibraryAdd    as AddIcon,
  MdModeEdit      as EditIcon,
  MdDelete        as DeleteIcon,
  MdDashboard     as ViewIcon,
  MdArrowDropDown as ArrowDropDownIcon
} from 'react-icons/lib/md';
/* eslint-enable no-multi-spaces */

import css from './Header.scss';

const popoverStyle = {
  anchor: { horizontal: 'left', vertical: 'bottom' },
  target: { horizontal: 'left', vertical: 'top' }
};

class HeaderMiddle extends Component {

  static propTypes = {
    showAddSongModal: PropTypes.func.isRequired,
    muiTheme: PropTypes.object.isRequired,
    showFiltersModal: PropTypes.func.isRequired,
    currentSong: PropTypes.string,
    modal: PropTypes.object.isRequired,
    currentView: PropTypes.string
  }

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
    );
  }

  renderSongButtonAdd() {
    return (
      <a
        className={css.headerLink}
        onClick={this.showAddSongModal.bind(this)}>
        <span className={css.iconWrapper}>
          <AddIcon className={css.icon} />
          <span className={css.iconText}>Add Song</span>
        </span>
      </a>
    );
  }

  renderSongButtonView() {
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
            anchorOrigin={popoverStyle.anchor}
            targetOrigin={popoverStyle.target}
            className={css.menuPopover}
            onRequestClose={this.onRequestClose.bind(this)} >
            <Row className={css.row}>
              <Column className={css.column} >
                <a
                  style={{ color: this.props.muiTheme.instrumental.headerLinksColor }}
                  className={css.headerLink}
                  onClick={this.showEditSongModal.bind(this)} >
                  <span className={css.iconWrapper}>
                    <AddIcon style={{ margin: '0px 12px 0px -12px' }} className={css.icon} />
                    <span className={css.iconText}>Add Song</span>
                  </span>
                </a>
              </Column>
            </Row>
            <Row className={css.row}>
              <Column className={css.column}>
                <a
                  style={{ color: this.props.muiTheme.instrumental.headerLinksColor }}
                  className={css.headerLink}>
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
        return this.renderSongButtonView();
      }
      return this.renderSongButtonAdd();
    }
    return this.renderSongButtonOther();
  }

  renderFiltersButton() {
    const isActive = this.props.modal.type === 'MODAL_FILTER_SONGS';
    return (
      <a
        className={css.headerLink + ' ' + (isActive ? css.headerLinkActive : '')}
        onClick={this.props.showFiltersModal} >
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
        onTouchTap={this.toggleSearchPopover.bind(this)}>
        <span className={css.iconWrapper}>
          <SearchIcon className={css.icon} />
          <span className={css.iconText}>Search</span>
          <SearchPopover
            open={this.state.searchPopoverOpen}
            anchorEl={this.state.searchPopoverAnchor}
            anchorOrigin={popoverStyle.anchor}
            targetOrigin={popoverStyle.target}
            onRequestClose={this.onRequestClose.bind(this)} />
        </span>
      </a>
    );
  }

  render() {
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
}
export default HeaderMiddle;
