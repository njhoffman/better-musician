import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import {
  Dialog, DialogContent, Divider, Button,
  DialogActions, DialogTitle, withStyles
} from '@material-ui/core';
import { Column } from 'react-foundation';

import { PREVIEW_MODAL } from 'constants/ui';
import { uiHideModal, uiModalExit } from 'actions/ui';
import FormField, { FormRow } from 'components/Field';
// import ActionButtons from './ActionButtons';

// import css from './AddSong.scss';


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
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10px'
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
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  }
});

const PreviewModal = ({
  classes,
  isOpen,
  hideModal,
  modalExit,
  fieldType,
  fieldLabel,
  fieldOptions,
  ...props
}) => {
  let typeName = 'Field';
  if (fieldType === 0) {
    typeName = 'Textbox';
  } else if (fieldType === 1) {
    typeName = 'AutoComplete Textbox';
  } else if (fieldType === 2) {
    typeName = 'Select';
  } else if (fieldType === 3) {
    typeName = 'Multiple Select';
  } else if (fieldType === 4) {
    typeName = 'Checkbox';
  } else if (fieldType === 5) {
    typeName = 'Radio Buttons';
  } else if (fieldType === 6) {
    typeName = 'Date Select';
  } else if (fieldType === 7) {
    typeName = 'YouTube Video';
  } else if (fieldType === 8) {
    typeName = 'PDF Link';
  }
  return (
    <Dialog
      onExited={modalExit}
      open={isOpen}
      classes={{ paper: `${classes.dialogPaper}` }}>
      <DialogTitle className={classes.dialogTitle}>
        {typeName}
        {' '}
Field Preview
      </DialogTitle>
      <Divider className={classes.divider} />
      <DialogContent className={classes.dialogContent}>
        <form className={classes.form}>
          <FormRow className={classes.customFieldRow}>
            <FormField
              name='previewField'
              fullWidth={false}
              type={fieldType}
              centerOnSmall
              options={fieldOptions}
              label={fieldLabel}
              {...props}
            />
          </FormRow>
        </form>
      </DialogContent>
      <DialogActions>
        <Column className={classes.center}>
          <Button
            variant='text'
            color='primary'
            onClick={() => hideModal()}>
            Close
          </Button>
        </Column>
      </DialogActions>
    </Dialog>
  );
};

PreviewModal.propTypes = {
  isOpen:        PropTypes.bool.isRequired,
  classes:       PropTypes.instanceOf(Object).isRequired
};

const mapDispatchToProps = {
  hideModal: uiHideModal,
  modalExit: uiModalExit
};

const mapStateToProps = (state) => ({
  isOpen: state.ui.modal.name === PREVIEW_MODAL && state.ui.modal.isOpen,
  fieldType: state.ui.modal && state.ui.modal.fieldType,
  fieldLabel: state.ui.modal && state.ui.modal.fieldLabel,
  fieldOptions: state.ui.modal && state.ui.modal.fieldOptions
});

const previewForm = withStyles(styles)(reduxForm({
  form: 'preview',
  enableReinitialize: true,
  // validate
})(PreviewModal));
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(previewForm));
