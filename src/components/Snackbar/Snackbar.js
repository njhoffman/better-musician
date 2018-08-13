import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar as MdSnackbar } from '@material-ui/core';

class Snackbar extends Component {
  static propTypes = {
    isOpen         : PropTypes.bool.isRequired,
    message        : PropTypes.string.isRequired,
    uiHideSnackbar : PropTypes.func.isRequired
  };

  render() {
    return (
      <MdSnackbar
        open={this.props.isOpen}
        message={this.props.message}
        onRequestClose={this.props.uiHideSnackbar}
        autoHideDuration={4000} />
    );
  }
}

export default Snackbar;
