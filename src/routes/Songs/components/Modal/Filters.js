import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
// import css from './Counter.scss';

export const FiltersModal = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={ props.hideModal }
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={props.hideModal}
    />
  ];
 return (
    <Dialog
        title="Filters Dialog"
        modal={false}
        actions={actions}
        open={false}
    >
      <p>Filters</p>
    </Dialog>
  )
};

FiltersModal.propTypes = {
  addSong: React.PropTypes.func,
  hideModal: React.PropTypes.func
};

export default FiltersModal;
