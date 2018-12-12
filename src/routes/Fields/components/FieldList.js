import _ from 'lodash';
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Tooltip,
  withStyles
} from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import {
  MdModeEdit as EditIcon,
  MdClose as CancelIcon,
  MdDelete as DeleteIcon
} from 'react-icons/md';
import AddIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from 'components/Button';
import { deleteField } from 'actions/api';
import {
  showPreviewFieldModal,
  showEditFieldModal,
  selectTab,
  editTab,
  cancelTabEdit
} from 'routes/Fields/modules/actions';
import { userTabs as userTabsSelector } from 'routes/Fields/modules/selectors';

const styles = (theme) => ({
  root: {
    paddingBottom: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  panel: {
    margin: '10px 15px',
    [theme.breakpoints.down('sm')]: {
      margin: '1px 3px'
    }
  },
  panelLocked: {
    opacity: 0.5
  },
  panelEditing: {
  },
  panelExpanded: {
  },
  summary: {
    background: theme.palette.primary.dark,
    // margin: '6px 0px'
  },
  details: {
    flexDirection: 'column',
    padding: '8px 24px 24px',
    margin: '0px 10px',
    [theme.breakpoints.down('sm')]: {
      padding: '2px 4px 4px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '6px 8px 8px'
    }
  },
  detailsEditing: {
    opacity: 0.2
  },
  buttonDivider: {
    marginTop: '3px',
    marginBottom: '0px'
  },
  summaryRoot: {
    minHeight: '12px',
    background: theme.palette.primary.dark,
    padding: '0px !important',
    '&:hover': {
      background: theme.palette.primary.main
    },
    '& > div': {
      background: 'transparent',
      alignItems: 'center',
    }
  },
  summaryExpanded: {
    margin: '0px !important',
    background: theme.palette.primary.light,
    '&:hover': {
      background: theme.palette.primary.light
    },
    boxShadow: [
      // off-x, off-y, blur-R, spread-R, color
      '0px 1px 2px -1px rgba(0, 0, 0, 0.5)',
      '0px 1px 5px 0px rgba(0, 0, 0, 0.34)',
      '0px 1px 10px 0px rgba(0, 0, 0, 0.22)'
    ].join(','),
    minHeight: '1.5em !important'
  },
  summaryEditing: {
    background: theme.palette.primary.light,
  },
  summaryLocked: {
    '&:hover': {
      background: theme.palette.primary.main
    }
  },
  summaryContent: {
    margin: '0px',
    padding: '6px 24px'
  },
  summaryContentExpanded: {
    margin: '0px',
    padding: '10px 24px'
  },
  expandIcon: {
    margin: '0px !important',
    boxShadow: 'none',
  },
  tabColumn: {
    padding: 0
  },
  tabEditButton: {
    color: '#ccccee',
    padding: '3px !important',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '2px',
    opacity: 0.5,
    borderRadius: '10px',
    '&:hover': {
      opacity: 1,
      boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.1)'
    }
  },
  tabEditPlaceholder: {
    width: '30px',
    display: 'inline-block'
  },
  tabCancelEditButton: {
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.25)'
  },
  tabName : {
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    overflowX: 'hidden',
    width: 'calc(100% - 40px)',
    color: theme.palette.text.primary
  },
  tabNameEditing : {
    fontStyle: 'italic'
  },
  tabNumber: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontVariant: 'small-caps',
    fontSize: '0.8em',
    opacity: 0.8
  },
  tabCount: {
    textAlign: 'right',
    fontVariant: 'small-caps',
    opacity: 0.8,
    fontSize: '0.8em'
  },
  fieldPreviewLabel: {
    textAlign: 'left',
    fontSize: '0.8em',
    fontVariant: 'small-caps',
    margin: '5px 0px -20px 0px',
    padding: '0px',
  },
  fieldLabel: {
    fontVariant: 'small-caps',
    // width: '25%',
    display: 'inline-block',
    // fontSize: '0.8em',
    textAlign: 'right',
    whiteSpace: 'no-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  fieldValue: {
    // width: '75%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  fieldDetails: {
    padding: '0px',
  },
  fieldButtons: {
    justifyContent: 'space-evenly',
    padding: '0px',
    display: 'flex'
  },
  activeField: {
    // tabbedField overrides
    border: 'solid 1px rgb(170,180,204) !important',
    backgroundColor: 'rgba(170, 180, 204, 0.1) !important'
  },
  flexButton: {
    width: '36px',
    height: '36px',
    padding: '6px'
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  deleteFieldButton: {
    minHeight: '28px',
    opacity: 0.8,
    marginLeft: '10px',
    ...theme.app.buttons.delete
  },
  editTabButton: {
    opacity: 0.8,
    minHeight: '28px',
    // minWidth: '48px',
    // minHeight: '24px',
    // padding: '4px 5px'
  },
  addFieldButton: {
    opacity: 0.8,
    minHeight: '28px',
    // minWidth: '48px',
    // minHeight: '24px',
    // padding: '4px 5px'
  },
  tabbedField: {
    borderRadius: '10px',
    border: 'solid 1px #456',
    padding: '7px 5px',
    margin: '3px 5px'
  },
  left: {
    display: 'flex',
    flexBasis: 'auto',
    flexGrow: '0'
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const FieldList = (props) => {
  const {
    editingField,
    editingTab,
    selectedTab,
    tabSelect,
    tabEdit,
    fieldDelete,
    cancelTab,
    showPreview,
    showEdit,
    userTabs,
    classes
  } = props;

  const editingId = _.get(editingTab, 'id');
  const selectedId = _.get(selectedTab, 'id');
  const editFieldId = _.get(editingField, 'id');

  const handleEditTabClick = (tab) => (e) => {
    e.stopPropagation();
    tabSelect(tab);
    return (tab.id === editingId ? cancelTab() : tabEdit(tab));
  };

  const isExpanded = (tabId, i) => Boolean(tabId === selectedId);
  const isEditing = (tabId) => Boolean(tabId === selectedId && editingTab);
  const isLocked = (tabId) => Boolean(tabId !== selectedId && editingTab);

  const panelClass = (tabId) => ([
    `${classes.panel}`,
    `${isExpanded(tabId) ? classes.panelExpanded : ''}`,
    `${isEditing(tabId) ? classes.panelEditing : ''}`,
    `${isLocked(tabId) ? classes.panelLocked : ''}`
  ].join(' '));

  const rootClass = (tabId) => ([
    `${classes.summaryRoot}`,
    `${isEditing(tabId) ? classes.summaryEditing : ''}`,
    `${isLocked(tabId) ? classes.summaryLocked : ''}`
  ].join(' '));

  const panelChange = (tab) => {
    if (!editingTab) {
      tabSelect(isExpanded(tab.id) ? null : tab);
    }
  };

  const renderFieldItem = (field, key) => (
    <Row className={`${classes.tabbedField} ${editFieldId === field.id ? classes.activeField : ''}`} key={key}>
      <Column small={6} className={classes.fieldDetails}>
        <Row>
          <Column small={4} className={classes.fieldLabel}>
            <Typography variant='body1' color='textSecondary'>
              Label:
            </Typography>
          </Column>
          <Column small={8} className={classes.fieldValue}>
            <Typography variant='caption'>
              {field.label}
            </Typography>
          </Column>
        </Row>
        <Row>
          <Column small={4} className={classes.fieldLabel}>
            <Typography variant='body1' color='textSecondary'>
              Type:
            </Typography>
          </Column>
          <Column small={8} className={classes.fieldValue}>
            <Typography variant='caption'>
              {field.typeLabel}
            </Typography>
          </Column>
        </Row>
      </Column>
      <Column small={3} className={`${classes.fieldButtons}`}>
        <Button
          variant='outlined'
          secondary
          disabled={Boolean(editingTab)}
          style={{ marginLeft: (editFieldId === field.id ? '0px' : '0px') }}
          className={`${classes.flexButton}`}
          onClick={() => showPreview(field)}
          label='Preview'
        />
      </Column>
      <Column small={3} className={`${classes.fieldButtons}`}>
        {!(field.id === editFieldId) && (
        <Button
          variant='text'
          disabled={Boolean(editingTab)}
          onClick={() => showEdit(field)}
          className={classes.flexButton}
          style={{ color: '#bbbbff' }}
          icon={<EditIcon />}
        />
        )}
        {!(field.id === editFieldId) && (
          <Button
            variant='text'
            disabled={Boolean(editingTab)}
            onClick={() => fieldDelete(field.id)}
            className={classes.flexButton}
            style={{ color: '#ffbbbb' }}
            icon={<DeleteIcon />}
          />
        )}
      </Column>
    </Row>
  );

  return (
    <div className={classes.root}>
      <Tooltip title='Primary tab fields cannot be modified or removed.'>
        <ExpansionPanel disabled className={panelClass(-1)}>
          <ExpansionPanelSummary
            className={classes.summary}
            classes={{
              root:       classes.summaryRoot,
              expanded:   classes.summaryExpanded,
              content:    classes.summaryContent,
              expandIcon: classes.expandIcon
            }}>
            <Column small={3} className={classes.tabColumn}>
              <Typography variant='subtitle2' className={classes.tabNumber}>
                Primary Tab
              </Typography>
            </Column>
            <Column small={6} className={classes.tabColumn}>
              <Typography variant='subtitle2' className={classes.tabName}>
                Main Fields
              </Typography>
              <span className={classes.tabEditPlaceholder} />
            </Column>
            <Column small={3} className={classes.tabColumn}>
              <Typography variant='subtitle2' className={classes.tabCount}>
                7 Fields
              </Typography>
            </Column>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </Tooltip>
      {userTabs.map((tab, i) => (
        <ExpansionPanel
          key={tab.id}
          disabled={isLocked(tab.id)}
          expanded={isExpanded(tab.id, i)}
          onChange={() => panelChange(tab)}
          className={panelClass(tab.id)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.summary}
            classes={{
              root:       rootClass(tab.id),
              expanded:   classes.summaryExpanded,
              content:    (isExpanded(tab.id) ? classes.summaryContentExpanded : classes.summaryContent),
              expandIcon: classes.expandIcon
            }}>
            <Column small={3} className={classes.tabColumn}>
              <Typography variant='subtitle2' className={classes.tabNumber}>
                {`User Tab ${i + 1}`}
              </Typography>
            </Column>
            <Column small={6} className={classes.tabColumn}>
              <Typography
                variant='subtitle2'
                className={`${classes.tabName} ${isEditing(tab.id) ? classes.tabNameEditing : ''}`}>
                {tab.name}
              </Typography>
              <Button
                variant='text'
                onClick={handleEditTabClick(tab)}
                className={`${classes.tabEditButton} ${isEditing(tab.id) ? classes.tabCancelEditButton : ''}`}
                iconHeight={0.6}
                tooltip={isEditing(tab.id) ? 'Cancel editing tab name.' : 'Edit tab name.'}
                icon={tab.id === editingId ? <CancelIcon /> : <EditIcon />}
              />
            </Column>
            <Column small={3} className={classes.tabColumn}>
              <Typography variant='subtitle2' className={classes.tabCount}>
                {`${tab.fields.length} Fields`}
              </Typography>
            </Column>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={`${classes.details} ${isEditing(tab.id) ? classes.detailsEditing : ''}`}>
            <Row>
              <Column className={classes.left}>
                <Button
                  className={classes.addFieldButton}
                  icon={<AddIcon />}
                  tooltip='Add new field to tab.'
                  color='add'
                  label='Add Field'
                />
              </Column>
              <Column className={classes.right}>
                <Button
                  variant='text'
                  color='remove'
                  className={classes.deleteFieldButton}
                  tooltip='Add new field to tab.'
                  label='Delete Tab'
                />
              </Column>
            </Row>
            <Divider className={classes.buttonDivider} />
            {tab.fields.map(renderFieldItem)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

FieldList.defaultProps = {
  editingField : null,
  editingTab   : null,
  selectedTab  : null
};

const actionCreators = {
  tabEdit     : editTab,
  cancelTab   : cancelTabEdit,
  tabSelect   : selectTab,
  fieldDelete : deleteField,
  showPreview : showPreviewFieldModal,
  showEdit    : showEditFieldModal
};

const stateProps = (state) => ({
  userTabs      : userTabsSelector(state),
  editingField  : _.get(state, 'FieldsView.editingField'),
  editingTab    : _.get(state, 'FieldsView.editingTab'),
  selectedTab   : _.get(state, 'FieldsView.selectedTab'),
});

FieldList.propTypes = {
  userTabs : PropTypes.arrayOf(PropTypes.object).isRequired,
  editingField : PropTypes.shape({
    typeId   : PropTypes.number.isRequired,
    tabName  : PropTypes.string.isRequired,
    id       : PropTypes.string.isRequired,
    label    : PropTypes.string
  }),
  editingTab : PropTypes.shape({
    id  : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired
  }),
  selectedTab: PropTypes.shape({
    id  : PropTypes.string.isRequired,
    name : PropTypes.string
  }),
  classes     : PropTypes.instanceOf(Object).isRequired,
  tabEdit     : PropTypes.func.isRequired,
  tabSelect   : PropTypes.func.isRequired,
  showEdit    : PropTypes.func.isRequired,
  fieldDelete : PropTypes.func.isRequired,
  showPreview : PropTypes.func.isRequired,
  cancelTab   : PropTypes.func.isRequired
};
export default compose(
  connect(stateProps, actionCreators),
  withStyles(styles)
)(FieldList);
