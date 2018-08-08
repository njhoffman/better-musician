import React from 'react';
import PropTypes from 'prop-types';
// import { MenuItem } from '@material-ui/core';
import { Field } from 'redux-form';
import { Select } from 'redux-form-material-ui';

// const generateMenu = (dataSource) => {
//   let items = [];
//   const isArray = Array.isArray(dataSource);
//   // assign value to key if dataSource is an object, otherwise assign scalar value
//   Object.keys(dataSource).forEach(key => {
//     items.push(
//       <MenuItem
//         value={isArray ? dataSource[key] : key}
//         key={isArray ? dataSource[key] : key}
//         primaryText={dataSource[key]}
//       />
//     );
//   });
//   return items;
// };
//
const RenderSelect = ({
  label,
  viewType,
  dataSource,
  style,
  meta,
  ...custom
}) => (
  <Field
    component={Select}
    name={label}
    style={{ ...style, ...{ maxWidth: '100%' } }}
    {...custom} />
);

RenderSelect.propTypes = {
  label:      PropTypes.string,
  viewType:   PropTypes.string,
  dataSource: PropTypes.any,
  style:      PropTypes.object,
  meta:       PropTypes.object
};

export default RenderSelect;
