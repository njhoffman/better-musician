import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Divider, withStyles } from '@material-ui/core';
import { MdDelete as DeleteIcon } from 'react-icons/md';

import { uiShowModal, uiHideModal } from 'actions/ui';
import { MODAL_ADD_SONG } from 'constants/ui';
import { addSong } from 'store/api';
import { Row, Column } from 'react-foundation';

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  left: {
    flex: 1
  },
  right: {
    flex: 1,
    textAlign: 'right'
  },
  deleteButton: {
    color: theme.palette.error.main
  }
});

export const ActionButtons = ({
  classes,
  modalView,
  addSong,
  editSong,
  hideModal
}) => {
  const buttonLabel = modalView.isView()
    ? 'Edit' : modalView.isEdit()
    ? 'Save' : 'Add';

  return (
    <Row className={classes.root}>
      <Divider />
      <Column className={classes.left}>
        {!modalView.isAdd() &&
          <Button
            variant='flat'
            className={classes.deleteButton}
            onClick={addSong}>
            <DeleteIcon />
            Delete
          </Button>
        }
      </Column>
      <Column className={classes.right}>
        <Button
          variant='flat'
          color='primary'
          onClick={hideModal}>
          Cancel
        </Button>
        <Button
          variant='raised'
          color='primary'
          onClick={modalView.isView() ? editSong : addSong}>
          {buttonLabel}
        </Button>
      </Column>
    </Row>
  );
};

ActionButtons.propTypes = {
  classes   : PropTypes.object.isRequired,
  addSong   : PropTypes.func.isRequired,
  editSong  : PropTypes.func.isRequired,
  modalView : PropTypes.object.isRequired,
  hideModal : PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addSong,
  editSong : () => uiShowModal(MODAL_ADD_SONG, 'edit'),
  hideModal: uiHideModal
};

const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ActionButtons)
);
