import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Divider, withStyles } from '@material-ui/core';
import { MdDelete as DeleteIcon } from 'react-icons/md';

import { uiChangeSongModalView, uiHideModal } from 'actions/ui';
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

const ActionButtons = ({
  classes,
  add,
  edit,
  variant,
  hideModal
}) => {
  let buttonLabel = 'Add';
  if (variant === MODAL_VARIANT_VIEW) {
    buttonLabel = 'Edit';
  } else if (MODAL_VARIANT_VIEW) {
    buttonLabel = 'Save';
  }

  return (
    <Row className={classes.root}>
      <Divider />
      <Column className={classes.left}>
        {variant !== MODAL_VARIANT_ADD && (
          <Button
            variant='text'
            className={classes.deleteButton}
            onClick={addSong}>
            <DeleteIcon />
            Delete
          </Button>
        )}
      </Column>
      <Column className={classes.right}>
        <Button
          variant='text'
          color='primary'
          onClick={() => hideModal()}>
          Cancel
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={variant === MODAL_VARIANT_VIEW ? edit : add}>
          {buttonLabel}
        </Button>
      </Column>
    </Row>
  );
};

ActionButtons.propTypes = {
  classes   : PropTypes.instanceOf(Object).isRequired,
  add       : PropTypes.func.isRequired,
  edit      : PropTypes.func.isRequired,
  variant   : PropTypes.string.isRequired,
  hideModal : PropTypes.func.isRequired
};

const mapDispatchToProps = {
  add: addSong,
  edit : () => uiChangeSongModalView(MODAL_VARIANT_EDIT),
  hideModal: uiHideModal
};

const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ActionButtons)
);
