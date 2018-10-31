import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormControl, Paper, MenuItem } from '@material-ui/core';

import { FIELD_VIEW } from 'constants/ui';

const styles = (theme) => ({
  root: {
    width: '100%'
    // flexGrow: 1,
    // height: 250,
  },
  container: {
    // flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 3,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap'
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const getSuggestions = ({ options, inputValue, maxResults }) => options.filter(
  (option) => !inputValue || option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
).slice(0, maxResults);

const renderInput = ({
  InputProps,
  InputLabelProps,
  classes,
  ref,
  ...props
}) => (
  <TextField
    InputProps={{
      inputRef: ref,
      classes: {
        root: classes.inputRoot
      },
      ...InputProps
    }}
    InputLabelProps={{
      ...InputLabelProps
    }}
    {...props}
  />
);

const renderSuggestion = ({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) => {
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={highlightedIndex === index}
      component='div'
      style={{ fontWeight: isSelected ? 500 : 400 }}>
      {suggestion.label}
    </MenuItem>
  );
};

renderSuggestion.defaultProps = {
  highlightedIndex: null,
  selectedItem: null
};

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.instanceOf(Object).isRequired,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({
    label: PropTypes.string
  }).isRequired,
};

const AutoComplete = ({
  fullWidth,
  classes,
  label,
  options,
  input,
  meta,
  mode,
  disabled,
  maxResults,
  ...props
}) => (
  <FormControl className={classes.root}>
    <Downshift
      {...input}
      onStateChange={({ inputValue }) => input.onChange(inputValue)}
      onFocus={() => input.onFocus()}
      selectedItem={input.value}>
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex
      }) => (
        <div className={classes.container}>
          {renderInput({
            fullWidth: fullWidth !== false,
            classes,
            meta,
            label,
            name: input.name,
            InputLabelProps: { },
            InputProps: getInputProps({
              disableUnderline: mode === FIELD_VIEW,
              disabled: mode === FIELD_VIEW || disabled,
              ...input,
              ...props
              // placeholder: 'Search',
            })
          })}
          {isOpen ? (
            <Paper className={classes.paper} square>
              {getSuggestions({ options, inputValue, maxResults }).map(
                (suggestion, index) => renderSuggestion({
                  suggestion,
                  index,
                  itemProps: getItemProps({ item: suggestion.label }),
                  highlightedIndex,
                  selectedItem,
                })
              )}
            </Paper>
          ) : null}
        </div>
      )}
    </Downshift>
  </FormControl>
);

AutoComplete.defaultProps = {
  label: '',
  options: []
};

AutoComplete.propTypes = {
  label:   PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(AutoComplete);
