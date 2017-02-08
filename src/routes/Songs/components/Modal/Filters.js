import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export const FiltersModal = (props) => {
  const actions = [
    <FlatButton
      label='Cancel'
      primary
      onTouchTap={props.uiHideModal}
    />,
    <FlatButton
      label='Submit'
      primary
      keyboardFocused
      onTouchTap={props.uiHideModal}
    />
  ];
  return (
    <Dialog
      title='Filters Dialog'
      modal={false}
      actions={actions}
      open={props.isOpen}>
      <p>Filters</p>
    </Dialog>
  );
};

FiltersModal.propTypes = {
  addSong:     React.PropTypes.func,
  uiHideModal: React.PropTypes.func,
  isOpen:      React.PropTypes.bool
};

export default FiltersModal;
