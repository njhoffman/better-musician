import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import SearchPopover from './SearchPopover';
import SongPopover from './SongPopover';

/* eslint-disable no-multi-spaces */
import {
  MdFilterList    as FilterIcon,
  MdSearch        as SearchIcon
} from 'react-icons/lib/md';
/* eslint-enable no-multi-spaces */

import css from './Header.scss';

const popoverStyle = {
  anchor: { horizontal: 'left', vertical: 'bottom' },
  target: { horizontal: 'left', vertical: 'top' }
};

class HeaderMiddle extends Component {
  static propTypes = {
    showFiltersModal: PropTypes.func.isRequired,
    currentSong:      PropTypes.string,
    modal:            PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      searchPopoverOpen:   false,
      searchPopoverAnchor: {},
      songPopoverOpen:     false,
      songPopoverAnchor:   {}
    };
    this.toggleSongPopover = this.toggleSongPopover.bind(this);
    this.toggleSearchPopover = this.toggleSearchPopover.bind(this);
    this.onRequestClose = this.onRequestClose.bind(this);
  };

  toggleSearchPopover(e) {
    e.preventDefault();
    this.setState({
      searchPopoverOpen:   !this.state.searchPopoverOpen,
      searchPopoverAnchor: e.currentTarget.parentElement
    });
  }

  toggleSongPopover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      songPopoverOpen:   true,
      songPopoverAnchor: e.currentTarget.parentElement
    });
  }

  onRequestClose() {
    this.setState({
      searchPopoverOpen: false,
      songPopoverOpen:   false
    });
  }

  renderFiltersButton() {
    const isActive = this.props.modal && this.props.modal.type === 'MODAL_FILTER_SONGS';
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
        onClick={(e) => this.toggleSearchPopover(e)}>
        <span className={css.iconWrapper}>
          <SearchIcon className={css.icon} />
          <span className={css.iconText}>Search</span>
          <SearchPopover
            isOpen={this.state.searchPopoverOpen}
            anchorEl={this.state.searchPopoverAnchor}
            anchorOrigin={popoverStyle.anchor}
            targetOrigin={popoverStyle.target}
            onRequestClose={this.onRequestClose} />
        </span>
      </a>
    );
  }

  render() {
    return (
      <Row className={css.wrapper}>
        <Column style={{ padding: '0px', height: '100%' }}>
          <SongPopover
            songPopoverOpen={this.state.songPopoverOpen}
            songPopoverAnchor={this.state.songPopoverAnchor}
            onRequestClose={this.onRequestClose}
            currentSong={this.props.currentSong}
            toggleSongPopover={this.toggleSongPopover} />
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
