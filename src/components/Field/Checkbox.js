import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'redux-form-material-ui';

const RenderCheckbox = ({
  viewType,
  meta: { touched, error },
  ...custom }) => (
  <Checkbox
      style={{ textAlign: 'left', marginLeft: 'auto', marginRight: 'auto', width: 'initial' }}
      labelStyle={{ width: '100%' }}
      {...custom}
  />
);

RenderCheckbox.propTypes = {
  viewType: PropTypes.string,
  meta: PropTypes.object
};

export default RenderCheckbox;
