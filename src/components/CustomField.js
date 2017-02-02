import React, { Component, PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Column } from 'react-foundation';
import { RenderText, RenderChip, RenderSelect } from './Field';
import { RaisedButton } from 'material-ui';

const fieldOptions = {
  0: "Text Box",
  1: "AutoComplete Box",
  2: "Select Menu",
  3: "Multi-Select Menu",
  4: "Check Box",
  5: "Radio Buttons",
  6: "Date",
  7: "YouTube Link",
  8: "PDF Link"
};

class RenderCustomField extends Component {

  state = {
    fieldOptions
  };

  renderSelectOptions ({ fields, label, name, dataSource, ...custom }) {
    return (
      <Column centerOnSmall small={12}>
        <Row>
          <Column centerOnSmall small={6}>
            <Row>
              <Column centerOnSmall small={this.props.disabled ? 12 : 8}>
                <Field
                  label={label}
                  onChange={(e) => (e) }
                  component={RenderSelect}
                  disabled={this.props.disabled}
                  underlineShow={!this.props.disabled}
                  labelStyle={this.props.inputStyle}
                  iconStyle={{ visibility: this.props.disabled ? 'hidden' : 'visible' }}
                  dataSource={dataSource}
                  name='optionText'
                />
              </Column>
              <Column centerOnSmall small={this.props.disabled ? 0 : 4}>
                {!this.props.disabled &&
                  <RaisedButton
                    secondary={true}
                    label='Add' />
                }
              </Column>
            </Row>
          </Column>
        </Row>
        <Row>
          <Column
            centerOnSmall
            style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
            small={10}>
            {fields.map((name, idx, fields) => {
              if (this.props.disabled) {
                return (
                  <Field
                    key={idx}
                    name={name}
                    onChange={() => { }}
                    component={RenderChip}
                    style={{ margin: '5px 2px', fontSize: "0.8em" }} />
                );
              } else {
                return (
                  <Field
                    key={idx}
                    name={name}
                    onChange={() => { }}
                    component={RenderChip}
                    onRequestDelete={() => fields.remove(idx)}
                    style={{ margin: '5px 2px', fontSize: "0.8em" }} />
                );
              }
            })}
          </Column>
        </Row>
      </Column>
    );
  };

  renderPreviewField ({ id, type, label, optionValues }) {
    switch(parseInt(type)) {
      case 0:
        return <Field style={{ width: '200px' }} name={id} component={RenderText} label={label} />
        break;
      case 1:
        break;
      case 2:
        return <Field style={{ width: '200px' }} name={id} component={RenderSelect} label={label} dataSource={optionValues} />
        break;
      case 3:
        return <Field style={{ width: '200px' }} name={id} component={RenderSelect} label={label} dataSource={optionValues} />
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        return <Field style={{ width: '200px', marginTop: '0px' }} name={id} component={RenderText} label={label} />
        break;
      case 8:
        break;
    }
  }

  renderCustomField ({ id, type, label, optionValues, idx }, flexClass) {
    const fieldName = 'customFields[' + idx + ']';
    switch(parseInt(type)) {
      case 0:
        return (
          <Column centerOnSmall>
            <Field
              style={{ ...this.props.style, ...{ width: '200px ', verticalAlign: 'middle' }}}
              name={fieldName}
              disabled={this.props.disabled}
              underlineShow={!this.props.disabled}
              inputStyle={{ ...this.props.inputStyle, ...{ textAlign: 'center' }}}
              component={RenderText}
              floatingLabelStyle={{ ...this.props.labelStyle, ... {} }}
              label={label} />
          </Column>
        );
        break;
      case 1:
        break;
      case 2:
        return (
          <Column centerOnSmall>
            <Field
              style={{ ...this.props.style, ...{ width: '200px', verticalAlign: 'middle' }}}
              name={fieldName}
              disabled={this.props.disabled}
              underlineShow={!this.props.disabled}
              labelStyle={this.props.inputStyle}
              iconStyle={{ visibility: (this.props.disabled ? 'hidden': 'visible' ) }}
              floatingLabelStyle={{ ...this.props.lableStyle, ... {} }}
              component={RenderSelect}
              label={label}
              dataSource={optionValues} />
          </Column>
        );
        break;
      case 3:
        return (
          <FieldArray
            name={fieldName}
            label={label}
            dataSource={optionValues}
            component={this.renderSelectOptions.bind(this)} />
        );
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        return (
          <Column>
            <Row>
              <Column centerOnSmall>
                <Field
                  style={{ ...this.props.style, ...{ width: '200px', verticalAlign: 'middle' }}}
                  name={fieldName}
                  inputStyle={this.props.inputStyle}
                  disabled={this.props.disabled}
                  underlineShow={!this.props.disabled}
                  floatingLabelStyle={{ ...this.props.labelStyle, ... {} }}
                  component={RenderText}
                  label={label}
                />
              </Column>
            </Row>
            <Row>
              <Column centerOnSmall>
                <iframe id="player" type="text/html"
                  width="350"
                  height="250"
                  src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://www.example.com">
                </iframe>
              </Column>
            </Row>
          </Column>
        );
        break;
      case 8:
        break;
    }
  };

  render () {
    if (this.props.preview) {
      return this.renderPreviewField(this.props.field);
    } else {
      return this.renderCustomField(this.props.field, this.props.flexClass);
    }
  }
};

export default RenderCustomField;
