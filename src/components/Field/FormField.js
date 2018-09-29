import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import MultiSelect from './MultiSelect';
import Textbox from './Textbox';
import Slider from './Slider';
import NumberField from './Number';
import Checkbox from './Checkbox';
import Stars from './Stars';
import Difficulty from './Difficulty';
import AutoComplete from './AutoComplete';
import YouTubeLink from './YouTubeLink';
import Chip from './Chip';

import { withStyles } from '@material-ui/core';
import { Field } from 'redux-form';
import { Row, Column } from 'react-foundation';


/* eslint-disable no-multi-spaces */
// const fieldOptions = {
  // 0: { name: 'Text Box',          component: Textbox },
  // 1: { name: 'AutoComplete Box',  component: AutoComplete },
  // 2: { name: 'Select Menu',       component: Select },
  // 3: { name: 'Multi-Select Menu', component: Select },
  // 4: { name: 'Checkbox'        #<{(| component: RenderCheckbox |)}># },
  // 5: { name: 'Radio Buttons'   #<{(| component: RenderRadioButtons |)}># },
  // 6: { name: 'Date'            #<{(| component: RenderDate |)}># },
  // 7: { name: 'YouTube Link',      component: <YouTubeLink /> },
  // 8: { name: 'PDF Link'        #<{(| component: RenderPdfLink |)}># }
// };
/* eslint-enable no-multi-spaces */

const renderType = (type) => (
  type === 'select' || type === 'Select Menu' ? Select
  : type === 'text' || type === 'Text Box' ? Textbox
  : type === 'number' ? NumberField
  : type === 'slider' ? Slider
  : type === 'multiselect' || type === 'Multi-Select Menu' ? MultiSelect
  : type === 'autocomplete' || type === 'AutoComplete Box' ? AutoComplete
  : type === 'youtube' || type === 'YouTube Link' ? YouTubeLink
  : Checkbox
);

const styles = (theme) => ({
  formRow: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    flexWrap: 'wrap',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap'
    }
  },
  formColumn: {
    flex: '1 1 auto',
    width: '100%'
  },
  fieldNoEdit: {
    textAlign: 'center'
  }
});

let FormRow = ({
  classes,
  children,
  ...props
}) => (
  <Row className={classes.formRow}>
    {[].concat(children).map((child, i) =>
      React.isValidElement(child) ?
      React.cloneElement(child, { ...props, key: i }) : child
    )}
  </Row>
);
FormRow.propTypes = {
  classes:       PropTypes.object.isRequired,
  children:      PropTypes.any.isRequired
};

FormRow = withStyles(styles)(FormRow);

const FormField = ({
  type, small, medium, large, field, preview,
  style, centerOnSmall, classes, noEdit, ...props
}) => (
  <Column
    className={classes.formColumn}
    small={small}
    medium={medium}
    large={large}
    centerOnSmall={centerOnSmall}>
    {!preview && (
      <Field
        autoComplete='off'
        disableUnderline={noEdit ? true : false }
        className={noEdit ? classes.fieldNoEdit : ''}
        component={renderType(type || field.typeName)}
        {...props}
      />
    )}
    {preview && renderType(type || field.typeName)}
  </Column>
);

FormField.propTypes = {
  centerOnSmall: PropTypes.bool,
  type:          PropTypes.string.isRequired,
  style:         PropTypes.object,
  small:         PropTypes.number,
  medium:        PropTypes.number,
  large:         PropTypes.number,
  classes:       PropTypes.object.isRequired
};

export {
  Select,
  MultiSelect,
  Textbox,
  Slider,
  Stars,
  NumberField as Number,
  Checkbox,
  Difficulty,
  AutoComplete,
  Chip,
  FormRow
};

export default withStyles(styles)(FormField);
