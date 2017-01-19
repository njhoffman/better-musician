import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Dialog, FlatButton, RaisedButton, MenuItem, Tabs, Tab } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import css from './AddSong.scss';

import {
  RenderSelectField,
  RenderAutoCompleteField,
  RenderStars,
  RenderDifficulty,
  RenderTextField,
  RenderSliderField
} from 'components/Field';

const dialogStyle = {
  maxWidth: "650px"
};

const dialogBodyStyle = {
  padding: "5px"
};

const tabContainerStyle = {
  paddingTop: "20px"
}

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

  const { dispatch, addSong, modal } = props;
  const modalView = modal.modalView;

  const buttonLabel = modalView === 'view'
    ? 'Edit'
    : modalView === 'edit'
    ? 'Save'
    : 'Add';

  const actionButtons = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={ props.hideModal }
    />,
    <FlatButton
      label={buttonLabel}
      primary={true}
      keyboardFocused={true}
      onTouchTap={ addSong }
    />
  ];

  if (modalView !== 'add') {
    actionButtons.unshift(
      <FlatButton
        label='Delete'
        style={{float: 'left' }}
        onTouchTap={ addSong }
      />
    );
  }

  const textColor = props.muiTheme.palette.textColor;
  const className = css.addSongModal + ' ' + css[props.modal.modalView];

  lastActiveField = ['artist', 'instrument'].indexOf(props.activeField) !== -1 ? props.activeField : lastActiveField;
  const renderImage = (props) => {
    if (props.activeField === 'artist' || lastActiveField === 'artist') {
      if (props.matchedArtist) {
        return (
          <div className={css.imageFrame}>
            <img src={"/artists/" + props.matchedArtist.picture} />
            <div>{props.matchedArtist.fullName}</div>
            <RaisedButton label="Change Picture" />
          </div>
        );
      } else {
        return (
          <div className={css.imageFrame}>
            <img src="/artists/unknown_artist.png" />
            <div>Unknown Artist</div>
            <RaisedButton label="Add Picture" />
          </div>
        );
      }
    } else if (props.activeField === 'instrument' || lastActiveField === 'instrument') {
        return (
          <div className={css.imageFrame}>
            <img src="/instruments/unknown_instrument.png" />
            <div>Unknown Instrument</div>
            <RaisedButton label="Add Picture" />
          </div>
        );
    }
  }

  const renderStars = (number) => {
    return (
      <RenderStars
        number={number}
      style={{ display: "inline", float: "right" }} />
    );
  };

  const renderDifficulty = (difficulty, maxDifficulty) => {
    return (
      <RenderDifficulty
        difficulty={difficulty}
        maxDifficulty={maxDifficulty}
        style={{ display: "inline", float: "right" }} />
    );
  };

  return (
    <Dialog
      modal={false}
      actions={actionButtons}
      open={props.isOpen}
      onRequestClose={props.hideModal}
      bodyStyle={dialogBodyStyle}
      className={className}
      contentStyle={dialogStyle}>
      <form onSubmit={props.addSong}>
        <Tabs contentContainerStyle={tabContainerStyle}>
          <Tab
              value="main"
              label="Main Fields">
            <div className={css.fieldGroup}>
              { renderImage(props) }
            </div>
            <div className={css.fieldGroup}>
              <div className={css.flexLeft}>
                <Field
                  name="title"
                  component={RenderTextField}
                  viewType={props.modal.modalView}
                  label="Song Title" />
              </div>
              <div className={css.flexRight}>
                <Field
                  name="artist"
                  viewType={props.modal.modalView}
                  dataSource={props.artists}
                  component={RenderAutoCompleteField}
                  label="Song Artist" />
              </div>
            </div>
            <div className={css.fieldGroup}>
              <div className={css.flexLeft}>
                <Field name="genre"
                  component={RenderAutoCompleteField}
                  label="Song Genre"
                  dataSource={props.genres} />
              </div>
              <div className={css.flexLeft}>
                <Field
                  name="instrument"
                  component={RenderAutoCompleteField}
                  dataSource={props.instruments}
                  viewType={props.modal.modalView}
                  label="Instrument" />
              </div>
            </div>
            <div className={css.fieldGroup}>
              <div className={css.flexLeft}>
                <Field
                  component={RenderSliderField}
                  viewType={props.modal.modalView}
                  name="difficulty"
                  className={css.difficulty}
                  valueDisplay={(value) => renderDifficulty(value, props.maxDifficulty)}
                  min={1}
                  max={props.maxDifficulty}
                  step={1}
                  textColor={textColor}
                  label="Difficulty" />
              </div>
              <div className={css.flexRight}>
                <Field
                  name="progress"
                  component={RenderSliderField}
                  viewType={props.modal.modalView}
                  className={css.progress}
                  valueDisplay={(value) => renderStars(value)}
                  min={0}
                  max={4}
                  step={1}
                  textColor={textColor}
                  label="Progress" />
              </div>
            </div>
          </Tab>
          <Tab
              value="extrafields"
              label="Extra Fields">
          </Tab>
        </Tabs>
      </form>
    </Dialog>
  )
};

AddSongModal.propTypes = {
  addSong:     React.PropTypes.func,
  genres:      React.PropTypes.array,
  instruments: React.PropTypes.array,
  hideModal:   React.PropTypes.func,
  isOpen:      React.PropTypes.bool
};

export default muiThemeable()(reduxForm({ form: 'addSongForm', enableReinitialize: true, validate })(AddSongModal));
