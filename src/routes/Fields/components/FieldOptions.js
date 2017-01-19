import React, { Component } from 'react';
import {
  RenderTextField,
} from 'components/Field';
import { Chip, RaisedButton } from 'material-ui';
import css from './FieldsView.scss';

class FieldOptions extends Component {
  state = {
    optionText : '',
    optionValues : []
  };
  addOption() {
    const optionValues = this.state.optionText.trim().length > 0
      && this.state.optionValues.indexOf(this.state.optionText) === -1
      ? this.state.optionValues.concat([this.state.optionText])
      : this.state.optionValues;
    this.setState({
      optionValues,
      optionText: ''
    })
  }
  removeOption(optionValue) {
    let optionValues = this.state.optionValues.slice(0);
    optionValues.splice(optionValues.indexOf(optionValue), 1);
    this.setState({
      optionValues
    });
  }
  render() {
    return (
      <div>
        <div className={css.flexCenter}>
          <RenderTextField
            label='Option Text'
            onChange={(e) => this.setState({ optionText: e.target.value }) }
            style={{ width: '60%', display: 'inline-block' }}
            value={this.state.optionText}
            name='optionText'
          />
          <RaisedButton
            onTouchTap={this.addOption.bind(this)}
            style={{ display: 'inline-block', minWidth: '30%', marginLeft: '10px' }}
            label='Add' />
        </div>
        <div className={css.selectOptions}>
          {this.state.optionValues.map((option, index) =>
            <Chip
              onRequestDelete={this.removeOption.bind(this, option)}
              style={{ marginLeft: '5px', marginBottom: '5px' }}
              key={index}>
              {option}
            </Chip>
          )}
        </div>
      </div>
    )
  }
}

export default FieldOptions;
