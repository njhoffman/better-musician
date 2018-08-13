import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, ListItem } from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import CustomField from 'components/CustomField';
import {
  MdModeEdit as EditIcon,
  MdClose as CancelIcon,
  MdDelete as DeleteIcon
} from 'react-icons/md';
import css from './FieldsView.scss';

export const FieldList = (props) => {
  const {
    editingField,
    editField,
    cancelEdit,
    deleteField,
    savedTabs
  } = props;

  const renderFieldItem = (field) => {
    const editingId = editingField ? editingField.id : null;
    return (
      <ListItem
        key={field.id}
        style={{ borderRadius: '10px' }}
        innerDivStyle={{ margin: 0, padding: 0 }}>
        <Row className={css.tabbedField + ' ' + (field.id === editingId ? css.active : '')}>
          <Column centerOnSmall small={6}>
            <Row>
              <Column
                small={4}
                className={css.fieldLabel}>
                Label:
              </Column>
              <Column
                small={8}
                className={css.fieldValue}>
                {field.label}
              </Column>
            </Row>
            <Row>
              <Column
                small={4}
                className={css.fieldLabel}>
                Type:
              </Column>
              <Column
                small={8}
                className={css.fieldValue}>{field.typeName}
              </Column>
            </Row>
          </Column>
          <Column centerOnSmall small={4}>
            <Row>
              <Column
                className={css.fieldPreviewLabel}>
                Field Preview
              </Column>
            </Row>
            <Row>
              <CustomField field={field} preview />
            </Row>
          </Column>
          <Column centerOnSmall small={1}>
            <Row>
              <Button
                variant='flat'
                onTouchTap={field.id === editingId ? cancelEdit : () => editField(field)}
                style={{ minWidth: '35px', width: '35px', float: 'right', color: '#bbbbff' }}
                icon={field.id === editingId ? <CancelIcon onTouchTap={cancelEdit} /> : <EditIcon />}
              />
            </Row>
            <Row>
              {!(field.id === editingId) &&
                <Button
                  variant='flat'
                  onTouchTap={() => deleteField(field.id)}
                  style={{ minWidth: '35px', width: '35px', float: 'right', color: '#FFBBBB' }}
                  icon={<DeleteIcon />}
                />
              }
            </Row>
          </Column>
        </Row>
      </ListItem>
    );
  };

  return (
    <List className={css.fieldList}>
      {savedTabs.map((tab, i) =>
        <ListItem
          key={i}
          primaryText={
            <div>
              <span className={css.tabNumber}>Tab {i + 1}</span>
              <span className={css.tabName}>{tab.name}</span>
              <span className={css.tabCount}>{tab.fields.length + ' Fields'}</span>
            </div>
          }
          hoverColor='rgba(0, 151, 167, 0.4'
          style={{ marginTop: '5px' }}
          initiallyOpen={i === 0}
          primaryTogglesNestedList
          nestedItems={tab.fields.map(renderFieldItem)}
        />
      )}
    </List>
  );
};

FieldList.propTypes = {
  savedTabs    : PropTypes.array.isRequired,
  cancelEdit   : PropTypes.func.isRequired,
  editingField : PropTypes.object,
  editField    : PropTypes.func.isRequired,
  deleteField  : PropTypes.func.isRequired
};

export default FieldList;
