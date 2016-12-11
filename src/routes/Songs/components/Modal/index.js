import React from 'react';
import AddSongModal from '../../containers/Modal/AddSongContainer';
import FiltersModal from '../../containers/Modal/FiltersContainer';


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
