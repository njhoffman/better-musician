import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar as MdSnackbar } from 'material-ui';

class Snackbar extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    uiHideSnackbar: PropTypes.func.isRequired
  };

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
