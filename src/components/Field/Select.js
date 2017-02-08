import React, { PropTypes } from 'react';
import { MenuItem } from 'material-ui';
import { SelectField } from 'redux-form-material-ui';

const generateMenu = (dataSource) => {
  let items = [];
  const isArray = Array.isArray(dataSource);
  // assign value to key if dataSource is an object, otherwise assign scalar value
  Object.keys(dataSource).forEach(key => {
    items.push(<MenuItem
      value={isArray ? dataSource[key] : key}
      key={isArray ? dataSource[key] : key}
      primaryText={dataSource[key]} />);
  });
  return items;
};

const RenderSelect = ({
  label,
  viewType,
  dataSource,
  style,
  meta,
  ...custom }) => (
    <SelectField
      floatingLabelText={label}
      errorText={meta && meta.touched && meta.error}
      inputStyle={{ boxShadow: 'none', maxWidth: '100%' }}
      style={{ ...style, ...{ maxWidth: '100%' } }}
      children={generateMenu(dataSource)}
      {...custom} />
);

RenderSelect.propTypes = {
  label:      PropTypes.string,
  viewType:   PropTypes.string,
  dataSource: PropTypes.array.isRequired,
  style:      PropTypes.object,
  meta:       PropTypes.object
};

export default RenderSelect;
