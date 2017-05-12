import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderSelect from './Select';
import RenderMultiSelect from './MultiSelect';
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

class RenderFormField extends Component {
  render() {
    const {
      type,
      small,
      medium,
      large,
      centerOnSmall,
      ...other } = this.props;

    const renderType = type === 'select'
      ? RenderSelect
      : type === 'text'
      ? RenderText
      : type === 'number'
      ? RenderNumber
      : type === 'slider'
      ? RenderSlider
      : type === 'autocomplete'
      ? RenderAutoComplete
      : RenderCheckbox;

    return (
      <Column centerOnSmall={centerOnSmall} small={small} medium={medium} large={large} style={{ minWidth: '200px' }} >
        <Field
          component={renderType}
          {...other}
        />
      </Column>
    );
  }
};

RenderFormField.propTypes = {
  type:          PropTypes.string.isRequired,
  small:         PropTypes.number,
  medium:        PropTypes.number,
  large:         PropTypes.number,
  centerOnSmall: PropTypes.bool
};

export {
  RenderSelect,
  RenderMultiSelect,
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
