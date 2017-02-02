import React, { Component } from 'react';
import { Snackbar as MdSnackbar } from 'material-ui';

class Snackbar extends Component {
  render() {
    const { props } = this;
    return (
      <MdSnackbar
        open={props.isOpen}
        message={props.message}
        onRequestClose={props.uiHideSnackbar}
        autoHideDuration={4000} />
    );
  }
}

export default Snackbar;
