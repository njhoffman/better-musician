import React from 'react';
import AddSongModal from 'containers/Modal/AddSongModal';
import FiltersModal from 'containers/Modal/FiltersModal';

const MODAL_COMPONENTS = {
  'ADD_SONG': AddSongModal,
  'FILTER_SONGS': FiltersModal
}

export const ModalBase = (props) => {
  console.info("adding modal", props);
	if (!props.modal.modalType) {
		return null;
	}

	// const SpecificModal = MODAL_COMPONENTS[props.modal.modalType];
  // return <SpecificModal {...props.modal.modalProps} />
  return <AddSongModal {...props.modal.modalProps} />
};

ModalBase.propTypes = {
  modalType: React.PropTypes.string,
  modalProps: React.PropTypes.object
};

export default ModalBase;
