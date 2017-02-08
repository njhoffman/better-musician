import React, { Component, PropTypes } from 'react';
import { Popover, TextField } from 'material-ui';

class SearchPopover extends Component {
  static propTypes = {
    open: PropTypes.bool.isRquired,
    anchorEl: PropTypes.element,
    onRequestClose: PropTypes.func.isRequired
  }

  render() {
    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        style={{ borderRadius: '5px', padding: '5px', width: '25%' }}
        onRequestClose={this.props.onRequestClose}
        zDepth={5}

      >
        <TextField
          style={{ width: '100%', height: '43px' }}
          underlineShow={false}
          floatingLabelStyle={{ top: '20px' }}
          inputStyle={{ margin: '15px 0px 0px 0px', height: '25px', boxShadow: 'none' }}
          floatingLabelText='Search ...'
        />
      </Popover>
    );
  }
}

export default SearchPopover;
