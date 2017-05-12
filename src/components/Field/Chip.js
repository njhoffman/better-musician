import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';

const RenderChip = ({
  label,
  viewType,
  meta,
  style,
  input,
  ...custom }) => {
  return (
    <Chip
      label={label}
      style={{ ...style }}
      {...custom}
    >
      {input.value}
    </Chip>
  );
};

RenderChip.propTypes = {
  label:    PropTypes.string,
  viewType: PropTypes.string,
  meta:     PropTypes.object,
  style:    PropTypes.object,
  input:    PropTypes.object.isRequired
};

export default RenderChip;
