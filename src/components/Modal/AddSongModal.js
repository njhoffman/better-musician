import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RenderSelectField, RenderTextField, RenderSliderField } from '../Field';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';

import css from './AddSongModal.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';

const dialogStyle = {
  width: "300px",
  maxWidth: "none"
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
  console.log("PROPS", props);


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
      onTouchTap={ props.addSong }
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
      contentStyle={dialogStyle}
    >
      <form onSubmit={props.addSong}>
        <Field name="title" component={RenderTextField} label="Song Title"/>
        <Field name="artist" component={RenderTextField}label="Song Artist"/>
        <Field name="genre" component={RenderSelectField} label="Song Genre">
          {props.genres.map(genre =>
            <MenuItem
              key={genre.id}
              value={genre.id}
              primaryText={genre.name}
            />
          )}
        </Field>
        <Field name="instrument" component={RenderSelectField} label="Instrument">
          {props.instruments.map(instrument =>
            <MenuItem
              key={instrument.id}
              value={instrument.id}
              primaryText={instrument.name}
            />
          )}
        </Field>
        <Field name="difficulty" min={0} max={50} component={RenderSliderField} label="Difficulty" />
        <Field name="progress" min={0} max={100} component={RenderSliderField} label="Progress" />
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

export default muiThemeable()(reduxForm({ form: 'addSong', validate })(AddSongModal));
