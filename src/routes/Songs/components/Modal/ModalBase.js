import React from 'react';
import AddSongModal from './AddSongContainer';
import FiltersModal from './FiltersContainer';


export const ModalBase = (props) => {
  return (
    <div>
      <AddSongModal {...props.modal.props} />
      <FiltersModal {...props.modal.props} />
    </div>
  )
};

ModalBase.propTypes = {
  props: React.PropTypes.object
};

export default ModalBase;
