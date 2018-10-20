import React from 'react';
import PropTypes from 'prop-types';
import { Chip as MatChip, withStyles } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    maxWidth: '100px'
  },
  label: {
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflowX: 'hidden'
  }
});

const Chip = ({
  label,
  variant,
  classes,
  meta,
  style,
  input,
  ...props
}) => (
  <MatChip
    label={label || input.value}
    style={{ ...style, margin: '3px' }}
    classes={{
      root: classes.root,
      label: classes.label,
    }}
    {...props}
  />
);

Chip.propTypes = {
  label:    PropTypes.string,
  viewType: PropTypes.string,
  meta:     PropTypes.object,
  style:    PropTypes.object,
  input:    PropTypes.object.isRequired
};

export default withStyles(styles)(Chip);
