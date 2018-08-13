import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RenderChip,
  RenderText
} from 'components/Field';
import { Field } from 'redux-form';
import { Button } from '@material-ui/core';
import css from './FieldsView.scss';

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
        <div className={css.flexThree}>
          <RenderText
            label='Option Text'
            onChange={(e) => this.setState({ optionText: e.target.value })}
            autoComplete='off'
            style={{ width: '60%', display: 'inline-block' }}
            value={this.state.optionText}
            name='optionText'
          />
          <Button
            variant='raised'
            onTouchTap={() => this.addOption(this.props.fields)}
            secondary
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
              style={{ margin: '5px 2px', fontSize: '0.8em' }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default FieldOptions;
