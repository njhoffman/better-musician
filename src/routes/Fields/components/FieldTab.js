import _ from 'lodash';
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Tooltip,
  withStyles
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/AddCircle';
import { MdModeEdit as EditIcon, } from 'react-icons/md';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from 'components/Button';
import {
  selectTab,
  editTab,
  cancelTabEdit,
} from 'routes/Fields/modules/actions';
import FieldItem from './FieldItem';

const styles = (theme) => ({
  panel: {
    margin: '10px 15px',
    [theme.breakpoints.down('sm')]: {
      margin: '1px 3px'
    }
  },
  panelLocked: {
    opacity: 0.5
  },
  panelEditing: { },
  panelExpanded: { },
  expandIcon: {
    margin: '0px !important',
    background: 'transparent !important'
  },
  summary: {
    background: theme.palette.primary.dark,
    // margin: '6px 0px'
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
    // boxShadow: [
    //   // off-x, off-y, blur-R, spread-R, color
    //   '0px 1px 2px -1px rgba(0, 0, 0, 0.5)',
    //   '0px 1px 5px 0px rgba(0, 0, 0, 0.34)',
    //   '0px 1px 10px 0px rgba(0, 0, 0, 0.22)'
    // ].join(','),
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
  left: {
    display: 'flex',
    flexBasis: 'auto',
    flexGrow: '0'
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  editTabButton: {
    opacity: 0.8,
    minHeight: '28px',
    // minWidth: '48px',
    // minHeight: '24px',
    // padding: '4px 5px'
  },
  tabColumn: {
    padding: 0
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
  buttonDivider: {
    marginTop: '3px',
    marginBottom: '0px'
  },
  addFieldButton: {
    opacity: 0.8,
    minHeight: '28px',
    // minWidth: '48px',
    // minHeight: '24px',
    // padding: '4px 5px'
  }
});

const FieldTab = (props) => {
  const {
    editingTab,
    selectedTab,
    cancelTab,
    tabSelect,
    tabEdit,
    tab,
    classes
  } = props;

  const isPrimary = tab.id === -1;
  const selectedTabId = _.get(selectedTab, 'id');

  const isExpanded = (tabId) => Boolean(tabId === selectedTabId);
  const isEditingTab = (tabId) => Boolean(tabId === selectedTabId && editingTab);
  const isLocked = (tabId) => Boolean(tabId === -1 || editingTab);

  const panelClass = (tabId) => ([
    `${classes.panel}`,
    `${isExpanded(tabId) ? classes.panelExpanded : ''}`,
    `${isEditingTab(tabId) ? classes.panelEditing : ''}`,
    `${isLocked(tabId) ? classes.panelLocked : ''}`
  ].join(' '));

  const rootClass = (tabId) => ([
    `${classes.summaryRoot}`,
    `${isEditingTab(tabId) ? classes.summaryEditing : ''}`,
    `${isLocked(tabId) ? classes.summaryLocked : ''}`
  ].join(' '));

  const panelChange = () => {
    if (!editingTab) {
      tabSelect(isExpanded(tab.id) ? null : tab);
    }
  };

  return (
    <Tooltip
      title={isPrimary ? 'Primary tab fields cannot be modified or removed.' : 'Click to expand.'}>
      <ExpansionPanel
        key={tab.id}
        disabled={isLocked(tab.id)}
        expanded={isExpanded(tab.id)}
        onChange={() => panelChange()}
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
              {isPrimary ? 'Primary Tab' : `User Tab ${tab.tabIdx + 1}`}
            </Typography>
          </Column>
          <Column small={6} className={classes.tabColumn}>
            <Typography
              variant='subtitle2'
              className={`${classes.tabName} ${isEditingTab(tab.id) ? classes.tabNameEditing : ''}`}>
              {tab.name}
            </Typography>
          </Column>
          <Column small={3} className={classes.tabColumn}>
            <Typography variant='subtitle2' className={classes.tabCount}>
              {/* {`${tab.fields.length} Fields`} */}
            </Typography>
          </Column>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={`${classes.details} ${isEditingTab(tab.id) ? classes.detailsEditing : ''}`}>
          <Row>
            <Column className={classes.left}>
              <Button
                className={classes.addFieldButton}
                icon={<AddIcon />}
                tooltip={`Add new field to "${tab.naame}" tab.`}
                color='add'
                label='Add Field'
              />
            </Column>
            <Column className={classes.right}>
              <Button
                className={classes.editTabButton}
                onClick={(() => {
                  tabSelect(tab);
                  if (tab.id === editingTab.Id) {
                    return cancelTab();
                  }
                  return tabEdit(tab);
                })}
                icon={<EditIcon />}
                tooltip={`Change tab name of "${tab.name}"`}
                color='primary'
                label='Edit Tab'
              />
            </Column>
            <Column className={classes.right}>
              <Button
                variant='text'
                color='remove'
                className={classes.deleteTabButton}
                tooltip={`Remove this field from "${tab.name}" tab.`}
                label='Delete Tab'
              />
            </Column>
          </Row>
          <Divider className={classes.buttonDivider} />

          {tab.fields && tab.fields.map((field) => (
            <FieldItem field={field} key={field.id} />
          ))}

        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Tooltip>
  );
};

FieldTab.defaultProps = {
  editingTab  : null,
  selectedTab : null
};

const actionCreators = {
  tabEdit   : editTab,
  cancelTab : cancelTabEdit,
  tabSelect : selectTab,
};

const stateProps = (state) => ({
  editingTab    : _.get(state, 'FieldsView.editingTab'),
  selectedTab   : _.get(state, 'FieldsView.selectedTab'),
});

FieldTab.propTypes = {
  editingTab : PropTypes.shape({
    id  : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired
  }),
  selectedTab: PropTypes.shape({
    id  : PropTypes.string.isRequired,
    name : PropTypes.string
  }),
  classes   : PropTypes.instanceOf(Object).isRequired,
  tab       : PropTypes.instanceOf(Object).isRequired,
  cancelTab : PropTypes.func.isRequired,
  tabEdit   : PropTypes.func.isRequired,
  tabSelect : PropTypes.func.isRequired,
};

export default compose(
  connect(stateProps, actionCreators),
  withStyles(styles)
)(FieldTab);
