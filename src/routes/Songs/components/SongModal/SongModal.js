import _ from 'lodash';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import {
  AppBar, Dialog, DialogContent,
  DialogActions, Tabs, Tab,
  Typography, withMobileDialog, withStyles
} from '@material-ui/core';
import { Row, Column } from 'react-foundation';

import {
  FIELD_EDIT, FIELD_ADD, FIELD_VIEW, SONG_MODAL,
  MODAL_VARIANT_ADD, MODAL_VARIANT_VIEW
} from 'constants/ui';

import { uiUpdateModal, uiModalExit } from 'actions/ui';
import {
  currentSong as currentSongSelector,
  savedTabs as savedTabsSelector
} from 'routes/Songs/modules/selectors';
import FormField, { FormRow } from 'components/Field';
import MainTab from './MainTab';
import ActionButtons from './ActionButtons';

// import css from './AddSong.scss';

let lastActiveField = '';

const styles = (theme) => ({
  dialogPaper: {
    alignSelf: 'start',
    margin: '0px',
    maxHeight: '100vh',
    top: '10%',
    [theme.breakpoints.down('xs')]: {
      top: '0%',
      height: '100%',
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.app.headerHeight,
      minWidth: '450px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '550px'
    }
  },
  mobile: {
    [theme.breakpoints.down('xs')]: {
      top: '0%',
      height: '100%'
    },
  },
  dialogContent: {
    position: 'relative',
    textAlign: 'center',
    // TODO: why does star slider extend dialog width along X-axis?
    overflowX: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // display: 'flex',
    padding: '0 !important', // :first-child padding-top: 24px,
    [theme.breakpoints.down('xs')]: {
      display: 'flex'
    }
  },
  editField: {
    color: 'red'
  },
  form: {
    alignSelf: 'center',
    maxHeight: '100%',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      top: '0'
    }
  },
  fieldGroup: {
    width: '100%',
    maxWidth: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    boxAlign: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  customFieldRow: {
    // marginTop: `${theme.spacing.unit * 2}px`,
    // marginBottom: `${theme.spacing.unit * 2}px`,
    // alignItems: 'center'
  }
});

const fieldMode = (modalVariant) => {
  if (modalVariant === MODAL_VARIANT_VIEW) {
    return FIELD_VIEW;
  } else if (modalVariant === MODAL_VARIANT_ADD) {
    return FIELD_ADD;
  }
  return FIELD_EDIT;
};

const TabContainer = ({ children }) => (
  <Fragment>
    {children}
  </Fragment>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const SongModal = ({
  classes,
  activeField,
  savedTabs,
  variant,
  isMobile,
  isOpen,
  errors,
  modalExit,
  tabChange,
  currentTab,
  initialValues
}) => {
  lastActiveField = activeField || lastActiveField;
  const tabProps = { lastActiveField, activeField, variant };
  return (
    <Dialog
      onExited={modalExit}
      open={isOpen}
      classes={{ paper: `${classes.dialogPaper} ${isMobile ? classes.mobile : ''}` }}>
      <AppBar position='static'>
        <Tabs
          centered
          fullWidth
          value={currentTab}
          onChange={(e, val) => tabChange(val)}>
          <Tab label='Main Fields' />
          {savedTabs.map((tab) => <Tab key={tab.idx} label={tab.name} />)}
        </Tabs>
      </AppBar>
      <DialogContent className={classes.dialogContent}>
        <form className={classes.form}>
          {currentTab === 0 && (
            <TabContainer>
              <MainTab {...tabProps} />
            </TabContainer>
          )}
          {savedTabs.map((tab, tabIdx) => (
            currentTab === (tabIdx + 1) && (
              <TabContainer key={tab.idx}>
                {errors && [].concat(errors).map((error, i) => (
                  <Row key={error.name}>
                    <Column>
                      <Typography variant='body1' className={classes.errorTitle}>
                        {error.name}
                      </Typography>
                      <Typography variant='caption' className={classes.errorMessage}>
                        {error.message}
                      </Typography>
                    </Column>
                  </Row>
                ))}

                {_.chunk(tab.fields, 2).map((fields, fieldIdx) => (
                  /* eslint-disable react/no-array-index-key */
                  <FormRow key={fieldIdx} className={classes.customFieldRow}>
                    {fields.map(field => (
                      <FormField
                        fullWidth={false}
                        key={field.id}
                        name={field.name}
                        mode={fieldMode(variant)}
                        initialValues={initialValues}
                        {...field}
                      />
                    ))}
                  </FormRow>
                  /* eslint-enable react/no-array-index-key */
                ))}

              </TabContainer>
            )))}
        </form>
      </DialogContent>
      <DialogActions>
        <ActionButtons variant={variant} />
      </DialogActions>
    </Dialog>
  );
};

SongModal.defaultProps = {
  currentTab:  0,
  activeField: null
};

SongModal.propTypes = {
  isOpen:        PropTypes.bool.isRequired,
  variant:       PropTypes.string.isRequired,
  savedTabs:     PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.array,
      idx: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired,
  currentTab:    PropTypes.number,
  activeField:   PropTypes.string,
  classes:       PropTypes.instanceOf(Object).isRequired,
  initialValues: PropTypes.instanceOf(Object).isRequired
};
// const validate = (values) => {
//   const errors = {};
//   // TODO: figure out why autocomplete meta doesnt get errors or touched assigned
//   #<{(| eslint-disable max-len  |)}>#
//   // addressed: https://github.com/erikras/redux-form-material-ui/pull/159/commits/55b9225a2d9a22664458eb13f5a7d67f9e659db1
//   // this breaks material-ui Dialog ref to dialogContent
//   #<{(| eslint-enable max-len  |)}>#
//   const requiredFields = [ 'title', 'artist.lastName', 'instrument.name' ];
//   requiredFields.forEach(field => {
//     if (!get(values, field)) {
//       errors[ field ] = 'Required';
//     }
//   });
//   return errors;
// };

const initialValues = (song, addModalVariant) => {
  if (song && !addModalVariant) {
    // return object for nested models, redux form tries to reset and breaks if not a plain object
    // TODO: find a better way
    const ivSong = Object.assign({}, song);
    ivSong.artist = Object.assign({}, song.artist.ref, { fullName: song.artist.fullName });
    ivSong.genre = song.genre.ref;
    ivSong.instrument = song.instrument.ref;
    return ivSong;
  }
  return {};
};

const mapDispatchToProps = {
  modalExit: uiModalExit,
  tabChange: (val) => uiUpdateModal(SONG_MODAL, { currentTab: val })
};

const mapStateToProps = (state) => ({
  initialValues: initialValues(currentSongSelector(state)),
  savedTabs:     savedTabsSelector(state),
  activeField:   _.get(state, 'form.songForm.active'),
  variant:       _.get(state, 'ui.modal.variant'),
  errors:        _.get(state, 'ui.modal.errors'),
  isOpen:        _.get(state, 'ui.modal.name') === SONG_MODAL && _.get(state, 'ui.modal.isOpen'),
  isMobile:      _.get(state, 'config.client.device.isMobile'),
  currentTab:    _.get(state, 'ui.modal.currentTab')
});

const songForm = withStyles(styles)(reduxForm({
  form: 'songForm',
  // destroyOnUnmount: false,
  enableReinitialize: true,
  // validate
})(SongModal));

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(songForm));
