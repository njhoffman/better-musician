import React from 'react';
import PropTypes from 'prop-types';
import createComponent from './createFormField';
import mapError from './mapError';
import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';

const generateMenu = (dataSource) => {
  let items = [];
  const isArray = Array.isArray(dataSource);
  // assign value to key if dataSource is an object, otherwise assign scalar value
  Object.keys(dataSource).forEach(key => {
    items.push(
      <MenuItem
        value={isArray ? dataSource[key] : key}
        key={isArray ? dataSource[key] : key}>
        {dataSource[key]}
      </MenuItem>
    );
  });
  return items;
};

export const SelectForm = createComponent(Select, ({
    input: { onChange, value, onBlur, ...inputProps },
    onChange: onChangeFromField,
    defaultValue,
    ...props
}) => ({
  ...mapError({ ...props, hasHelperText: false }),
  ...inputProps,
  value: value,
  onChange: event => {
    onChange(event.target.value);
    if (onChangeFromField) {
      onChangeFromField(event.target.value);
    }
  },
  onBlur: () => onBlur(value)
}));

const SelectField = ({
  options,
  optionValues,
  ...props
}) => (
  <FormControl style={{ minWidth: '120px' }}>
    <InputLabel htmlFor='age-helper'>
      Field Type
    </InputLabel>
    <SelectForm {...props}>
      {options && generateMenu(options)}
      {optionValues && generateMenu(optionValues)}
    </SelectForm>
  </FormControl>
);

SelectField.propTypes = {
  options: PropTypes.object.isRequired
};

export default SelectField;
