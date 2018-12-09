import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment } from '@material-ui/core';

import { FIELD_EDIT } from 'constants/ui';
import Textbox, { ConnectedTextbox } from './Textbox';

const createNumberBox = (Component) => ({
  meta,
  fullWidth,
  style,
  unit,
  ...props
}) => (
  <Component
    type='number'
    min={0}
    style={{
      textAlign: 'center',
      width: '120px',
      ...style
    }}
    fullWidth={fullWidth || false}
    error={meta && meta.touched && meta.error}
    InputProps={{
      style: {
        textAlign: 'center'
      },
      endAdornment: unit ? (
        <InputAdornment variant='filled' position='end'>
          {unit}
        </InputAdornment>
      ) : null
    }}
    {...{ ...props, meta } }
  />
);

const defaultProps = {
  label: '',
  viewType: FIELD_EDIT
};

const propTypes = {
  label: PropTypes.string,
  meta: PropTypes.instanceOf(Object).isRequired,
  viewType: PropTypes.string
};

const NumberBox = createNumberBox(Textbox);
const ConnectedNumberBox = createNumberBox(ConnectedTextbox);
NumberBox.defaultProps = defaultProps;
NumberBox.propTypes = propTypes;
ConnectedNumberBox.defaultProps = defaultProps;
ConnectedNumberBox.propTypes = propTypes;

export { NumberBox as default, ConnectedNumberBox };
