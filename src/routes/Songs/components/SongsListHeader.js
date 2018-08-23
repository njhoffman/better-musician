import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, Tooltip, TableSortLabel, withTheme } from '@material-ui/core';

const SongsListHeader = ({
  className,
  theme,
  displayName,
  name,
  setSort
}) => (
  <TableCell variant='head' className={className}>
    <Tooltip title='Sort' placement='bottom-end' enterDelay={300}>
      <TableSortLabel active={true} onClick={() => setSort(name)}>
        {displayName}
      </TableSortLabel>
    </Tooltip>
  </TableCell>
);

SongsListHeader.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired
};

export default withTheme()(SongsListHeader);
