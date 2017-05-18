import React from 'react';
import PropTypes from 'prop-types';
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
  addSong:     PropTypes.func,
  uiHideModal: PropTypes.func,
  isOpen:      PropTypes.bool
};

export default FiltersModal;
