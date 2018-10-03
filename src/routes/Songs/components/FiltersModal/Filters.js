import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog } from '@material-ui/core';
import { FILTERS_MODAL } from 'constants/ui';
import { uiHideModal } from 'actions/ui';

export const FiltersModal = (props) => {
  const actions = [
    <Button
      key={0}
      label='Cancel'
      variant='flat'
      primary
      onTouchTap={props.uiHideModal}
    />,
    <Button
      key={1}
      label='Submit'
      variant='flat'
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
  uiHideModal: PropTypes.func,
  isOpen:      PropTypes.bool
};

const mapDispatchToProps = {
  uiHideModal
};

const mapStateToProps = (state) => ({
  modal:         state.ui.modal,
  isOpen:        state.ui.modal.name === FILTERS_MODAL
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);
