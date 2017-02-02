import React, { Component } from 'react';
import { FlatButton, List, ListItem } from 'material-ui';
import { Row, Column } from 'react-foundation';
import CustomField from 'components/CustomField';
import {
  MdModeEdit      as EditIcon,
  MdClose         as CancelIcon,
  MdDelete        as DeleteIcon
} from 'react-icons/lib/md';
import css from './FieldsView.scss';


const renderFieldItem = (props, field) => {
  const editingId = props.editingField ? props.editingField.id : null;
  return (
    <ListItem
      key={field.id}
      style={{ borderRadius: '10px' }}
      innerDivStyle={{ margin: 0, padding: 0 }}>
      <Row className={css.tabbedField + ' ' +  (field.id === editingId ? css.active  : '')}>
        <Column centerOnSmall small={6}>
          <Row>
            <Column small={4} className={css.fieldLabel}>Label:</Column>
            <Column small={8} className={css.fieldValue}>{field.label}</Column>
          </Row>
          <Row>
            <Column small={4} className={css.fieldLabel}>Type:</Column>
            <Column small={8} className={css.fieldValue}>{field.typeName}</Column>
          </Row>
        </Column>
        <Column centerOnSmall small={4}>
          <CustomField field={field} preview={true} />
        </Column>
        <Column centerOnSmall small={2}>
          <FlatButton
            onTouchTap={field.id === editingId ? props.cancelEdit : props.editField.bind(undefined, field)}
            style={{ minWidth: '35px', width: '35px', float: 'right', color: '#bbbbff' }}
            icon={field.id === editingId ? <CancelIcon onTouchTap={props.cancelEdit} /> : <EditIcon />}
          />
          {!(field.id === editingId) &&
            <FlatButton
              onTouchTap={props.deleteField.bind(undefined, field.id)}
              style={{ minWidth: '35px', width: '35px', float: 'right', color: '#FFBBBB' }}
              icon={<DeleteIcon />}
            />
          }
        </Column>
      </Row>
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
                <span className={css.tabNumber}>Tab {i + 1}</span>
                <span className={css.tabName}>{tab.name}</span>
                <span className={css.tabCount}>{tab.fields.length + ' Fields'}</span>
              </div>
            }
            hoverColor="rgba(0, 151, 167, 0.4"
            innerDivStyle={{
              backgroundColor: this.props.muiTheme.palette.primary3Color
            }}
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
