import _ from 'lodash';
import React from 'react';
import { init as initLog } from 'shared/logger';
import Select, { ConnectedSelect } from './Select';
import MultiSelect, { ConnectedMultiSelect } from './MultiSelect';
import Textbox, { ConnectedTextbox } from './Textbox';
import Slider, { ConnectedSlider } from './Slider';
import NumberBox, { ConnectedNumberBox } from './Number';
import RadioButtonGroup, { ConnectedRadioButtonGroup } from './RadioButtonGroup';
import Checkbox, { ConnectedCheckbox }  from './Checkbox';
import AutoComplete, { ConnectedAutoComplete } from './AutoComplete';
import YouTubeLink, { ConnectedYouTubeLink } from './YouTubeLink';
import Metronome, { ConnectedMetronome } from './Metronome';

const { error } = initLog('FieldTypes');

// rowDivisor: 1, 2, 3 of this field fit on a row
// heightScale 1, 2, 3 rough guess of small to large
const FieldTypes = [{
  id: 0,
  name: 'text',
  label: 'Text Box',
  Component: Textbox,
  FormComponent: ConnectedTextbox,
  rowDivisor: 2,
  heightScale: 1,
  stubValue: 'Example Data'
}, {
  id: 1,
  name: 'autocomplete',
  label: 'AutoComplete Box',
  Component: AutoComplete,
  FormComponent: ConnectedAutoComplete,
  rowDivisor: 2,
  heightScale: 1,
  stubValue: 'Example Data',
}, {
  id: 2,
  name: 'select',
  label: 'Select Menu',
  Component: Select,
  FormComponent: ConnectedSelect,
  rowDivisor: 2,
  heightScale: 1,
  stubValue: (options) => options[Math.floor(options.length / 2)],
}, {
  id: 3,
  name: 'multiselect',
  label: 'Multi-Select Menu',
  Component: MultiSelect,
  FormComponent: ConnectedMultiSelect,
  rowDivisor: 3,
  heightScale: 3,
  multi: true,
  stubValue: (options) => options.filter(opt => _.random(1, 2) % 2 === 0)
}, {
  id: 4,
  name: 'checkbox',
  label: 'Checkbox',
  Component: Checkbox,
  FormComponent: ConnectedCheckbox,
  rowDivisor: 2,
  heightScale: 1,
  stubValue: true
}, {
  id: 5,
  name: 'radiogroup',
  label: 'Radio Buttons',
  Component: RadioButtonGroup,
  FormComponent: ConnectedRadioButtonGroup,
  rowDivisor: 2,
  heightScale: 1,
  stubValue: (options) => Math.floor(options.length / 2),
}, {
  id: 6,
  name: 'date',
  label: 'Date',
  Component: Checkbox,
  FormComponent: ConnectedCheckbox,
  rowDivisor: 1,
  heightScale: 1
}, {
  id: 7,
  name: 'youtube',
  label: 'YouTube Link',
  Component: YouTubeLink,
  FormComponent: ConnectedYouTubeLink,
  rowDivisor: 3,
  heightScale: 3,
  stubValue: 'jnLSYfObARA'
}, {
  id: 8,
  name: 'pdf',
  label: 'PDF Link',
  Component: Checkbox,
  FormComponent: ConnectedCheckbox,
  rowDivisor: 3,
  heightScale: 3
}, {
  id: 9,
  name: 'slider',
  label: 'Slider',
  Component: Slider,
  FormComponent: ConnectedSlider,
  rowDivisor: 2,
  heightScale: 1,
  9: 5
}, {
  id: 10,
  name: 'metronome',
  label: 'Metronome',
  Component: Metronome,
  FormComponent: ConnectedMetronome,
  rowDivisor: 3,
  heightScale: 3,
  multi: true
}, {
  id: 11,
  name: 'number',
  label: 'Number Box',
  Component: NumberBox,
  FormComponent: ConnectedNumberBox,
  rowDivisor: 1,
  heightScale: 1,
  stubValue: 17
}];

export const getFieldByType = ({ type, typeId }) => {
  const fieldProps = _.find(FieldTypes, { name: type }) || _.find(FieldTypes, { id: typeId });
  if (!fieldProps) {
    return error(`Could not render field type: ${type} - typeId: ${typeId}`);
  }
  return fieldProps;
};

export const getFieldTypeOptions = () => {
  const fieldOptions = _.map(FieldTypes, ({ id, label }) => ({ [id]: label }));
  return fieldOptions;
};

export const getDefaultValues = (typeId, options) => {
  if (typeId >= 0) {
    const fieldType = getFieldByType({ typeId });
    return _.isFunction(fieldType.stubValue)
      ? fieldType.stubValue(options)
      : fieldType.stubValue;
  }
  return null;
};

export const withFieldTypes = (ParentComponent) => {
  const WrappedComponent = ({ type, typeId, ...props }) => {
    const { FormComponent, ...fieldTypeProps } = getFieldByType({ type, typeId });
    return (
      <ParentComponent
        Component={FormComponent}
        fieldType={{ ...fieldTypeProps, type, typeId }}
        {...{ ...props }}
      />
    );
  };
  WrappedComponent.displayName = `withFieldType(${ParentComponent.displayName || ParentComponent.name})`;
  return WrappedComponent;
};

export default FieldTypes;

/* eslint-enable no-multi-spaces */
