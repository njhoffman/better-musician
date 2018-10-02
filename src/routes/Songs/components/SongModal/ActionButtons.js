import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Divider, withStyles } from '@material-ui/core';
import { MdDelete as DeleteIcon } from 'react-icons/md';

import { uiShowSongModal, uiHideModal } from 'actions/ui';
import { MODAL_VARIANT_EDIT, MODAL_VARIANT_VIEW, MODAL_VARIANT_ADD } from 'constants/ui';
import { addSong } from 'actions/api';
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
  addSong,
  editSong,
  variant,
  hideModal
}) => {

  const buttonLabel = variant === MODAL_VARIANT_VIEW
    ? 'Edit' : MODAL_VARIANT_EDIT
    ? 'Save' : 'Add';

  return (
    <Row className={classes.root}>
      <Divider />
      <Column className={classes.left}>
        {variant !== MODAL_VARIANT_ADD &&
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
          onClick={variant === MODAL_VARIANT_VIEW ? editSong : addSong}>
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
  variant   : PropTypes.string.isRequired,
  hideModal : PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addSong,
  editSong : () => uiShowSongModal(MODAL_VARIANT_EDIT),
  hideModal: uiHideModal
};

const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ActionButtons)
);
