import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  withStyles
} from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import {
  MdModeEdit as EditIcon,
  MdClose as CancelIcon,
  MdDelete as DeleteIcon
} from 'react-icons/md';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from 'components/Button';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  expansionPanel: {
    margin: '10px 15px',
    [theme.breakpoints.down('sm')]: {
      margin: '1px 3px'
    }
  },
  expansionSummary: {
    background: theme.palette.primary.dark,
    margin: '6px 0px'
  },
  expansionDetails: {
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
  summaryRoot: {
    minHeight: '12px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 8px 0px 8px'
    },
    '&:hover': {
      background: theme.palette.primary.light
    },
    '& > div': {
      background: 'transparent',
      alignItems: 'center',
    }
  },
  summaryContent: {
    margin: '6px 0px',
  },
  summaryExpanded: {
    background: theme.palette.primary.main,
    minHeight: '1.5em !important',
    margin: '12px 0px 6px 0px !important'
  },
  expandIcon: {
    margin: '0px !important'
  },
  tabName : {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden'
    // width: '30%',

    // display: 'inline-block',
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
    marginRight: '10px',
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
  details: {
    alignItems: 'center',
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
  tabbedField: {
    borderRadius: '10px',
    border: 'solid 1px #456',
    padding: '7px 5px',
    margin: '3px 5px'
  }
});

const FieldList = (props) => {
  const {
    editingField,
    editField,
    cancelEdit,
    deleteField,
    savedTabs,
    classes
  } = props;

  const renderFieldItem = (field, key) => {
    const editingId = editingField ? editingField.id : null;
    return (
      <Row className={`${classes.tabbedField} ${editingId === field.id ? classes.activeField : ''}`} key={key}>
        <Column small={6} className={classes.fieldDetails}>
          <Row>
            <Column small={4} className={classes.fieldLabel}>
              <Typography variant='body1'>
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
              <Typography variant='body1'>
                Type:
              </Typography>
            </Column>
            <Column small={8} className={classes.fieldValue}>
              <Typography variant='caption'>
                {field.typeName}
              </Typography>
            </Column>
          </Row>
        </Column>
        <Column small={3} className={`${classes.fieldButtons}`}>
          <Button
            variant='outlined'
            secondary
            style={{ marginLeft: (editingId === field.id ? '0px' : '0px') }}
            className={`${classes.flexButton}`}
            label='Preview'
          />
        </Column>
        <Column small={3} className={`${classes.fieldButtons}`}>
          <Button
            variant='text'
            onClick={field.id === editingId ? cancelEdit : () => editField(field)}
            className={classes.flexButton}
            style={{ color: '#bbbbff' }}
            icon={field.id === editingId ? <CancelIcon onClick={cancelEdit} /> : <EditIcon />}
          />
          {!(field.id === editingId) && (
            <Button
              variant='text'
              onClick={() => deleteField(field.id)}
              className={classes.flexButton}
              style={{ color: '#ffbbbb' }}
              icon={<DeleteIcon />}
            />
          )}
        </Column>
      </Row>
    );
  };

  return (
    <Fragment>
      {savedTabs.map((tab, i) => (
        <ExpansionPanel
          key={i}
          className={classes.expansionPanel}
          defaultExpanded={i === 0}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.expansionSummary}
            classes={{
              root: classes.summaryRoot,
              expanded: classes.summaryExpanded,
              content: classes.summaryContent,
              expandIcon: classes.expandIcon
            }}>
            <Column>
              <Typography variant='subtitle2' className={classes.tabNumber}>
                {'Tab '}
                {i + 1}
              </Typography>
            </Column>
            <Column>
              <Typography variant='subtitle2' className={classes.tabName}>
                {tab.name}
              </Typography>
            </Column>
            <Column>
              <Typography variant='subtitle2' className={classes.tabCount}>
                {tab.fields.length}
                {' Fields'}
              </Typography>
            </Column>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionDetails}>
            {tab.fields.map(renderFieldItem)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Fragment>
  );
};

FieldList.propTypes = {
  savedTabs    : PropTypes.array.isRequired,
  cancelEdit   : PropTypes.func.isRequired,
  editingField : PropTypes.object,
  editField    : PropTypes.func.isRequired,
  deleteField  : PropTypes.func.isRequired,
  classes      : PropTypes.object.isRequired
};

export default withStyles(styles)(FieldList);
