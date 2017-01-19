import React, { Component } from 'react';
import { Field } from 'redux-form';
import { FlatButton } from 'material-ui';
import {
  RenderTextField,
  RenderNumberField,
  RenderSelectField
} from 'components/Field';
import {
  MdModeEdit      as EditIcon,
  MdDelete        as DeleteIcon
} from 'react-icons/lib/md';
import css from './FieldsView.scss';

const renderPreviewField = ({ id, type, label, optionValues }) => {
  switch(parseInt(type)) {
    case 0:
      return <Field style={{ width: '200px' }} name={id} component={RenderTextField} label={label} />
      break;
    case 1:
      break;
    case 2:
      return <Field style={{ width: '200px' }} name={id} component={RenderSelectField} label={label} dataSource={optionValues} />
      break;
    case 3:
      return <Field style={{ width: '200px' }} name={id} component={RenderSelectField} label={label} dataSource={optionValues} />
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;
  }
};

class FieldList extends Component {
  constructor({ tabs }) {
    super();
    this.tabs = tabs;
  }
  render() {
    return (
      <div className={css.fieldList}>
        {this.tabs.map((tab, i) =>
          <div key={i}>
            <p style={{ textAlign: 'left' }}><strong>{tab.name}</strong></p>
            <hr />
            {tab.fields.map(field =>
              <div key={field.id} className={css.tabbedField}>
                <div className={css.flexTwo}>
                  <div>
                    <span className={css.fieldLabel}>Label:</span>
                    <span className={css.fieldValue}>{field.label}</span>
                  </div>
                  <div>
                    <span className={css.fieldLabel}>Type:</span>
                    <span className={css.fieldValue}>{field.typeName}</span>
                  </div>
                </div>
                <div className={css.flexTwo}>
                  {renderPreviewField(field)}
                  <div className={css.fieldButtons}>
                    <FlatButton
                      style={{ minWidth: '35px', width: '35px', float: 'right', color: '#BBBBFF' }}
                      icon={<EditIcon />} />
                    <FlatButton
                      style={{ minWidth: '35px', width: '35px', float: 'right', color: '#FFBBBB' }}
                      icon={<DeleteIcon />} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default FieldList;
