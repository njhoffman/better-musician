import React, { Component, PropTypes } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import StarIcon from 'react-icons/lib/md/star';
import { MenuItem, Chip } from 'material-ui';
import {
  AutoComplete,
  Checkbox,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui'


const generateMenu = (dataSource) => {
  let items = [];
  const isArray = Array.isArray(dataSource);
  // assign value to key if dataSource is an object, otherwise assign scalar value
  Object.keys(dataSource).forEach(key => {
    items.push(<MenuItem
      value={isArray ? dataSource[key] : key }
      key={key}
      primaryText={dataSource[key]} />);
  });
  return items;
}

const RenderSelectField = ({
  label,
  viewType,
  dataSource,
  style,
  meta,
  ...custom }) => (
    <SelectField
      floatingLabelText={label}
      errorText={meta && meta.touched && meta.error}
      floatingLabelStyle={{ top: '28px' }}
      inputStyle={{ boxShadow: 'none', maxWidth: '100%', marginTop: "8px" }}
      style={{ ...style, ...{maxWidth: '100%', height: '60px'}  }}
      {...custom}
    >
      { generateMenu(dataSource) }
    </SelectField>
);

const RenderChip = ({
  label,
  viewType,
  meta,
  style,
  input,
  ...custom }) => {
    return (
      <Chip
        label={label}
        style={{ ...style }}
        {...custom}
      >
        {input.value}
      </Chip>
    );
  };

const RenderTextField = ({
  label,
  viewType,
  meta,
  style,
  ...custom }) => {
    return (
      <TextField
        floatingLabelText={label}
        errorText={meta && meta.touched && meta.error}
        floatingLabelStyle={{ top: '28px' }}
        inputStyle={{ boxShadow: 'none', maxWidth: '100%', marginTop: "8px" }}
        style={{ ...style, ...{ maxWidth: '100%', height: "60px" } }}
        {...custom}
      />
    );
  };

const RenderAutoCompleteField = ({
  label,
  viewType,
  meta,
  ...custom }) => {
    return (
      <AutoComplete
        floatingLabelText={label}
        openOnFocus={true}
        floatingLabelStyle={{ top: '28px' }}
        inputStyle={{ boxShadow: 'none', maxWidth: '100%', marginTop: "8px" }}
        textFieldStyle={{ boxShadow: 'none', maxWidth: '100%', height: '60px' }}
        style={{ maxWidth: '100%', height: "60px" }}
        errorText={meta && meta.touched && meta.error}
        {...custom}
      />
    );
  };


class RenderSliderField extends Component {

  state = {
    value: this.props.input.value ? parseInt(this.props.input.value) : 1
  };

  render () {
    const {
      input,
      viewType,
      label,
      textColor,
      valueDisplay,
      children,
      meta,
      ...custom } = this.props;

    return (
      <div>
        <label style={{color: textColor, marginBottom: "-15px", marginTop: "20px" }}>
          <span>{label}</span>
          { valueDisplay && valueDisplay(this.state.value) }
          { !valueDisplay &&
              <span style={{ float: "right" }}>{this.state.value}</span>
          }
      </label>
        <Slider
          onChange={(value) => this.setState({ value: value }) }
          input={input}
          value={parseInt(this.state.value)}
          {...custom}
        />
      </div>
    )
  }
};

const RenderDifficulty = ({ difficulty, maxDifficulty, style }) => {
  const ratio = parseFloat(1 / (difficulty / maxDifficulty));
  const red   = 255;
  const green = parseInt( (( ratio * 120) / 1.5) + 20 );
  const blue  = parseInt( (( ratio * 120) / 1.8) + 20 );
  // console.info(difficulty, ratio, red, green, blue);
  const color = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
  const numberStyle = {...style, ...{ color: color }};
  return <span style={numberStyle}>{ difficulty }</span>
};

const RenderStars = ({ number, starColor, style }) => (
  <div style={style}>
    { [...Array(number)].map((x,i) =>
      <StarIcon key={i} style={{color: starColor}} />
    ) }
  </div>
);

const RenderNumberField = ({
  viewType,
  label,
  meta,
  ...custom }) => {
    return (
      <TextField
        type='number'
        floatingLabelText={label}
        style={{ width: "125px", textAlign: 'center' }}
        inputStyle={{ textAlign: 'center', boxShadow: 'none' }}
        min={0}
        errorText={meta && meta.touched && meta.error}
        {...custom}
      />
    );
  };


const RenderCheckbox = ({
  viewType,
  meta: { touched, error },
  ...custom}) => (
    <Checkbox
      {...custom}
    />
);

export { RenderSelectField, RenderTextField, RenderSliderField, RenderStars, RenderNumberField, RenderCheckbox, RenderDifficulty, RenderAutoCompleteField, RenderChip };
