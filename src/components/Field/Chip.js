import React, { Component, PropTypes } from 'react';
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

export default RenderChip;
