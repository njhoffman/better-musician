import React from 'react';
import PropTypes from 'prop-types';
import { Chip as MatChip, withStyles } from '@material-ui/core';
import { FIELD_EDIT } from 'constants/ui';

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

Chip.defaultProps = {
  mode: FIELD_EDIT,
  style: {}
};

Chip.propTypes = {
  label : PropTypes.string.isRequired,
  mode  : PropTypes.string,
  meta  : PropTypes.instanceOf(Object).isRequired,
  style : PropTypes.instanceOf(Object),
  input : PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(Chip);
