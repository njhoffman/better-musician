import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Column } from 'react-foundation';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, Divider, DialogContent, Typography, DialogActions, withStyles
} from '@material-ui/core';
import { FILTERS_MODAL } from 'constants/ui';
import { uiHideModal, uiModalExit } from 'actions/ui';
import {
  MdSave as SaveIcon,
  // MdAdd as AddIcon
} from 'react-icons/md';


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
});

export const FiltersModal = ({ hideModal, modalExit, classes, isOpen }) => {
  const actions = [
    <Button
      key={0}
      label='Cancel'
      variant='text'
      primary
      onTouchTap={hideModal}
    />,
    <Button
      key={1}
      label='Submit'
      variant='text'
      primary
      keyboardFocused
      onTouchTap={hideModal}
    />
  ];

  return (
    <Dialog
      title='Filters Dialog'
      modal={false}
      actions={actions}
      onExited={modalExit}
      open={isOpen}
      classes={{ paper: `${classes.dialogPaper}` }}>
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h6'>
          Filter Songs
        </Typography>
        <Typography variant='caption' color='secondary'>
          17 / 23 Songs
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Column style={{ height: '300px', overflowY: 'scroll' }}>
          <Typography variant='body2'>
            <span>body2:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='body1'>
            <span>body1:</span>
            <span> The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='subtitle2'>
            <span>subtitle2:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='subtitle1'>
            <span>subtitle1:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='overline'>
            <span>overline:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='button'>
            <span>button:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='caption'>
            <span>caption:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h6'>
            <span>h6:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h5'>
            <span>h5:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h4'>
            <span>h4:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h3'>
            <span>h3:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h2'>
            <span>h2:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h1'>
            <span>h1:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
        </Column>
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
            onClick={() => hideModal()}
            color='secondary'
          />
          <Button
            primary
            type='submit'
            onClick={() => {}}
            label='Apply'
            labelStyle={{ paddingRight: '5px' }}
            style={{ width: '100px', marginRight: '15px' }}
            icon={<SaveIcon />}
            iconAlign='left'
            size='small'
            className='update-fields-submit'
            disabled={false}
          />
        </Column>
      </DialogActions>
    </Dialog>
  );
};

FiltersModal.defaultProps = {
  isOpen: false
};

FiltersModal.propTypes = {
  modalExit:   PropTypes.func.isRequired,
  hideModal:   PropTypes.func.isRequired,
  isOpen:      PropTypes.bool
};

const mapDispatchToProps = {
  hideModal : uiHideModal,
  modalExit : uiModalExit
};

const mapStateToProps = (state) => ({
  modal:         state.ui.modal,
  isOpen:        _.get(state, 'ui.modal.name') === FILTERS_MODAL && _.get(state, 'ui.modal.isOpen'),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FiltersModal));
