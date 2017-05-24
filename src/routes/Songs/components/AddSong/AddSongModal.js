import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { chunk, get } from 'lodash';
import { reduxForm } from 'redux-form';
import { Dialog, Tabs, Tab } from 'material-ui';
import { Row } from 'react-foundation';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { uiHideModal, MODAL_ADD_SONG } from 'store/ui';
import {
  currentSong as currentSongSelector,
  savedTabs as savedTabsSelector
} from 'routes/Songs/modules/selectors';

import AddSongMainTab from './AddSongMainTab';
import AddSongButtons from './AddSongButtons';
import CustomField from 'components/CustomField';
import css from './AddSong.scss';

let lastActiveField = 'artist';

export const AddSongModal = (props) => {
  const { modal, muiTheme } = props;
  const modalView = {
    isView : () =>  modal.props.action === 'view',
    isEdit : () =>  modal.props.action === 'edit',
    isAdd : () =>  modal.props.action === 'add',
    getName: () => modal.props.action
  };

  const className = css.addSongModal + ' ' + css[props.modal.action];

  lastActiveField = ['artist', 'instrument'].indexOf(props.activeField) !== -1 ? props.activeField : lastActiveField;

  const labelStyle     = modalView.isView() ? { textAlign: 'center', width: '100%' } : { };
  const textInputStyle = modalView.isView() ? { color: muiTheme.palette.textColor } : { };
  const textStyle      = modalView.isView() ? { cursor: 'default' } : {};

  const styleObj = {
    dialog       : { maxWidth: '650px', width: 'initial' },
    dialogBody   : { padding: '5px', overflowY: 'auto' },
    tabContainer : { paddingTop: '20px' }
  };

  const mainTabProps = {
    lastActiveField,
    textInputStyle,
    labelStyle,
    textStyle,
    muiTheme,
    modalView
  };

  console.info('savedTabs', props.savedTabs);
  return (
    <Dialog
      modal={false}
      actions={<AddSongButtons modalView={modalView} />}
      open={props.isOpen}
      onRequestClose={props.uiHideModal}
      bodyStyle={styleObj.dialogBody}
      repositionOnUpdate={false}
      className={className}
      contentStyle={styleObj.dialog}>
      <form>
        <Tabs contentContainerStyle={styleObj.tabContainer}>
          <Tab value='main' label='Main Fields'>
            <AddSongMainTab {...mainTabProps} />
          </Tab>
          {props.savedTabs.map((tab, tabIdx) =>
            <Tab
              key={tabIdx}
              label={tab.name}>
              {chunk(tab.fields, 2).map((fields, fieldIdx) =>
                <Row
                  style={{ textAlign: 'center' }}
                  key={fieldIdx}>
                  {fields.map((field) =>
                    <CustomField
                      key={field.idx}
                      style={textStyle}
                      labelStyle={labelStyle}
                      disabled={modalView.isView()}
                      underlineShow={!modalView.isView()}
                      inputStyle={textInputStyle}
                      field={field}
                      initialValues={props.initialValues}
                      centerOnSmall
                      small={fields.length === 1 ? 12 : 6}
                    />
                  )}
                </Row>
              )}
            </Tab>
            )}
        </Tabs>
      </form>
    </Dialog>
  );
};

AddSongModal.propTypes = {
  uiHideModal:   PropTypes.func.isRequired,
  isOpen:        PropTypes.bool.isRequired,
  modal:         PropTypes.object.isRequired,
  savedTabs:     PropTypes.array.isRequired,
  muiTheme:      PropTypes.object.isRequired
};

const validate = (values) => {
  const errors = {};
  // TODO: figure out why autocomplete meta doesnt get errors or touched assigned
  const requiredFields = [ 'title', 'artist.lastName', 'instrument.name' ];
  requiredFields.forEach(field => {
    if (!get(values,  field) ) {
      errors[ field ] = 'Required';
    }
  });
  console.info('errors', errors);
  return errors;
};

const initialValues = (song, modalAction) => {
  if (song && modalAction !== 'add') {
    // return object for nested models, redux form tries to reset and breaks if not a plain object
    const ivSong = Object.assign({}, song);
    ivSong.artist = song.artist.ref;
    ivSong.genre = song.genre.ref;
    ivSong.instrument = song.instrument.ref;
    return ivSong;
  }
};

const mapDispatchToProps = { uiHideModal };

const mapStateToProps = (state) => ({
  initialValues: initialValues(currentSongSelector(state), state.ui.modal.props.action),
  activeField:   state.form.addSongForm ? state.form.addSongForm.active : null,
  formValues:    state.form.addSongForm ? state.form.addSongForm.values : null,
  savedTabs:     savedTabsSelector(state),
  modal:         state.ui.modal,
  isOpen:        state.ui.modal.type === MODAL_ADD_SONG
});

const addSongForm = muiThemeable()(reduxForm({ form: 'addSongForm', enableReinitialize: true, validate })(AddSongModal));
export default connect(mapStateToProps, mapDispatchToProps)(addSongForm);
