import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { Column } from 'react-foundation';

import FormRow from './FormRow';
import SelectField from './Select';
import MultiSelect from './MultiSelect';
import TextboxField from './Textbox';
import Slider from './Slider';
import NumberField from './Number';
import Checkbox from './Checkbox';
import Stars from './Stars';
import Difficulty from './Difficulty';
import AutoComplete from './AutoComplete';
import YouTubeLink from './YouTubeLink';
import Chip from './Chip';


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


const renderField = ({ type, ...props }) => {
  if (type === 'select' || type === 'Select Menu' || type === 2) {
    return <SelectField {...props} />;
  }
  if (type === 'text' || type === 'Text Box' || type === 0) {
    return (<TextboxField {...props} />);
  }
  if (type === 'number') {
    return (<NumberField {...props} />);
  }
  if (type === 'slider') {
    return (<Slider {...props} />);
  }
  if (type === 'multiselect' || type === 'Multi-Select Menu' || type === 3) {
    return (<MultiSelect {...props} />);
  }
  if (type === 'autocomplete' || type === 'AutoComplete Box' || type === 1) {
    return (<AutoComplete {...props} />);
  }
  if (type === 'youtube' || type === 'YouTube Link' || type === 7) {
    return (<YouTubeLink {...props} />);
  }
  return (<Checkbox {...props} />);
};

const FormField = ({
  small, medium, large, centerOnSmall, type, variant, classes, ...props
}) => (
  <Column
    style={{
      flex: '1 1 auto',
      width: '100%',
      margin: '8px 0px'
    }}
    {...{ small, medium, large, centerOnSmall }}>
    {type !== 3 && <Field component={renderField} type={type} {...props} />}
    {type === 3 && <FieldArray component={renderField} type={type} {...props} />}
  </Column>
);

FormField.defaultProps = {
  centerOnSmall: false,
  style:         {},
  large:         8,
  medium:        10,
  small:         12,
  type:          4 // checkbox
};

FormField.propTypes = {
  centerOnSmall: PropTypes.bool,
  type:          PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]), // TODO: combine type and field.typeName attributes
  style:         PropTypes.instanceOf(Object),
  small:         PropTypes.number,
  medium:        PropTypes.number,
  large:         PropTypes.number
};

// { ...{ ...this.props, variant, classes }}
// className={variant === FIELD_VIEW ? classes.fieldView : variant === FIELD_ADD ? classes.fieldAdd : classes.fieldEdit}
// disabled={variant === FIELD_VIEW}

// const FormField = ({
//   small, medium, large, preview,
//   style, centerOnSmall, classes, tabName,
//   variant = FIELD_VARIANT_EDIT,
//   ...props
// }) => (
// );
//
// FormField.propTypes = {
// };

export {
  SelectField,
  MultiSelect,
  TextboxField,
  Slider,
  Stars,
  NumberField as Number,
  Checkbox,
  Difficulty,
  AutoComplete,
  Chip,
  FormRow
};

export default FormField;

// const styles = (theme) => ({
//   dirtyField: {
//     MuiInputBaseRoot
//     boxShadow: '0px 0px 20px 1px #18423b',
//     '&:before': {
//       left: 0,
//       right: 0,
//       bottom: 0,
//       content: "&nbsp;",
//       position: 'absolute',
//       transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
//       borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
//       pointerEvents: 'none'
//     },
//     '&:after': {
//       transform: 'scaleX(1)',
//       left: 0,
//       right: 0,
//       bottom: 0,
//       content: "",
//       position: 'absolute',
//       transform: 'scaleX(0)',
//       transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
//       borderBottom: '2px solid #1976d2',
//       pointerEvents: 'none',
//     }
//   }
// });
//
//
