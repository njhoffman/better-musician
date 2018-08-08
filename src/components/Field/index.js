import React from 'react';
import PropTypes from 'prop-types';
import RenderSelect from './Select';
// import RenderMultiSelect from './MultiSelect';
import RenderText from './Text';
import RenderSlider from './Slider';
import RenderNumber from './Number';
import RenderCheckbox from './Checkbox';
import RenderStars from './Stars';
import RenderDifficulty from './Difficulty';
import RenderAutoComplete from './AutoComplete';
import RenderChip from './Chip';
import { Field } from 'redux-form';
import { Column } from 'react-foundation';

const renderType = (type) => (
  type === 'select' ? RenderSelect
  : type === 'text' ? RenderText
  : type === 'number' ? RenderNumber
  : type === 'slider' ? RenderSlider
  : type === 'autocomplete' ? RenderAutoComplete
  : RenderCheckbox
);

const RenderFormField = ({
  type,
  small,
  medium,
  large,
  style,
  centerOnSmall,
  ...props
}) => (
  <Column
    small={small}
    medium={medium}
    large={large}
    centerOnSmall={centerOnSmall}>
    <Field
      component={renderType(type)}
      style={{ ...style, ...{ maxWidth: '100%' } }}
      {...props}
    />
  </Column>
);

RenderFormField.propTypes = {
  centerOnSmall: PropTypes.bool,
  type:          PropTypes.string.isRequired,
  style:         PropTypes.object,
  small:         PropTypes.number,
  medium:        PropTypes.number,
  large:         PropTypes.number
};

export {
  RenderSelect,
  // RenderMultiSelect,
  RenderText,
  RenderSlider,
  RenderStars,
  RenderNumber,
  RenderCheckbox,
  RenderDifficulty,
  RenderAutoComplete,
  RenderChip
};

export default RenderFormField;
