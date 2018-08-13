import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { MdDelete as DeleteIcon } from 'react-icons/md';

import { uiShowModal, uiHideModal } from 'actions/ui';
import { MODAL_ADD_SONG } from 'constants/ui';
import { addSong } from 'store/api';

export const AddSongButtons = (props) => {
  const buttonLabel = props.modalView.isView()
    ? 'Edit'
    : props.modalView.isEdit()
      ? 'Save'
      : 'Add';

  return (
    <div>
      {!props.modalView.isAdd() &&
        <Button
          variant='flat'
          style={{ float: 'left', color: '#ff8888' }}
          onClick={props.addSong}>
          <DeleteIcon />
          Delete
        </Button>
      }
      <Button
        variant='flat'
        color='primary'
        onClick={props.hideModal}>
        Cancel
      </Button>
      <Button
        variant='raised'
        color='primary'
        onClick={props.modalView.isView() ? props.editSong : props.addSong}>
        {buttonLabel}
      </Button>
    </div>
  );
};

AddSongButtons.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddSongButtons);
