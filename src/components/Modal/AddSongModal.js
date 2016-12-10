import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui-superSelectField';

import css from './AddSongModal.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {
    Checkbox,
    RadioButtonGroup,
    // SelectField,
    TextField,
    Toggle
} from 'redux-form-material-ui'

const dialogStyle = {
  width: "75%",
  maxWidth: "none"
};

export const AddSongModal = (props) => {
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
      title="Add Song Dialog"
      modal={false}
      actions={ actions }
      open={ props.isOpen }
      onRequestClose={ props.hideModal }
      contentStyle={dialogStyle}
    >
      <p>Add Song</p>
      <form onSubmit={props.addSong}>
        <div>
          <label htmlFor="title" style={{color: textColor}}>Song Title</label>
          <Field name="title" component={TextField} type="text"/>
        </div>
        <div>
          <label htmlFor="artist" style={{color: textColor}}>Song Artist</label>
          <Field name="lastName" component={TextField} type="text"/>
        </div>
        <div>
          <label htmlFor="email" style={{color: textColor}}>Email</label>
          <Field name="email" component={TextField} type="email"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Dialog>
  )
};

AddSongModal.propTypes = {
  addSong: React.PropTypes.func,
  hideModal: React.PropTypes.func,
  isOpen: React.PropTypes.bool
};

export default muiThemeable()(reduxForm({ form: 'addSong' })(AddSongModal));
