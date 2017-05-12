import React from 'react';
import PropTypes from 'prop-types';
import AddSongModal from './AddSongContainer';
import FiltersModal from './FiltersContainer';

export const ModalBase = (props) => {
  return (
    <div>
      <AddSongModal {...props.modal.props} />
      <FiltersModal {...props.modal.props} />
    </div>
  );
};

ModalBase.propTypes = {
  modal: PropTypes.object.isRequired
};

export default ModalBase;
