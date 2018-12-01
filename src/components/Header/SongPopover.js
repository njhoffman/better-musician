import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';

/* eslint-disable no-multi-spaces */
import {
  MdLibraryAdd    as AddIcon,
  MdModeEdit      as EditIcon,
  MdDelete        as DeleteIcon,
  MdDashboard     as ViewIcon,
  MdArrowDropDown as ArrowDropDownIcon
} from 'react-icons/md';
/* eslint-enable no-multi-spaces */

import { MODAL_VARIANT_EDIT, MODAL_VARIANT_ADD } from 'constants/ui';
import { uiShowSongModal } from 'actions/ui';
import { deleteSong } from 'actions/api';

const styles = (theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    cursor: 'pointer',
    textDecoration: 'none',
    minWidth: '0px',
    padding: '0',
  },
  active: {
    stroke: theme.palette.text.primary,
    color: `${theme.palette.text.primary} !important`
  },
  linkItem: {
    color: theme.app.headerLinksColor,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: '0',
    '&:hover': {
      color: theme.palette.text.primary
    }
  },
  downArrow : {
    '&:hover' : {
      stroke: 'white'
    },
    height: '100%',
    color: 'inherit',
    fontSize: '1.5em',
    marginLeft: '5px'
  },
  editIcon: {
    color: 'inherit',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
    }
  },
  icon: {
    color: 'inherit',
    marginLeft: '8px'
  },
  iconTextWrapper: {
    flex: 'none',
    padding: '0',
    color: 'inherit'
  },
  iconText: {
    color: 'inherit'
  },
  sublinksWrapper: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-16px'
    }
  },
  sublink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0',
    minHeight: '40px',
  },
  sublinkIcon: { },
  sublinkText: {
    padding: 0
  },
});

const popoverStyle = {
  anchor: { vertical: 'bottom', horizontal: 'left' },
  transform: { vertical: 'top', horizontal: 'center' }
};

const showAddSongDialog = (e, { closeAll, showSongModal }) => {
  e.stopPropagation();
  closeAll();
  showSongModal(MODAL_VARIANT_ADD);
};

const showEditSongDialog = (e, { closeAll, showSongModal }) => {
  e.stopPropagation();
  closeAll();
  showSongModal(MODAL_VARIANT_EDIT);
};

const SongButtonOther = ({ classes }) => (
  <Link className={classes.link} to='/songs'>
    <MenuItem className={classes.linkItem}>
      <ListItemIcon classes={{ root: classes.icon }}>
        <ViewIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText
        className={classes.iconTextWrapper}
        primaryTypographyProps={{ className: classes.iconText }}>
        Songs
      </ListItemText>
    </MenuItem>
  </Link>
);

SongButtonOther.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

const SongButtonAdd = ({ classes, ...props }) => (
  <MenuItem
    onClick={(e) => showAddSongDialog(e, { ...props })}
    className={classes.linkItem}>
    <ListItemIcon classes={{ root: classes.icon }}>
      <AddIcon className={classes.icon} />
    </ListItemIcon>
    <ListItemText
      className={classes.iconTextWrapper}
      primaryTypographyProps={{ className: classes.iconText }}>
      Add Song
    </ListItemText>
  </MenuItem>
);

SongButtonAdd.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

const SongButtonView = ({
  classes, isOpen, anchor, width, height, deleteSelectedSong,
  open, close, toggle, closeAll, currentSong,
  ...props
}) => (
  <Fragment>
    <MenuItem
      className={classes.linkItem}
      selected={Boolean(isOpen)}>
      <ListItemIcon
        onClick={(e) => showEditSongDialog(e, { ...props, closeAll })}
        onMouseEnter={(e) => open('song', e.currentTarget.parentElement)}
        classes={{ root: classes.icon }}>
        <EditIcon className={classes.editIcon} />
      </ListItemIcon>
      <ListItemText
        onClick={(e) => showEditSongDialog(e, { ...props, closeAll })}
        onMouseEnter={(e) => open('song', e.currentTarget.parentElement)}
        className={classes.iconTextWrapper}
        primaryTypographyProps={{ className: classes.iconText }}>
        Edit Song
      </ListItemText>
      <ArrowDropDownIcon
        className={`${classes.downArrow} ${isOpen ? classes.active : ''}`}
        onClick={(e) => {
          e.preventDefault();
          toggle('song', e.currentTarget.parentElement);
        }}
      />
    </MenuItem>
    <Menu
      open={Boolean(isOpen)}
      anchorEl={anchor}
      anchorOrigin={popoverStyle.anchor}
      getContentAnchorEl={null}
      transformOrigin={popoverStyle.target}
      className={classes.subinksWrapper}
      PopoverClasses={{ paper: classes.sublinksWrapper }}
      MenuListProps={{
        style: { paddingTop: '0', paddingBottom: '0' },
        onMouseLeave: () => close('song')
      }}
      disableRestoreFocus
      onClose={() => close('song')}>
      <MenuItem
        className={classes.sublink}
        style={{ width, height }}
        onClick={(e) => showAddSongDialog(e, { ...props, closeAll })}>
        <ListItemIcon className={classes.sublinkIcon}>
          <AddIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText className={classes.sublinkText}>
          Add Song
        </ListItemText>
      </MenuItem>
      <MenuItem
        onClick={(e) => deleteSelectedSong(currentSong)}
        style={{ width, height }}
        className={classes.sublink}>
        <ListItemIcon className={classes.sublinkIcon}>
          <DeleteIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText className={classes.sublinkText}>
          Delete Song
        </ListItemText>
      </MenuItem>
    </Menu>
  </Fragment>
);

SongButtonView.defaultProps = {
  anchor: null,
  width:  null,
  height: null,
  currentSong: null
};

SongButtonView.propTypes = {
  classes:            PropTypes.instanceOf(Object).isRequired,
  isOpen:             PropTypes.bool.isRequired,
  anchor:             PropTypes.instanceOf(HTMLElement),
  width:              PropTypes.number,
  height:             PropTypes.number,
  open:               PropTypes.func.isRequired,
  close:              PropTypes.func.isRequired,
  toggle:             PropTypes.func.isRequired,
  closeAll:           PropTypes.func.isRequired,
  currentSong:        PropTypes.string,
  deleteSelectedSong: PropTypes.func.isRequired

};

const SongPopover = ({ currentView, currentSong, ...props }) => {
  if (currentView === 'Songs') {
    return currentSong ? SongButtonView({ ...props, currentSong }) : SongButtonAdd(props);
  }
  return SongButtonOther(props);
};

SongPopover.propTypes = {
  currentView: PropTypes.string,
  currentSong: PropTypes.string
};

const mapActionCreators = {
  showSongModal:      uiShowSongModal,
  deleteSelectedSong: deleteSong
};

const mapStateToProps = (state) => ({
  currentView: state.ui.currentView ? state.ui.currentView : null
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SongPopover));
