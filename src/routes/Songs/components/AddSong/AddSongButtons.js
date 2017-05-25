import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatButton, RaisedButton } from 'material-ui';
import { MdDelete as DeleteIcon } from 'react-icons/lib/md';

import { uiShowModal, uiHideModal, MODAL_ADD_SONG } from 'store/ui';
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
        <FlatButton
          label='Delete'
          icon={<DeleteIcon />}
          style={{ float: 'left', color: '#ff8888' }}
          onTouchTap={props.addSong}
        />
      }
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={props.hideModal}
      />
      <RaisedButton
        label={buttonLabel}
        primary
        onTouchTap={props.modalView.isView() ? props.editSong : props.addSong}
      />
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
