import React, { Component }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Column } from 'react-foundation';
import { withStyles, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MdFilterList as FilterIcon } from 'react-icons/md';

import { uiShowModal } from 'actions/ui';
import { FILTERS_MODAL } from 'constants/ui';
import SearchPopover from './SearchPopover';
import SongPopover from './SongPopover';

// import css from './Header.scss';
const styles = (theme) => ({
  root: {
    width: 'fit-content',
    display: 'flex',
    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    textAlign: 'center',
    float: 'left',
    height: theme.app.headerHeight,
    [theme.breakpoints.down('sm')]: {
      height: `calc(${theme.app.headerHeight} * 0.6)`,
      flex: 'none',
      width: '100%',
      border: '0px',
      borderTop: `1px ${theme.palette.primary.main}33`,
      borderStyle: 'groove'
    }
    // when width < 450px, set width to 100% and headerRight to absolute position
  },
  column: {
    padding: '0'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    textDecoration: 'none',
    minWidth: '0px'
  },
  linkActive: { },
  linkItem: {
    width: '100%',
    justifyContent: 'center',
    height: '100%',
    padding: '0'
  },
  icon: { },
  iconText: {
    flex: 'none',
    padding: '0'
  }
});

const popoverStyle = {
  anchor: { horizontal: 'center', vertical: 'bottom' },
  transform: { horizontal: 'center', vertical: 'top' }
};

class HeaderControls extends Component {
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
      width: 0,
      height: 0
    },
    song: {
      isOpen: false,
      anchor: null,
      width: 0,
      height: 0
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
        width:  e.currentTarget.clientWidth,
        height: e.currentTarget.clientHeight
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
    const isActive = modal && modal.name === FILTERS_MODAL;
    return (
      <a
        className={`${classes.link} ${isActive ? classes.linkActive : ''}`}
        onClick={showFiltersModal} >
        <MenuItem className={classes.linkItem}>
          <ListItemIcon>
            <FilterIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText className={classes.iconText}>Filters</ListItemText>
        </MenuItem>
      </a>
    );
  }

  render() {
    const { classes, currentSong } = this.props;
    const { width, height } = this.state.song;
    return (
      <div className={classes.root}>
        <Column className={classes.column}>
          <SongPopover
            anchorOrigin={popoverStyle.anchor}
            transformOrigin={popoverStyle.transform}
            currentSong={currentSong}
            {...this.state.song}
            {...this.popoverActions} />
        </Column>
        <Column className={classes.column}>
          { this.renderFiltersButton() }
        </Column>
        <Column className={classes.column}>
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

export const showFiltersModal = () => uiShowModal(FILTERS_MODAL);

const mapActionCreators = {
  showFiltersModal
};

const mapStateToProps = (state) => ({
  modal        : state.ui.modal,
  currentSong  : state.SongsView ? state.SongsView.currentSong : null
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(HeaderControls));
