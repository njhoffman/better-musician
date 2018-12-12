import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, Divider, Typography,
  ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel,
  DialogActions, DialogTitle, withStyles,
} from '@material-ui/core';
import { Column } from 'react-foundation';
import { formValueSelector } from 'redux-form';

import {
  MdSave as SaveIcon,
  // MdAdd as AddIcon
} from 'react-icons/md';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/AddBox';

import { EDIT_FIELD_MODAL, FIELD_VIEW_ALT } from 'constants/ui';
import { uiHideModal, uiModalExit } from 'actions/ui';
import { updateField, addField } from 'actions/api';
import { cancelFieldEdit } from 'routes/Fields/modules/actions';
import { editField as editFieldSelector } from 'routes/Fields/modules/selectors';

import EditFieldForm from 'components/Forms/EditField';
import PreviewFieldForm from 'components/Forms/PreviewField';
import Button from 'components/Button';

const styles = (theme) => ({
  dialogPaper: {
    alignSelf: 'start',
    margin: '0px',
    maxHeight: '100vh',
    top: '10%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.app.headerHeight,
      // half of add song modal width
      // minWidth: '225px',
      minWidth: '400px',
    },
    [theme.breakpoints.up('md')]: {
      // half of add song modal width
      // minWidth: '275px'
      minWidth: '500px'
    }
  },
  dialogTitle: {
    textAlign: 'center',
    padding: '12px 12px 6px'
  },
  divider: {
    width: '80%',
    margin: '10px auto',
  },
  dialogContent: {
    textAlign: 'center',
    // TODO: why does star slider extend dialog width along X-axis?
    overflowX: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    padding: '0 !important', // :first-child padding-top: 24px
  },
  form: {
    alignSelf: 'center',
    maxHeight: '100%',
    width: '100%'
  },
  inline: {
    display: 'inline-block'
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  summary: {
    background: theme.palette.primary.dark,
  },
  expandIcon: {
    margin: '0px !important',
    background: 'transparent !important'
  },
  previewExpansion: {
    width: '100%',
    margin: '0px 40px 10px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 20px 10px 20px',
    },
  },
  summaryContent: {
    margin: '0px',
    justifyContent: 'center',
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
    background: theme.palette.primary.main,
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
});

const EditModal = ({
  classes,
  isOpen,
  hideModal,
  modalExit,
  update,
  add,
  cancel,
  editingField,
  editFormTypeId,
  editFormLabel,
  tabName,
  ...props
}) => {
  const disabled =  false;
  // TODO: integrate into Field model

  return (
    <Dialog
      onExited={modalExit}
      open={isOpen}
      classes={{ paper: `${classes.dialogPaper}` }}>
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h6'>Editing Field</Typography>
        <div>
          <Typography className={classes.inline} variant='caption' color='textSecondary'>
            {'Tab #2 :'}
          </Typography>
          {' '}
          <Typography className={classes.inline} variant='overline' color='textPrimary'>
            {`${tabName}`}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <EditFieldForm
          initialValues={{
            typeId : editingField.typeId,
            label  : editingField.label
          }}
          {...editingField}
        />
      </DialogContent>
      <DialogContent className={classes.dialogContent}>
        <ExpansionPanel className={classes.previewExpansion}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.summary}
            classes={{
              root:       classes.summaryRoot,
              expanded:   classes.summaryExpanded,
              content:    classes.summaryContent,
              expandIcon: classes.expandIcon
            }}>
            <Typography align='center' color='textSecondary' variant='h6'>
              Preview Field
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <PreviewFieldForm
              initialValues={{
                previewField: editingField.defaultValue
              }}
              {...editingField}
              typeId={parseInt(editFormTypeId || editingField.typeId, 10)}
              viewMode={FIELD_VIEW_ALT}
              label={editFormLabel || editingField.label}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </DialogContent>
      <Divider className={classes.divider} />
      <DialogActions>
        <Column className={classes.center}>
          <Button
            label='Close'
            size='small'
            style={{ width: '100px', marginRight: '15px' }}
            className='update-fields-submit'
            variant='text'
            onClick={() => {
              cancel();
              hideModal();
            }}
            color='secondary'
          />
          <Button
            primary
            type='submit'
            onClick={() => update()}
            label={editingField ? 'Update' : 'Add'}
            labelStyle={{ paddingRight: '5px' }}
            style={{ width: '100px', marginRight: '15px' }}
            icon={editingField ? <SaveIcon /> : <AddIcon />}
            iconAlign='left'
            size='small'
            className='update-fields-submit'
            disabled={disabled}
          />
        </Column>
      </DialogActions>
    </Dialog>
  );
};

EditModal.defaultProps = {
  editingField: null
};

EditModal.propTypes = {
  isOpen       : PropTypes.bool.isRequired,
  classes      : PropTypes.instanceOf(Object).isRequired,
  editingField : PropTypes.instanceOf(Object),
  update       : PropTypes.func.isRequired,
  add          : PropTypes.func.isRequired,
  cancel       : PropTypes.func.isRequired,
  hideModal    : PropTypes.func.isRequired,
  modalExit    : PropTypes.func.isRequired
};

const actionCreators = {
  update      : updateField,
  add         : addField,
  cancel      : cancelFieldEdit,
  hideModal   : uiHideModal,
  modalExit   : uiModalExit
};

const stateProps = (state) => ({
  isOpen         : _.get(state, 'ui.modal.name') === EDIT_FIELD_MODAL && _.get(state, 'ui.modal.isOpen'),
  tabName        : _.get(state, 'FieldsView.selectedTab.name'),
  editFormTypeId : formValueSelector('editField')(state, 'typeId'),
  editFormLabel  : formValueSelector('editField')(state, 'label'),
  editingField   : editFieldSelector(state)
});

export default connect(stateProps, actionCreators)(withStyles(styles)(EditModal));
