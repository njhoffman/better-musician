import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Divider, withStyles } from '@material-ui/core';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import { Row, Column } from 'react-foundation';

import { uiChangeSongModalView, uiHideModal } from 'actions/ui';
import { MODAL_VARIANT_EDIT, MODAL_VARIANT_VIEW, MODAL_VARIANT_ADD } from 'constants/ui';
import { currentSong as currentSongSelector, } from 'routes/Songs/modules/selectors';
import { addSong, updateSong, deleteSong } from 'actions/api';
import { changedFields } from 'selectors/form';

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
  update,
  hideModal,
  changed,
  currentSong,
  deleteCurrentSong
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
            onClick={deleteCurrentSong}>
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
        { variant === MODAL_VARIANT_VIEW && (
          <Button
            variant='contained'
            color='primary'
            onClick={edit}>
            {buttonLabel}
          </Button>
        )}
        { variant === MODAL_VARIANT_EDIT && (
          <Button
            variant='contained'
            color='primary'
            onClick={() => update(changed, currentSong.id)}>
            {buttonLabel}
          </Button>
        )}
        { variant === MODAL_VARIANT_ADD && (
          <Button
            variant='contained'
            color='primary'
            onClick={add}>
            {buttonLabel}
          </Button>
        )}

      </Column>
    </Row>
  );
};

ActionButtons.propTypes = {
  classes:           PropTypes.instanceOf(Object).isRequired,
  currentSong:       PropTypes.instanceOf(Object).isRequired,
  update:            PropTypes.func.isRequired,
  deleteCurrentSong: PropTypes.func.isRequired,
  add:               PropTypes.func.isRequired,
  edit:              PropTypes.func.isRequired,
  variant:           PropTypes.string.isRequired,
  hideModal:         PropTypes.func.isRequired,
  changed:           PropTypes.instanceOf(Object).isRequired
};

const mapDispatchToProps = {
  add:               addSong,
  update:            updateSong,
  edit:              () => uiChangeSongModalView(MODAL_VARIANT_EDIT),
  deleteCurrentSong: deleteSong,
  hideModal:         uiHideModal
};

const mapStateToProps = (state) => ({
  currentSong: currentSongSelector(state),
  changed:     changedFields(state.form.songForm),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ActionButtons)
);
