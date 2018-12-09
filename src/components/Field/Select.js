import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Select as MaterialSelect,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Typography,
  TextField,
  withStyles
} from '@material-ui/core';
import { FIELD_EDIT, FIELD_VIEW, FIELD_VIEW_ALT } from 'constants/ui';
import createComponent from './createFormField';
import mapError from './mapError';

const styles = (theme) => ({
  label: {
    whiteSpace: 'nowrap',
  },
  viewLabel: {
    textAlign: 'center'
  },
  viewValue: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    marginBottom: theme.spacing.unit
  }
});

const generateMenu = (selectItems) => {
  const items = [
    <MenuItem key={-1} value='' disabled>Select...</MenuItem>
  ];

  if (_.isArray(selectItems)) {
    selectItems.forEach(item => {
      const key = _.isObject(item) ? _.keys(item)[0] : item;
      const value = _.isObject(item) ? item[key] : item;
      items.push(
        <MenuItem value={key} key={key}>
          {value}
        </MenuItem>
      );
    });
  } else {
    _.keys(selectItems).forEach(key => {
      items.push(
        <MenuItem value={key} key={key}>
          {selectItems[key]}
        </MenuItem>
      );
    });
  }
  return items;
};

const SelectForm = createComponent(MaterialSelect, ({
  input: { onChange, value, onBlur, ...inputProps },
  onChange: onChangeFromField,
  defaultValue,
  ...props
}) => ({
  ...mapError({ ...props, hasHelperText: false }),
  ...inputProps,
  value,
  onChange: event => {
    onChange(event.target.value);
    if (onChangeFromField) {
      onChangeFromField(event.target.value);
    }
  },
  onBlur: () => onBlur(value)
}));

const createSelect = (SelectComponent) => ({
  label,
  options,
  mode,
  input,
  initialValues,
  classes,
  ...props
}) => {
  if (mode !== FIELD_EDIT) {
    return (
      <FormControl className={`${mode === FIELD_VIEW_ALT ? classes.outlined : ''}`}>
        <FormHelperText className={classes.viewLabel}>
          {label}
        </FormHelperText>
        <Typography className={classes.viewValue}>
          {input.value}
        </Typography>
      </FormControl>
    );
  }
  return (
    <FormControl style={{ minWidth: '120px' }}>
      <InputLabel shrink className={classes.label}>
        {label}
      </InputLabel>
      <SelectComponent {...{ ...props, input, label }} displayEmpty>
        {generateMenu(options)}
      </SelectComponent>
    </FormControl>
  );
};

const defaultProps = {
  label: '',
  mode: FIELD_EDIT
};

const propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired, // can be object or array
  label: PropTypes.string
};

const ConnectedSelect = withStyles(styles)(createSelect(SelectForm));
ConnectedSelect.defaultProps = defaultProps;
ConnectedSelect.propTypes = propTypes;

const Select = withStyles(styles)(createSelect(MaterialSelect));
Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

export { Select as default, ConnectedSelect };
