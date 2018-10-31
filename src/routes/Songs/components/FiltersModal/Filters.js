import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog } from '@material-ui/core';
import { FILTERS_MODAL } from 'constants/ui';
import { uiHideModal } from 'actions/ui';

export const FiltersModal = ({ hideModal, isOpen }) => {
  const actions = [
    <Button
      key={0}
      label='Cancel'
      variant='text'
      primary
      onTouchTap={hideModal}
    />,
    <Button
      key={1}
      label='Submit'
      variant='text'
      primary
      keyboardFocused
      onTouchTap={hideModal}
    />
  ];
  return (
    <Dialog
      title='Filters Dialog'
      modal={false}
      actions={actions}
      open={isOpen}>
      <p>Filters</p>
    </Dialog>
  );
};

FiltersModal.defaultProps = {
  isOpen: false
};

FiltersModal.propTypes = {
  hideModal:   PropTypes.func.isRequired,
  isOpen:      PropTypes.bool
};

const mapDispatchToProps = {
  hideModal: uiHideModal
};

const mapStateToProps = (state) => ({
  modal:         state.ui.modal,
  isOpen:        state.ui.modal.name === FILTERS_MODAL
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);
