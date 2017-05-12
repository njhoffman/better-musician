import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeaderColumn } from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SortIcon from 'react-icons/lib/md/import-export';

export class SongsListHeader extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    muiTheme: PropTypes.object.isRequired,
    setSort: PropTypes.func.isRequired
  }

  setSort() {
    this.props.setSort(this.props.name);
  }

  render() {
    return (
      <TableHeaderColumn style={{ textAlign: 'center' }}>
        <a
          style={{ color: this.props.muiTheme.palette.accent1Color }}
          onClick={this.setSort}>
          {this.props.displayName}
          <SortIcon />
        </a>
      </TableHeaderColumn>
    );
  }
}

export default muiThemeable()(SongsListHeader);
