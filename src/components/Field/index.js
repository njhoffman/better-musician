import React, { Component, PropTypes } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

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

  render () {
    const {
      type,
      zero,
      small,
      medium,
      large,
      centerOnSmall,
      ...other } = this.props;

    const renderType = type === "select"
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
      <Column centerOnSmall small={small} medium={medium} large={large} style={{ minWidth: "200px" }} >
        <Field
          component={renderType}
          {...other}
        />
      </Column>
    )
  }
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
