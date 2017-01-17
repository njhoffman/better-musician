import React, { Component, PropTypes } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import StarIcon from 'react-icons/lib/md/star';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui'

const RenderSelectField = ({
  ...input,
  label,
  viewType,
  children,
  meta: { touched, error },
  ...custom }) => (
  <div>
    <SelectField
      floatingLabelText={label}
      errorText={touched && error}
      children={children}
      input={input}
      {...custom}
    />
  </div>
);

const RenderTextField = ({
  label,
  viewType,
  meta: { touched, error },
  ...custom }) => {
    return (
      <div>
        <TextField
          floatingLabelText={label}
          inputStyle={{ boxShadow: 'none' }}
          errorText={touched && error}
          {...custom}
        />
      </div>
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
      children,
      meta: { touched, error },
      ...custom } = this.props;
    return (
      <div>
        <label style={{color: textColor}}> {label} {this.state.value}</label>
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

const RenderDifficulty = ({ difficulty, maxDifficulty }) => {
  const ratio = parseFloat(1 / (difficulty / maxDifficulty));
  const red   = 255;
  const green = parseInt( (( ratio * 120) / 1.5) + 20 );
  const blue  = parseInt( (( ratio * 120) / 1.8) + 20 );
  // console.info(difficulty, ratio, red, green, blue);
  const color = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
  return <span style={{ color: color }}>{ difficulty }</span>
};

const RenderStars = ({ number, starColor }) => (
  <div>
    { [...Array(number)].map((x,i) =>
      <StarIcon key={i} style={{color: starColor}} />
    ) }
  </div>
);

const RenderNumberField = ({
  viewType,
  label,
  meta: { touched, error },
  ...custom }) => {
    return (
      <div>
        <TextField
          type='number'
          floatingLabelText={label}
          style={{ width: "125px", textAlign: 'center' }}
          inputStyle={{ textAlign: 'center', boxShadow: 'none' }}
          min={0}
          errorText={touched && error}
          {...custom}
        />
      </div>
    );
  };


const RenderCheckbox = ({
  viewType,
  meta: { touched, error },
  ...custom}) => (
    <div>
      <Checkbox
        {...custom}
      />
    </div>
);

export { RenderSelectField, RenderTextField, RenderSliderField, RenderStars, RenderNumberField, RenderCheckbox, RenderDifficulty };
