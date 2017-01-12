import React from 'react';
import AddSongModal from './AddSongContainer';
import FiltersModal from './FiltersContainer';


export const ModalBase = (props) => {

  return (
    <div>
      <AddSongModal {...props.modal.modalProps} />
      <FiltersModal {...props.modal.modalProps} />
    </div>
  )
};

ModalBase.propTypes = {
  modalProps: React.PropTypes.object
};

export default ModalBase;
