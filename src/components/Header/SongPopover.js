import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Column } from 'react-foundation';
import { withStyles, Popover } from '@material-ui/core';

/* eslint-disable no-multi-spaces */
import {
  MdLibraryAdd    as AddIcon,
  MdModeEdit      as EditIcon,
  MdDelete        as DeleteIcon,
  MdDashboard     as ViewIcon,
  MdArrowDropDown as ArrowDropDownIcon
} from 'react-icons/lib/md';
/* eslint-enable no-multi-spaces */

import css from './Header.scss';

import {
  uiShowModal,
  MODAL_ADD_SONG
} from 'store/ui';

const styles = {
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

export const SongPopover = (props) => {
  const {
    currentView,
    onRequestClose,
    showAddSongModal,
    songPopoverOpen,
    songPopoverAnchor,
    toggleSongPopover,
    theme,
    currentSong
  } = props;

  const showEdit = () => {
    onRequestClose();
    showAddSongModal('edit');
  };

  const showAdd = () => {
    onRequestClose();
    showAddSongModal('add');
  };

  const renderSongButtonOther = () => {
    return (
      <Link className={props.classes.headerLink} to='/songs'>
        <span className={css.iconWrapper}>
          <ViewIcon className={css.icon} />
          <span className={css.iconText}>View Songs</span>
        </span>
      </Link>
    );
  };

  const renderSongButtonAdd = () => {
    return (
      <a
        className={props.classes.headerLink}
        onClick={() => showAdd()}>
        <span className={css.iconWrapper}>
          <AddIcon className={css.icon} />
          <span className={css.iconText}>Add Song</span>
        </span>
      </a>
    );
  };

  const renderSongButtonView = () => {
    return (
      <a
        onTouchTap={() => showEdit()}
        className={props.classes.headerLink}>
        <span className={css.iconWrapper}>
          <EditIcon className={css.icon} />
          <span className={css.iconText}>Edit Song</span>
          <ArrowDropDownIcon
            className={css.downArrow}
            onTouchTap={(e) => toggleSongPopover(e)} />
          <Popover
            open={songPopoverOpen}
            anchorEl={songPopoverAnchor}
            anchorOrigin={popoverStyle.anchor}
            targetOrigin={popoverStyle.target}
            className={css.menuPopover}
            onRequestClose={() => onRequestClose()} >
            <Row className={css.row}>
              <Column className={css.column} >
                <a
                  className={props.classes.headerLink}
                  onClick={() => showAdd()} >
                  <span className={css.iconWrapper}>
                    <AddIcon style={{ margin: '0px 12px 0px -12px' }} className={css.icon} />
                    <span className={css.iconText}>Add Song</span>
                  </span>
                </a>
              </Column>
            </Row>
            <Row className={css.row}>
              <Column className={css.column}>
                <a className={props.classes.headerLink}>
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
  };

  if (currentView === 'Songs') {
    if (currentSong) {
      return renderSongButtonView();
    }
    return renderSongButtonAdd();
  }
  return renderSongButtonOther();
};

SongPopover.propTypes = {
  currentSong:       PropTypes.string,
  songPopoverOpen:   PropTypes.bool.isRequired,
  songPopoverAnchor: PropTypes.object.isRequired
};

const showAddSongModal = (actionType) => uiShowModal(MODAL_ADD_SONG, actionType);

const mapActionCreators = { showAddSongModal };

const mapStateToProps = (state) => ({
  currentView:     state.ui.currentView ? state.ui.currentView : null
});

export default (connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SongPopover)));
