import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

const RenderChip = ({
  label,
  viewType,
  meta,
  style,
  input,
  ...props
}) => (
  <Chip
    label={label || input.value}
    style={{ ...style }}
    {...props}
  />
);

RenderChip.propTypes = {
  label:    PropTypes.string,
  viewType: PropTypes.string,
  meta:     PropTypes.object,
  style:    PropTypes.object,
  input:    PropTypes.object.isRequired
};

export default RenderChip;
