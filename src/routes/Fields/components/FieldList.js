import React, { Component, PropTypes } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { FlatButton, List, ListItem } from 'material-ui';
import { Row, Column } from 'react-foundation';
import CustomField from 'components/CustomField';
import {
  MdModeEdit as EditIcon,
  MdClose as CancelIcon,
  MdDelete as DeleteIcon
} from 'react-icons/lib/md';
import css from './FieldsView.scss';

class FieldList extends Component {
  static propTypes = {
    savedTabs:    PropTypes.array,
    muiTheme:     PropTypes.object,
    cancelEdit:   PropTypes.func,
    editingField: PropTypes.object,
    editField:    PropTypes.func,
    deleteField:  PropTypes.func
  }

  renderFieldItem(field) {
    const editingId = this.props.editingField ? this.props.editingField.id : null;
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
                style={{ color: this.props.muiTheme.instrumental.fieldsViewLabelColor }}
                className={css.fieldLabel}>Label:
              </Column>
              <Column
                small={8}
                className={css.fieldValue}>{field.label}
              </Column>
            </Row>
            <Row>
              <Column
                small={4}
                style={{ color: this.props.muiTheme.instrumental.fieldsViewLabelColor }}
                className={css.fieldLabel}>Type:
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
                style={{ color: this.props.muiTheme.instrumental.fieldsViewLabelColor }}
                className={css.fieldPreviewLabel}>Field Preview
              </Column>
            </Row>
            <Row>
              <CustomField field={field} preview />
            </Row>
          </Column>
          <Column centerOnSmall small={1}>
            <Row>
              <FlatButton
                onTouchTap={field.id === editingId
                  ? this.props.cancelEdit : this.props.editField.bind(undefined, field)}
                style={{ minWidth: '35px', width: '35px', float: 'right', color: '#bbbbff' }}
                icon={field.id === editingId ? <CancelIcon onTouchTap={this.props.cancelEdit} /> : <EditIcon />}
              />
            </Row>
            <Row>
              {!(field.id === editingId) &&
                <FlatButton
                  onTouchTap={this.props.deleteField.bind(undefined, field.id)}
                  style={{ minWidth: '35px', width: '35px', float: 'right', color: '#FFBBBB' }}
                  icon={<DeleteIcon />}
                />
              }
            </Row>
          </Column>
        </Row>
      </ListItem>
    );
  }

  render() {
    return (
      <List className={css.fieldList}>
        {this.props.savedTabs.map((tab, i) =>
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
            innerDivStyle={{
              backgroundColor: this.props.muiTheme.palette.primary3Color
            }}
            style={{ marginTop: '5px' }}
            initiallyOpen={i === 0}
            primaryTogglesNestedList
            nestedItems={tab.fields.map(this.renderFieldItem)}
          />
        )}
      </List>
    );
  }
}

export default muiThemeable()(FieldList);
