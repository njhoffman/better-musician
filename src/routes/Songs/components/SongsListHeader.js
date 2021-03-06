import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  Tooltip,
  TableSortLabel,
  withStyles
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    padding: '2px 12px'
  }
});
const SongsListHeader = ({
  displayName,
  name,
  classes,
  className,
  setSort,
  sortDirection,
  sortField
}) => (
  <TableCell
    variant='head'
    className={`${classes.root} ${className}`}>
    <Tooltip
      title='Sort'
      placement='bottom-end'
      enterDelay={300}>
      <TableSortLabel
        active={sortField === name}
        direction={sortDirection}
        onClick={() => setSort(name)}>
        {displayName}
      </TableSortLabel>
    </Tooltip>
  </TableCell>
);

SongsListHeader.propTypes = {
  name:          PropTypes.string.isRequired,
  className:     PropTypes.string.isRequired,
  displayName:   PropTypes.string.isRequired,
  setSort:       PropTypes.func.isRequired,
  sortDirection: PropTypes.string.isRequired,
  sortField:     PropTypes.string.isRequired,
  classes:       PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(SongsListHeader);
