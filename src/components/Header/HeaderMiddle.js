import React, { Component }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import SearchPopover from './SearchPopover';
import SongPopover from './SongPopover';
import { withStyles, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { uiShowModal } from 'actions/ui';
import { MODAL_FILTER_SONGS } from 'constants/ui';

import { MdFilterList as FilterIcon } from 'react-icons/lib/md';

// import css from './Header.scss';
const styles = {
  headerMiddle: {
    width: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    textAlign: 'center'
  },
  headerLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  headerLinkActive: { },
  iconWrapper: { },
  icon: { },
  iconText: { }
};

const popoverStyle = {
  anchor: { horizontal: 'center', vertical: 'bottom' },
  transform: { horizontal: 'center', vertical: 'top' }
};

class HeaderMiddle extends Component {
  static propTypes = {
    showFiltersModal: PropTypes.func.isRequired,
    currentSong:      PropTypes.string,
    modal:            PropTypes.object.isRequired,
    classes:          PropTypes.object.isRequired
  }

  defaultState = {
    search: {
      isOpen: false,
      anchor: null,
      width: 0
    },
    song: {
      isOpen: false,
      anchor: null,
      width: 0
    }
  };

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.defaultState);
    this.popoverActions = {
      toggle:   this.togglePopover.bind(this),
      open:     this.openPopover.bind(this),
      close:    this.closePopover.bind(this),
      closeAll: this.closeAll.bind(this),
    };
  }

  openPopover = (name, e) => {
    this.setState({
      [`${name}`]: {
        isOpen: true,
        anchor: e.currentTarget,
        width:  e.currentTarget.clientWidth
      }
    });
  }

  togglePopover = (name, e) => {
    this.setState({
      [`${name}`]: {
        isOpen: !this.state[`${name}`]['isOpen'],
        anchor: !this.state[`${name}`]['isOpen'] ? null : e.currentTarget
      }
    });
  }

  closePopover = (name) => {
    this.setState({
      [`${name}`]: {
        isOpen:  false,
        anchor: null
      }
    });
  }

  closeAll = () => {
    this.setState(this.defaultState);
  }

  renderFiltersButton() {
    const { modal, classes, showFiltersModal } = this.props;
    const isActive = modal && modal.type === 'MODAL_FILTER_SONGS';
    return (
      <a
        className={`${classes.headerLink} ${isActive ? classes.headerLinkActive : ''}`}
        onClick={showFiltersModal} >
        <MenuItem className={classes.iconWrapper}>
          <ListItemIcon>
            <FilterIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>Filters</ListItemText>
        </MenuItem>
      </a>
    );
  }

  render() {
    const { classes, currentSong } = this.props;
    return (
      <div className={classes.headerMiddle}>
        <Column style={{ padding: '0px', height: '100%' }}>
          <SongPopover
            anchorOrigin={popoverStyle.anchor}
            transformOrigin={popoverStyle.transform}
            currentSong={currentSong}
            {...this.state.song }
            {...this.popoverActions} />
        </Column>
        <Column style={{ padding: '0px', height: '100%' }}>
          { this.renderFiltersButton() }
        </Column>
        <Column style={{ padding: '0px', height: '100%' }}>
          <SearchPopover
            anchorOrigin={popoverStyle.anchor}
            transformOrigin={popoverStyle.transform}
            {...this.state.search }
            {...this.popoverActions} />
        </Column>
      </div>
    );
  }
}

export const showFiltersModal = () => uiShowModal(MODAL_FILTER_SONGS);

const mapActionCreators = {
  showFiltersModal
};

const mapStateToProps = (state) => ({
  modal        : state.ui.modal,
  currentSong  : state.SongsView ? state.SongsView.currentSong : null
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(HeaderMiddle));
