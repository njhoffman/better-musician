import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import SearchPopover from './SearchPopover';
import SongPopover from './SongPopover';
import { withStyles } from '@material-ui/core';

/* eslint-disable no-multi-spaces */
import {
  MdFilterList    as FilterIcon,
  MdSearch        as SearchIcon
} from 'react-icons/lib/md';
/* eslint-enable no-multi-spaces */

import css from './Header.scss';
const styles = {
  headerMiddle: {
    width: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    textAlign: 'center'
  },
  headerLink: {
    width: '100%',
    height: '100%',
    display: 'table',
    textDecoration: 'none',
    cursor: 'pointer',
    verticalAlign: 'middle',
    '&:hover' : {
      backgroundColor: 'rgba(255, 255, 255, 0.078430)'
    }
  }
};

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
        className={this.props.classes.headerLink + ' ' + (isActive ? css.headerLinkActive : '')}
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
      <a className={this.props.classes.headerLink}
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
      <Row className={this.props.classes.headerMiddle}>
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
export default withStyles(styles)(HeaderMiddle);
