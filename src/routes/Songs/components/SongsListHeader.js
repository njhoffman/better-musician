import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  Tooltip,
  TableSortLabel,
  withStyles
} from '@material-ui/core';

const styles = (theme) => ({
  root: { },
  centered: {
    textAlign: 'center'
  }
});
const SongsListHeader = ({
  displayName,
  name,
  classes,
  centered,
  setSort
}) => (
  <TableCell
    variant='head'
    className={`${classes.root} ${centered ? classes.centered : ''}`} >
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
  setSort: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  centered: PropTypes.bool
};

export default withStyles(styles)(SongsListHeader);
