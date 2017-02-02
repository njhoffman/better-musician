import React, { Component, PropTypes } from 'react';
import { Checkbox } from 'redux-form-material-ui'

const RenderCheckbox = ({
  viewType,
  meta: { touched, error },
  ...custom}) => (
    <Checkbox
      style={{ textAlign: 'left', marginLeft: 'auto', marginRight: 'auto', width: 'initial' }}
      labelStyle={{ width: '100%' }}
      {...custom}
    />
);

export default RenderCheckbox;
