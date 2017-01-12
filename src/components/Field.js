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
  viewType,
  values,
  label,
  meta: { touched, error },
  ...custom }) => {
    return (
      <div>
        <TextField
          floatingLabelText={label}
          defaultValue={values}
          inputStyle={{ boxShadow: 'none' }}
          errorText={touched && error}
          {...custom}
        />
      </div>
    );
  };

class RenderSliderField extends Component {

  state = {
    value: 1
  };

  render () {
    const { input, label, textColor, children, meta: { touched, error }, ...custom } = this.props;
    return (
      <div>
        <label style={{color: textColor}}> {label} {this.state.value}</label>
          <Slider
            onChange={(value) => this.setState({ value: value }) }
            value={this.state.value}
            defaultValue={this.state.value}
            input={input}
            {...custom}
          />
      </div>
    )
  }
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
  values,
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
          defaultValue={values}
          errorText={touched && error}
          {...custom}
        />
      </div>
    );
  };


const RenderCheckbox = ({
  meta: { touched, error },
  ...custom}) => (
    <div>
      <Checkbox
        {...custom}
      />
    </div>
);

export { RenderSelectField, RenderTextField, RenderSliderField, RenderStars, RenderNumberField, RenderCheckbox };
