import _ from 'lodash';
import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import {
  AppBar, Dialog, DialogContent,
  DialogActions, Tabs, Tab, Typography,
  withMobileDialog, withStyles, withTheme
} from '@material-ui/core';
import { Row, Column } from 'react-foundation';

import {
  FIELD_EDIT, FIELD_ADD, FIELD_VIEW, FIELD_VIEW_ALT,
  SONG_MODAL, MODAL_VARIANT_ADD, MODAL_VARIANT_VIEW
} from 'constants/ui';

import validate from 'utils/validate';
import { uiUpdateModal, uiHideModal, uiModalExit } from 'actions/ui';
import {
  currentSong as currentSongSelector,
  userTabs as userTabsSelector
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
  tabButton: {
    minWidth: 0
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
  userFieldRow: {
    // marginTop: `${theme.spacing.unit * 2}px`,
    // marginBottom: `${theme.spacing.unit * 2}px`,
    // alignItems: 'center'
  }
});

const fieldMode = (modalVariant, fieldView) => {
  if (modalVariant === MODAL_VARIANT_VIEW) {
    return fieldView;
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

const SongEditModal = ({
  classes,
  activeField,
  userTabs,
  variant,
  isMobile,
  isOpen,
  errors,
  modalExit,
  tabChange,
  currentTab,
  theme: { app: { formField } },
}) => {
  const tabProps = { lastActiveField, activeField, variant };
  const fieldView = /label/i.test(formField.variant)
    ? FIELD_VIEW
    : FIELD_VIEW_ALT;
  lastActiveField = activeField || lastActiveField;

  const renderUserTab = (tab) => (
    <TabContainer key={tab.id}>
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

      {tab.sortedRows.map(({ idx, fields }) => (
        <FormRow key={idx} className={classes.userFieldRow}>
          {fields.map(({ id, fieldProps }) => (
            <FormField
              key={id}
              mode={fieldMode(variant, fieldView)}
              {...fieldProps}
            />
          ))}
        </FormRow>
        /* eslint-enable react/no-array-index-key */
      ))}
    </TabContainer>
  );

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
          <Tab label='Main Fields' className={classes.tabButton} value='main-fields' />
          {userTabs.map(tab => (
            <Tab key={tab.id} className={classes.tabButton} value={tab.id} label={tab.name} />
          ))}
        </Tabs>
      </AppBar>
      <DialogContent className={classes.dialogContent}>
        <form className={classes.form}>
          {currentTab === 'main-fields' && (
            <TabContainer>
              <MainTab {...tabProps} />
            </TabContainer>
          )}
          {userTabs.map(tab => tab.id === currentTab && renderUserTab(tab))}
        </form>
      </DialogContent>
      <DialogActions>
        <ActionButtons variant={variant} />
      </DialogActions>
    </Dialog>
  );
};

SongEditModal.defaultProps = {
  currentTab:  'main-fields',
  activeField: null,
  variant: null
};

SongEditModal.propTypes = {
  isOpen:        PropTypes.bool.isRequired,
  variant:       PropTypes.string,
  userTabs:     PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.array,
      id:     PropTypes.string,
      name:   PropTypes.string
    })
  ).isRequired,
  currentTab:    PropTypes.string,
  activeField:   PropTypes.string,
  classes:       PropTypes.instanceOf(Object).isRequired,
  initialValues: PropTypes.instanceOf(Object).isRequired
};

const validateFields = {
  title: [
    ['required', 'Required']
  ],
  'genre.name': [
    ['required', 'Required']
  ],
  'artist.lastName': [
    ['required', 'Required']
  ]
};

const initialValues = (song, modalVariant) => {
  if (song && modalVariant !== MODAL_VARIANT_ADD) {
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

const actionCreators = {
  hideModal: uiHideModal,
  modalExit: uiModalExit,
  tabChange: (val) => uiUpdateModal(SONG_MODAL, { currentTab: val })
};

const stateProps = (state) => ({
  initialValues: initialValues(currentSongSelector(state), _.get(state, 'ui.modal.variant')),
  userTabs:      userTabsSelector(state),
  activeField:   _.get(state, 'form.songEdit.active'),
  variant:       _.get(state, 'ui.modal.variant'),
  errors:        _.get(state, 'ui.modal.errors'),
  isOpen:        _.get(state, 'ui.modal.name') === SONG_MODAL && _.get(state, 'ui.modal.isOpen'),
  isMobile:      _.get(state, 'config.client.device.isMobile'),
  currentTab:    _.get(state, 'ui.modal.meta.currentTab')
});

const SongEditForm = compose(
  connect(stateProps, actionCreators),
  withStyles(styles),
  reduxForm({
    form: 'songEdit',
    // destroyOnUnmount: false,
    enableReinitialize: true,
    validate: validate(validateFields)
  }),
  withMobileDialog(),
  withTheme()
)(SongEditModal);

export default SongEditForm;
