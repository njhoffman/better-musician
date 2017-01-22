import React, { Component } from 'react';
import { Field } from 'redux-form';
import { FlatButton, List, ListItem } from 'material-ui';
import {
  RenderTextField,
  RenderNumberField,
  RenderSelectField
} from 'components/Field';
import {
  MdModeEdit      as EditIcon,
  MdClose         as CancelIcon,
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

const renderFieldItem = (props, field) => {
  const editingId = props.editingField ? props.editingField.id : null;
  return (
    <ListItem
      key={field.id}
      style={{ borderRadius: '10px' }}
      innerDivStyle={{ margin: 0, padding: 0 }}>
      <div className={css.tabbedField + ' ' + (field.id === editingId ? css.active  : '')}>
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
              onTouchTap={field.id === editingId ? props.cancelEdit : props.editField.bind(undefined, field)}
              style={{ minWidth: '35px', width: '35px', float: 'right', color: '#BBBBFF' }}
              icon={field.id === editingId ? <CancelIcon onTouchTap={props.cancelEdit} /> : <EditIcon />}
            />
            {!(field.id === editingId) &&
              <FlatButton
                onClick={props.deleteField.bind(undefined, field.id)}
                style={{ minWidth: '35px', width: '35px', float: 'right', color: '#FFBBBB' }}
                icon={<DeleteIcon />}
              />
            }
          </div>
        </div>
      </div>
    </ListItem>
  )
};

class FieldList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    return (
      <List className={css.fieldList}>
        {props.savedTabs.map((tab, i) =>
          <ListItem
            key={i}
            primaryText={
              <div>
                <span className={css.tabNumber}>{i + 1}</span>
                <span className={css.tabName}>{tab.name}</span>
                <span className={css.tabCount}>{tab.fields.length + ' Fields'}</span>
              </div>
            }
            hoverColor="rgba(0, 151, 167, 0.4"
            innerDivStyle={{ backgroundColor: "rgba(0, 151, 167, 0.15" }}
            style={{ marginTop: "5px" }}
            initiallyOpen={i === 0 ? true : false }
            primaryTogglesNestedList={true}
            nestedItems={tab.fields.map(renderFieldItem.bind(undefined, props))}
          />
        )}
      </List>
    )
  }
}

export default FieldList;
