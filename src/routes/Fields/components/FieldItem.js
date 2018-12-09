
import _ from 'lodash';
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  withStyles
} from '@material-ui/core';
import { Row, Column } from 'react-foundation';
import {
  MdModeEdit as EditIcon,
  MdDelete as DeleteIcon
} from 'react-icons/md';

import Button from 'components/Button';
import { deleteField } from 'actions/api';
import {
  showPreviewFieldModal,
  showEditFieldModal
} from 'routes/Fields/modules/actions';

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

const FieldItem = (props) => {
  const {
    editingFieldId,
    editingTab,
    field,
    fieldDelete,
    showPreview,
    showEdit,
    classes
  } = props;

  return (
    <Row
      className={`${classes.tabbedField} ${editingFieldId === field.id ? classes.activeField : ''}`}
      key={field.id}>
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
          className={`${classes.flexButton}`}
          onClick={() => showPreview(field.id)}
          label='Preview'
        />
      </Column>
      <Column small={3} className={`${classes.fieldButtons}`}>
        <Button
          variant='text'
          disabled={Boolean(editingTab)}
          onClick={() => showEdit(field.id)}
          className={classes.flexButton}
          style={{ color: '#bbbbff' }}
          icon={<EditIcon />}
        />
        <Button
          variant='text'
          disabled={Boolean(editingTab)}
          onClick={() => fieldDelete(field.id)}
          className={classes.flexButton}
          style={{ color: '#ffbbbb' }}
          icon={<DeleteIcon />}
        />
      </Column>
    </Row>
  );
};

FieldItem.defaultProps = {
  editingTab     : null
};

const actionCreators = {
  fieldDelete : deleteField,
  showPreview : showPreviewFieldModal,
  showEdit    : showEditFieldModal
};

const stateProps = (state) => ({
  editingFieldId  : _.get(state, 'FieldsView.editingFieldId'),
  editingTab      : _.get(state, 'FieldsView.editingTab')
});

FieldItem.propTypes = {
  editingTab : PropTypes.shape({
    id  : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired
  }),
  field       : PropTypes.instanceOf(Object).isRequired,
  classes     : PropTypes.instanceOf(Object).isRequired,
  editingFieldId: PropTypes.string,
  showEdit    : PropTypes.func.isRequired,
  fieldDelete : PropTypes.func.isRequired,
  showPreview : PropTypes.func.isRequired
};
export default compose(
  connect(stateProps, actionCreators),
  withStyles(styles)
)(FieldItem);
