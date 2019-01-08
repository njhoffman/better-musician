import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import {
  Dialog, DialogContent, Divider, Button,
  DialogActions, DialogTitle,
  Card, CardContent, withStyles
} from '@material-ui/core';
import { Column } from 'react-foundation';

import FormField from 'components/Field';
import { changeViewMode } from 'routes/Fields/modules/actions';

import { PREVIEW_FIELD_MODAL, FIELD_VIEW, FIELD_EDIT, FIELD_VIEW_ALT } from 'constants/ui';
import PreviewFieldForm from 'components/Forms/PreviewField';
import { previewField as previewFieldSelector } from 'routes/Fields/modules/selectors';
import { uiHideModal, uiModalExit } from 'actions/ui';
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
  card: {
    width: '100%',
    margin: '0 20px'
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
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  }
});

const PreviewFieldModal = ({
  classes,
  isOpen,
  hideModal,
  previewField,
  changeView,
  modalExit,
  viewMode,
  ...props
}) => (
  <Dialog
    onExited={modalExit}
    open={isOpen}
    classes={{ paper: `${classes.dialogPaper}` }}>
    <DialogTitle variant='h6' className={classes.dialogTitle}>
      {`${previewField.typeLabel} Preview`}
    </DialogTitle>
    <DialogContent className={classes.dialogContent}>
      <FormField
        name='viewMode'
        type='radiogroup'
        onChange={(val) => changeView(val)}
        options={{
          [FIELD_EDIT]:     'Edit Mode',
          [FIELD_VIEW]:     'View Mode',
          [FIELD_VIEW_ALT]: 'View Mode #2'
        }}
      />
    </DialogContent>
    <DialogContent className={classes.dialogContent}>
      <Card className={classes.card}>
        <CardContent>
          <PreviewFieldForm
            viewMode={viewMode}
            initialValues={{ previewField: previewField.defaultValue, viewMode }}
            {...previewField}
          />
        </CardContent>
      </Card>
    </DialogContent>
    <DialogActions>
      <Column className={classes.center}>
        <Divider className={classes.divider} />
        <Button
          variant='contained'
          color='primary'
          onClick={() => hideModal()}>
          Close
        </Button>
      </Column>
    </DialogActions>
  </Dialog>
);

PreviewFieldModal.defaultProps = {
  viewMode: FIELD_EDIT,
  typeLabel: ''
};

PreviewFieldModal.propTypes = {
  classes        : PropTypes.instanceOf(Object).isRequired,
  isOpen         : PropTypes.bool.isRequired,
  hideModal      : PropTypes.func.isRequired,
  modalExit      : PropTypes.func.isRequired,
  viewMode       : PropTypes.oneOf([FIELD_VIEW, FIELD_EDIT, FIELD_VIEW_ALT]),
  typeLabel      : PropTypes.string
};

const actionCreators = {
  hideModal  : uiHideModal,
  modalExit  : uiModalExit,
  changeView : changeViewMode
};

const stateProps = (state) => ({
  isOpen    : _.get(state, 'ui.modal.name') === PREVIEW_FIELD_MODAL && _.get(state, 'ui.modal.isOpen'),
  viewMode  : _.get(state, 'ui.modal.meta.viewMode'),
  previewField: previewFieldSelector(state)
});

const previewFieldForm = withStyles(styles)(reduxForm({
  form: 'previewField',
  enableReinitialize: true,
  // validate
})(PreviewFieldModal));

export default connect(stateProps, actionCreators)(withStyles(styles)(previewFieldForm));
