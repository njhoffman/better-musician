import React, { Component } from 'react';
import { Popover, TextField } from 'material-ui';

class SearchPopover extends Component {
  render() {
    return (
      <Popover
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        zDepth={5}

      >
        <TextField
          floatingLabelText="Search ..."
        />
      </Popover>
    );
  }
}

export default SearchPopover;
