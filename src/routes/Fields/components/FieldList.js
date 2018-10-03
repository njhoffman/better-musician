import React from 'react';
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
    margin: '15px 25px',
    [theme.breakpoints.down('sm')]: {
      margin: '1px 3px'
    }
  },
  expansionSummary: {
    backgroundColor: theme.palette.primary.dark,
    margin: '12px 0px'
  },
  expansionDetails: {
    flexDirection: 'column',
    padding: '8px 24px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '2px 4px 4px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '6px 8px 8px'
    }
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
    width: '25%',
    display: 'inline-block',
    fontSize: '0.8em',
    textAlign: 'right',
  },
  fieldValue: {
    width: '75%',
  },
  fieldButtons: {
    justifyContent: 'space-evenly',
    display: 'flex'
  },
  flexButton: {
    // width: '36px',
    // height: '36px',
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
    margin: '3px 0px'
  }
});

export const FieldList = (props) => {
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
      <Row className={classes.tabbedField} key={key}>
        <Column centerOnSmall small={8}>
          <Row>
            <Column small={4} className={classes.fieldLabel}>
              <Typography>
                Label:
              </Typography>
            </Column>
            <Column small={8} className={classes.fieldValue}>
              <Typography>
                {field.label}
              </Typography>
            </Column>
          </Row>
          <Row>
            <Column small={4} className={classes.fieldLabel}>
              <Typography>
                Type:
              </Typography>
            </Column>
            <Column small={8} className={classes.fieldValue}>
              <Typography>
                {field.typeName}
              </Typography>
            </Column>
          </Row>
        </Column>
        <Column className={classes.fieldButtons} small={4}>
          <Button
            variant='outline'
            secondary
            className={classes.flexButton}
            label='Preview'
          />
          <Button
            variant='flat'
            onClick={field.id === editingId ? cancelEdit : () => editField(field)}
            className={classes.flexButton}
            style={{ color: '#bbbbff'}}
            icon={
              field.id === editingId ?
                <CancelIcon onClick={cancelEdit} />
                : <EditIcon />
            }
          />
          {!(field.id === editingId) &&
              <Button
                variant='flat'
                onClick={() => deleteField(field.id)}
                className={classes.flexButton}
                style={{ color: '#ffbbbb' }}
                icon={<DeleteIcon />}
              />
          }
        </Column>
      </Row>
    );
  };

  return (
    <div>
      {savedTabs.map((tab, i) => (
        <ExpansionPanel
          key={i}
          className={classes.expansionPanel}
          hoverColor='rgba(0, 151, 167, 0.4'
          defaultExpanded={i === 0}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansionSummary}>
            <Column>
              <Typography variant='subheading' className={classes.tabNumber}>
                Tab {i + 1}
              </Typography>
            </Column>
            <Column>
              <Typography variant='subheading' className={classes.tabName}>
                {tab.name}
              </Typography>
            </Column>
            <Column>
              <Typography variant='subheading' className={classes.tabCount}>
                {tab.fields.length + ' Fields'}
              </Typography>
            </Column>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionDetails}>
            {tab.fields.map(renderFieldItem)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
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
