import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Column } from 'react-foundation';
import { Popover } from 'material-ui';
import withTheme from 'material-ui/styles/withTheme';

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
      <Link className={css.headerLink} to='/songs'>
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
        className={css.headerLink}
        onClick={() => showAdd()}>
        <span className={css.iconWrapper}>
          <AddIcon className={css.icon} />
          <span className={css.iconText}>Add Song</span>
        </span>
      </a>
    );
  };

  const renderSongButtonView = () => {
    const { instrumental: { headerLinksColor } } = theme;
    return (
      <a
        onTouchTap={() => showEdit()}
        className={css.headerLink}>
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
                  style={{ color: headerLinksColor }}
                  className={css.headerLink}
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
                <a
                  style={{ color: headerLinksColor }}
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
  };

  if (currentView === 'songsView') {
    if (currentSong) {
      return renderSongButtonView();
    }
    return renderSongButtonAdd();
  }
  return renderSongButtonOther();
};

SongPopover.propTypes = {
  theme:             PropTypes.object.isRequired,
  currentSong:       PropTypes.string,
  songPopoverOpen:   PropTypes.bool.isRequired,
  songPopoverAnchor: PropTypes.object.isRequired
};

const showAddSongModal = (actionType) => uiShowModal(MODAL_ADD_SONG, actionType);

const mapActionCreators = { showAddSongModal };

const mapStateToProps = (state) => ({
  currentView:     state.location ? state.location.currentView : null
});

export default withTheme()(connect(mapStateToProps, mapActionCreators)(SongPopover));
