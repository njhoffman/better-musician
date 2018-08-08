import React from 'react';
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

import { uiShowModal } from 'actions/ui';
import { MODAL_ADD_SONG } from 'constants/ui';

const styles = {
  headerLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  downArrow : {
    '&:hover' : {
      stroke: 'white'
    },
    fontSize: '1.5em',
    marginLeft: '5px'
  },
  icon : {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paper: {
    paddingTop: '0',
    paddingBottom: '0'
  }
};

const popoverStyle = {
  anchor: { vertical: 'bottom', horizontal: 'left' },
  transform: { vertical: 'top', horizontal: 'center' }
};

const SongButtonOther = ({ classes }) => (
  <Link className={classes.headerLink} to='/songs'>
    <MenuItem>
      <ListItemIcon>
        <ViewIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText>
        View Songs
      </ListItemText>
    </MenuItem>
  </Link>
);

SongButtonOther.propTypes = {
  classes: PropTypes.object.isRequired
};

const SongButtonAdd = ({ classes, ...props }) => (
  <a onClick={() => showAddDialog({ ...props })}
    className={classes.headerLink}>
    <MenuItem>
      <ListItemIcon>
        <AddIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText>
        Add Song
      </ListItemText>
    </MenuItem>
  </a>
);

SongButtonAdd.propTypes = {
  classes: PropTypes.object.isRequired
};

const SongButtonView = ({
  classes, isOpen, anchor, width,
  open, close, toggle, closeAll,
  ...props
}) => (
  <a className={classes.headerLink}
    onClick={() => showEditDialog({ ...props, closeAll })} >
    <MenuItem
      selected={Boolean(isOpen)}
      onMouseEnter={(e) => open('song', e)}>
      <ListItemIcon>
        <EditIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText>
        Edit Song
        <ArrowDropDownIcon
          className={classes.downArrow}
          onClick={(e) => toggle('song', e)}
        />
      </ListItemText>
    </MenuItem>
    <Menu
      open={Boolean(isOpen)}
      anchorEl={anchor}
      anchorOrigin={popoverStyle.anchor}
      getContentAnchorEl={null}
      transformOrigin={popoverStyle.target}
      MenuListProps={{
        style: { paddingTop: '0', paddingBottom: '0' },
        onMouseLeave: () => close('song')
      }}
      disableRestoreFocus={true}
      onClose={() => close('song')}>
      <MenuItem
        style={{ width }}
        onClick={() => showAddDialog({ ...props, closeAll})}>
        <ListItemIcon>
          <AddIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>
          Add Song
        </ListItemText>
      </MenuItem>
      <MenuItem style={{ width }}>
        <ListItemIcon>
          <DeleteIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>
          Delete Song
        </ListItemText>
      </MenuItem>
    </Menu>
  </a>
);

SongButtonView.propTypes = {
  classes:     PropTypes.object.isRequired,
  isOpen:      PropTypes.bool.isRequired,
  anchor:      PropTypes.object,
  width:       PropTypes.number,
  open:        PropTypes.func.isRequired,
  close:       PropTypes.func.isRequired,
  toggle:      PropTypes.func.isRequired,
  closeAll:    PropTypes.func.isRequired
};

export const SongPopover = ({ currentView, currentSong, ...props }) => {
  return (currentView === 'Songs'
    ? (currentSong ? SongButtonView(props) : SongButtonAdd(props))
    : SongButtonOther(props)
  );
};

SongPopover.propTypes = {
  currentView: PropTypes.string,
  currentSong: PropTypes.string
};

const showAddSongModal = (actionType) => uiShowModal(MODAL_ADD_SONG, actionType);

const showEditDialog = ({ closeAll, showAddSongModal }) => {
  closeAll();
  showAddSongModal('edit');
};

const showAddDialog = ({ closeAll, showAddSongModal }) => {
  closeAll();
  showAddSongModal('add');
};

const mapActionCreators = {
  showAddSongModal
};

const mapStateToProps = (state) => ({
  currentView: state.ui.currentView ? state.ui.currentView : null
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SongPopover));
