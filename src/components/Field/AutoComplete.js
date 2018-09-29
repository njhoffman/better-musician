import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
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

const getSuggestions = (options, inputValue) => {
  return options.filter(option => {
    return (!inputValue || option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
  }).slice(0, 5);
};

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

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

const AutoComplete = ({
  classes,
  label,
  options,
  input,
  disableUnderline,
  meta,
  ...props
}) => (
  <Downshift
    {...input}
    onStateChange={({ inputValue }) => input.onChange(inputValue)}
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
          fullWidth: true,
          classes,
          meta,
          label,
          name: input.name,
          InputLabelProps: { disableUnderline },
          InputProps: getInputProps({
            ...input,
            ...props
            // placeholder: 'Search',
          })
        })}
        {isOpen ? (
          <Paper className={classes.paper} square>
            {getSuggestions(options, inputValue).map((suggestion, index) =>
              renderSuggestion({
                suggestion,
                index,
                itemProps: getItemProps({ item: suggestion.label }),
                highlightedIndex,
                selectedItem,
              }),
            )}
          </Paper>
        ) : null}
      </div>
    )}
  </Downshift>
);

AutoComplete.propTypes = {
  label:   PropTypes.string,
  options: PropTypes.array,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AutoComplete);
