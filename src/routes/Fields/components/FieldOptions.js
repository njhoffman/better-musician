import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Chip,
  FormRow
} from 'components/Field';
import { Field } from 'redux-form';
import { TextField } from '@material-ui/core';
import { Column } from 'react-foundation';
import Button from 'components/Button';
  // .fieldsForm {
  //   margin-left: auto;
  //   margin-right: auto;
  //   margin: 25px 5px 5px 5px;
  //   text-align: center;
  //
  //   .fieldAdd,
  //   .buttons,
  //   .extraFields,
  //   .tabbedField {
  //     display: flex;
  //     max-width: none;
  //     flex-wrap: wrap;
  //     box-align: stretch;
  //     align-items: center;
  //     justify-content: space-around;
  //   }
  //   .fieldAdd {
  //     padding: 0px 20px;
  //   }
  //   .extraFields {
  //     margin-left: auto;
  //     margin-right: auto;
  //     .selectOptions {
  //       margin-top: 10px;
  //       max-width: 550px;
  //       max-height: 400px;
  //       overflow-y: auto;
  //       display: flex;
  //       flex-wrap: wrap;
  //       justify-content: center;
  //     }
  //     .flexThree {
  //       margin-left: auto;
  //       margin-right: auto;
  //     }
  //   }

export class FieldOptions extends Component {
  static propTypes = {
    fields: PropTypes.any.isRequired
  }

  state = {
    optionText : ''
  };

  addOption(fields) {
    fields.push(this.state.optionText.trim());
    this.setState({
      optionText: ''
    });
  }

  render() {
    return (
      <div>
        <FormRow>
          <Column small={8}>
            <TextField
              label='Option Text'
              onChange={(e) => this.setState({ optionText: e.target.value })}
              value={this.state.optionText}
              name='optionText' />
            <Button
              variant='raised'
              onClick={() => this.addOption(this.props.fields)}
              secondary
              label='Add' />
          </Column>
        </FormRow>
        <FormRow>
          <Column small={6}>
            {this.props.fields.map((option, index, fields) =>
              <Field
                key={index}
                name={`${option}`}
                component={Chip}
                onDelete={() => fields.remove(index)}
              />
            )}
          </Column>
        </FormRow>
      </div>
    );
  }
}

export default FieldOptions;
