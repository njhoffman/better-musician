import React, { Component } from 'react';
import {
  RenderChip,
  RenderTextField,
} from 'components/Field';
import { Field, FieldArray } from 'redux-form';
import { Chip, RaisedButton } from 'material-ui';
import css from './FieldsView.scss';

class FieldOptions extends Component {
  state = {
    optionText : ''
  };
  constructor(props) {
    super(props);
  }

  addOption(fields) {
    fields.push(this.state.optionText.trim());
    this.setState({
      optionText: ''
    })
  }
  render() {
    return (
      <div>
        <div className={css.flexThree}>
          <RenderTextField
            label='Option Text'
            onChange={(e) => this.setState({ optionText: e.target.value }) }
            autoComplete='off'
            style={{ width: '60%', display: 'inline-block' }}
            value={this.state.optionText}
            name='optionText'
          />
          <RaisedButton
            onTouchTap={this.addOption.bind(this, this.props.fields)}
            style={{ display: 'inline-block', minWidth: '30%', marginLeft: '10px' }}
            label='Add' />
        </div>
        <div className={css.selectOptions}>
          {this.props.fields.map((option, index, fields) =>
            <Field
              key={index}
              name={`${option}`}
              component={RenderChip}
              onRequestDelete={() => fields.remove(index)}
              style={{ margin: '5px 2px' }}
            />
          )}
        </div>
      </div>
    )
  }
}

export default FieldOptions;
