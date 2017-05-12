import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, TextField } from 'material-ui';

class SearchPopover extends Component {
  static propTypes = {
    isOpen:         PropTypes.bool.isRequired,
    anchorEl:       PropTypes.object,
    onRequestClose: PropTypes.func.isRequired
  }

  render() {
    return (
      <Popover
        open={this.props.isOpen}
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
