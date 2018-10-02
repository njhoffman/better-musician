import React from 'react';
import PropTypes from 'prop-types';
import { Chip as MatChip } from '@material-ui/core';

const Chip = ({
  label,
  viewType,
  meta,
  style,
  input,
  ...props
}) => (
  <MatChip
    label={label || input.value}
    style={{ ...style }}
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

export default Chip;
