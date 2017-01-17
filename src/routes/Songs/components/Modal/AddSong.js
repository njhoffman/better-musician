import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RenderSelectField, RenderTextField, RenderSliderField } from 'components/Field';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import muiThemeable from 'material-ui/styles/muiThemeable';
import css from './AddSong.scss';

const dialogStyle = {
  maxWidth: "650px"
};

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
  const title = modalView === 'view'
    ? 'View Song'
    : modalView === 'edit'
    ? 'Edit Song'
    : 'Add Song';
  const className = css.addSongModal + ' ' + css[props.modal.modalView];

  return (
    <Dialog
      title={title}
      modal={false}
      actions={ actionButtons }
      open={ props.isOpen }
      onRequestClose={ props.hideModal }
      className={className}
      contentStyle={dialogStyle}>
      <form onSubmit={props.addSong}>
        <div className={css.bottom}>
          <div className={css.flexLeft}>
            <div className={css.songTitle}>
              <Field
                name="title"
                component={RenderTextField}
                viewType={props.modal.modalView}
                label="Song Title" />
            </div>
            <div className={css.artistName}>
              <Field
                name="artist"
                viewType={props.modal.modalView}
                component={RenderTextField}
                label="Song Artist" />
            </div>
          </div>
          <div className={css.flexRight}>
            <Field name="genre"
              component={RenderSelectField}
              label="Song Genre">
              {props.genres && props.genres.map(genre =>
                <MenuItem
                  key={genre.id}
                  value={genre.id}
                  primaryText={genre.name}
                />
              )}
            </Field>
            <Field
              name="instrument"
              component={RenderSelectField}
              viewType={props.modal.modalView}
              label="Instrument">
              {props.instruments && props.instruments.map(instrument =>
                <MenuItem
                  key={instrument.id}
                  value={instrument.id}
                  primaryText={instrument.name}
                />
              )}
            </Field>
          </div>
        </div>
        <div className={css.bottom}>
          <div className={css.flexLeft}>
            <Field
              component={RenderSliderField}
              viewType={props.modal.modalView}
              name="difficulty"
              className={css.difficulty}
              min={1}
              max={20}
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
              min={0}
              max={4}
              step={1}
              textColor={textColor}
              label="Progress" />
          </div>
        </div>
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
