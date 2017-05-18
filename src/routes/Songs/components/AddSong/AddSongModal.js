import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import { reduxForm } from 'redux-form';
import { Dialog, FlatButton, RaisedButton, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import { MdDelete as DeleteIcon } from 'react-icons/lib/md';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { addSong } from '../../modules/songs';
import { MODAL_ADD_SONG, uiShowModal, uiHideModal } from 'store/ui';
import {
  currentSong as currentSongSelector,
  savedTabs as savedTabsSelector
} from 'routes/Songs/modules/selectors';

import {
  artists as artistsSelector,
  artistsMatched as artistsMatchedSelector,
  instruments as instrumentsSelector,
  genres as genresSelector
} from 'selectors/songs';

import { maxDifficulty as maxDifficultySelector } from 'selectors/users';

import CustomField from 'components/CustomField';
import AddSongMainTab from './AddSongMainTab';
import css from './AddSong.scss';

const validate = (values) => {
  const errors = {};
  const requiredFields = [ 'title', 'artist', 'instrument', 'progress' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
  });
  return errors;
};

let lastActiveField = 'artist';

export const AddSongModal = (props) => {
  const { addSong, editSong, modal, muiTheme } = props;
  const modalView = modal.props.view;
  const isView = modalView === 'view';

  const buttonLabel = isView
    ? 'Edit'
    : modalView === 'edit'
    ? 'Save'
    : 'Add';

  const actionButtons = [
    <FlatButton
      label='Cancel'
      primary
      onTouchTap={props.uiHideModal}
    />,
    <RaisedButton
      label={buttonLabel}
      primary
      onTouchTap={isView ? editSong : addSong}
    />
  ];

  if (modalView !== 'add') {
    actionButtons.unshift(
      <FlatButton
        label='Delete'
        icon={<DeleteIcon />}
        style={{ float: 'left', color: '#ff8888' }}
        onTouchTap={addSong}
      />
    );
  }

  const className = css.addSongModal + ' ' + css[modalView];

  lastActiveField = ['artist', 'instrument'].indexOf(props.activeField) !== -1 ? props.activeField : lastActiveField;

  const dialogStyle = { maxWidth: '650px', width: 'initial' };
  const dialogBodyStyle = { padding: '5px' };
  const tabContainerStyle = { paddingTop: '20px' };
  const labelStyle = isView ? { textAlign: 'center', width: '100%' } : {};
  const textInputStyle = isView ? { color: 'white', cursor: 'text', textOverflow: 'ellipsis' } : {};
  const textStyle = isView ? { cursor: 'default' } : {};

  const mainTabProps = {
    lastActiveField,
    textInputStyle,
    labelStyle,
    textStyle,
    muiTheme,
    modalView
  };

  return (
    <Dialog
      modal={false}
      actions={actionButtons}
      open={props.isOpen}
      onRequestClose={props.uiHideModal}
      bodyStyle={dialogBodyStyle}
      repositionOnUpdate={false}
      className={className}
      contentStyle={dialogStyle}>
      <form onSubmit={addSong}>
        <Tabs contentContainerStyle={tabContainerStyle}>
          <Tab value='main' label='Main Fields'>
            <AddSongMainTab {...mainTabProps} isView={isView} />
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
                      disabled={isView}
                      underlineShow={!isView}
                      inputStyle={textInputStyle}
                      field={field}
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
  addSong:       PropTypes.func.isRequired,
  uiHideModal:   PropTypes.func.isRequired,
  isOpen:        PropTypes.bool.isRequired,
  modal:         PropTypes.object.isRequired,
  savedTabs:     PropTypes.array.isRequired,
  muiTheme:      PropTypes.object.isRequired,
  editSong:      PropTypes.func.isRequired
};


const showEditSongModal = () => uiShowModal(MODAL_ADD_SONG, 'edit');

const mapDispatchToProps = {
  uiHideModal,
  addSong,
  editSong : showEditSongModal
};

const initialValues = (song) => {
  if (song) {
    // return object for nested models, redux form tries to reset and breaks if not a plain object
    const ivSong = Object.assign({}, song);
    ivSong.artist = song.artist.ref;
    ivSong.genre = song.genre.ref;
    ivSong.instrument = song.instrument.ref;
    return ivSong;
  }
  return song;
};

const mapStateToProps = (state) => ({
  initialValues: initialValues(currentSongSelector(state)),
  activeField:   state.form.addSongForm ? state.form.addSongForm.active : null,
  formValues:    state.form.addSongForm ? state.form.addSongForm.values : null,
  savedTabs:     savedTabsSelector(state),
  matchedArtist: artistsMatchedSelector(state),
  maxDifficulty: maxDifficultySelector(state),
  genres:        genresSelector(state),
  instruments:   instrumentsSelector(state),
  artists:       artistsSelector(state),
  modal:         state.ui.modal,
  isOpen:        state.ui.modal.type === MODAL_ADD_SONG
});

const addSongForm = muiThemeable()(reduxForm({ form: 'addSongForm', enableReinitialize: true, validate })(AddSongModal));
export default connect(mapStateToProps, mapDispatchToProps)(addSongForm);
