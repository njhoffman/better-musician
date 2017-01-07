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

  const { dispatch, addSong } = props;

  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={ props.hideModal }
    />,
    <FlatButton
      label="Add"
      primary={true}
      keyboardFocused={true}
      onTouchTap={ addSong }
    />
  ];
  const textColor = props.muiTheme.palette.textColor;

  return (
    <Dialog
      title="Add Song"
      modal={false}
      actions={ actions }
      open={ props.isOpen }
      onRequestClose={ props.hideModal }
      className={css.addSongModal}
      contentStyle={dialogStyle}>
      <form onSubmit={props.addSong}>
        <div className={css.flexLeft}>
          <Field
            name="title"
            component={RenderTextField}
            label="Song Title" />
          <Field
            name="artist"
            component={RenderTextField}
            label="Song Artist" />
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
        <div className={css.bottom}>
          <Field
            name="difficulty"
            className={css.difficulty}
            min={1}
            max={20}
            step={1}
            textColor={textColor}
            component={RenderSliderField}
            label="Difficulty" />
          <Field
            name="progress"
            className={css.progress}
            min={0}
            max={4}
            step={1}
            textColor={textColor}
            component={RenderSliderField}
            label="Progress" />
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

export default muiThemeable()(reduxForm({ form: 'addSongForm', validate })(AddSongModal));
