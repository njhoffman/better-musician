import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Field, FieldArray } from 'redux-form';
import { Column } from 'react-foundation';
import { withStyles } from '@material-ui/core';

import { withFieldTypes } from './FieldTypes';
import FormRow from './FormRow';
import Stars from './Stars';
import Difficulty from './Difficulty';
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
// 9: { name: 'Slider'        #<{(| component: RenderPdfLink |)}># }
// };
/* eslint-enable no-multi-spaces */


const styles = (theme) => ({
  column: {
    [theme.breakpoints.down('sm')]: {
      margin: '0px'
    },
    flex: '1 1 auto',
    width: '100%',
    maxWidth: '100%',
    margin: '8px 0px'
  }
});

const FormField = ({
  small, medium, large, centerOnSmall,
  variant, classes, className, Component,
  fieldType: { multi },
  ...props
}) => (
  <Column
    className={`${className} ${classes.column}`}
    {...{ small, medium, large, centerOnSmall }}>
    {!multi && (
      <Field component={Component} {...props} />
    )}
    {multi && (
      <FieldArray component={Component} {...props} />
    )}
  </Column>
);

FormField.defaultProps = {
  centerOnSmall : false,
  preview       : false,
  type          : null,
  typeId        : null,
  style         : {},
  large         : 8,
  medium        : 10,
  small         : 12
};

FormField.propTypes = {
  centerOnSmall : PropTypes.bool,
  preview       : PropTypes.bool,
  type          : PropTypes.string,
  typeId        : PropTypes.number,
  style         : PropTypes.instanceOf(Object),
  small         : PropTypes.number,
  medium        : PropTypes.number,
  large         : PropTypes.number
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

export { FormRow, Stars, Difficulty, Chip };
export default compose(
  withStyles(styles),
  withFieldTypes
)(FormField);

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
