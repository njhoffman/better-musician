import React from 'react';
import PropTypes from 'prop-types';

import MaterialTextField from '@material-ui/core/TextField'
import createComponent from './createComponent'
import mapError from './mapError'

const TextField = createComponent(
  MaterialTextField, ({
    defaultValue,
    ...props
  }) => ({
    ...mapError(props)
  })
);

const RenderText = ({
  meta,
  style,
  ...props
}) => (
  <TextField
    error={meta && meta.touched && meta.error}
    style={{ ...style, ...{ maxWidth: '100%' } }}
    {...props}
  />
);

RenderText.propTypes = {
  inputStyle : PropTypes.object,
  label      : PropTypes.string,
  meta       : PropTypes.object,
  style      : PropTypes.object,
  width      : PropTypes.number
};

export default RenderText;
