import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import withTheme from 'material-ui/styles/withTheme';
import SortIcon from 'react-icons/lib/md/import-export';

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
        <a
          style={{ color: this.props.theme.textColor }}
          onClick={this.setSort}>
          {this.props.displayName}
          <SortIcon />
        </a>
      </TableCell>
    );
  }
}

export default withTheme()(SongsListHeader);
