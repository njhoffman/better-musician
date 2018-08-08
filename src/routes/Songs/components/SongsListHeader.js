import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableCell, Tooltip, TableSortLabel, withTheme } from '@material-ui/core';

export class SongsListHeader extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    // className: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired
  }

  setSort() {
    this.props.setSort(this.props.name);
  }

  render() {
    return (
      <TableCell
        style={{ textAlign: 'center' }}
        variant='head'
        className={this.props.className}>
        <Tooltip
          title='Sort'
          placement='bottom-end'
          enterDelay={300}>
          <TableSortLabel
            active={true}
            style={{ color: this.props.theme.textColor }}
            onClick={this.setSort}>
            {this.props.displayName}
          </TableSortLabel>
        </Tooltip>
      </TableCell>
    );
  }
}

export default withTheme()(SongsListHeader);
