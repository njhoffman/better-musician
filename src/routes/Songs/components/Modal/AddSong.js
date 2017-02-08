import React from 'react';
import { chunk } from 'lodash';
import { reduxForm } from 'redux-form';
import { Dialog, FlatButton, RaisedButton, Tabs, Tab } from 'material-ui';
import { Row, Column } from 'react-foundation';
import muiThemeable from 'material-ui/styles/muiThemeable';
import css from './AddSong.scss';
import CustomField from 'components/CustomField';
import FormField, { RenderStars } from 'components/Field';
import { MdDelete as DeleteIcon } from 'react-icons/lib/md';

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
  const { addSong, editSong, modal } = props;
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

  const textColor = props.muiTheme.palette.textColor;
  const className = css.addSongModal + ' ' + css[modalView];

  lastActiveField = ['artist', 'instrument'].indexOf(props.activeField) !== -1 ? props.activeField : lastActiveField;
  const renderImage = (props) => {
    if (props.activeField === 'artist' || lastActiveField === 'artist') {
      if (props.matchedArtist) {
        return (
          <Row className={css.imageFrame}>
            <Column>
              <img src={'/artists/' + props.matchedArtist.picture} />
              <div>{props.matchedArtist.fullName}</div>
              { !isView && <RaisedButton secondary label='Change Picture' /> }
            </Column>
          </Row>
        );
      } else {
        return (
          <Row className={css.imageFrame}>
            <Column>
              <img src='/artists/unknown_artist.png' />
              <div>Unknown Artist</div>
              { !isView && <RaisedButton secondary label='Add Picture' /> }
            </Column>
          </Row>
        );
      }
    } else if (props.activeField === 'instrument' || lastActiveField === 'instrument') {
      return (
        <Row className={css.imageFrame}>
          <Column>
            <img src='/instruments/unknown_instrument.png' />
            <div>Unknown Instrument</div>
            { !isView && <RaisedButton secondary label='Add Picture' /> }
          </Column>
        </Row>
      );
    }
  };

  const renderStars = (theme, number) => {
    return (
      <RenderStars
        starColor={theme.starColor}
        number={number}
        style={{ float: 'right', display: 'inline-block' }} />
    );
  };

  const dialogStyle = { maxWidth: '650px', width: 'initial' };
  const dialogBodyStyle = { padding: '5px' };
  const tabContainerStyle = { paddingTop: '20px' };
  const labelStyle = isView ? { textAlign: 'center', width: '100%' } : {};
  const textInputStyle = isView ? { color: 'white', cursor: 'text', textOverflow: 'ellipsis' } : {};
  const textStyle = isView ? { cursor: 'default' } : {};
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
      <form onSubmit={props.addSong}>
        <Tabs contentContainerStyle={tabContainerStyle}>
          <Tab
            value='main'
            label='Main Fields'>
            <Row>
              <Column>
                { renderImage(props) }
              </Column>
            </Row>
            {isView &&
              <Row>
                <FormField
                  name='title'
                  type='text'
                  underlineShow={!isView}
                  disabled={isView}
                  style={textStyle}
                  inputStyle={textInputStyle}
                  viewType={modalView}
                  label='Song Title' />
                <FormField
                  name='artist.fullName'
                  type='autocomplete'
                  viewType={modalView}
                  underlineShow={!isView}
                  disabled={isView}
                  inputStyle={textInputStyle}
                  style={textStyle}
                  textFieldStyle={textInputStyle}
                  dataSource={props.artists}
                  label='Song Artist' />
              </Row>
            }
            {!isView &&
              <div>
                <Row>
                  <FormField
                    name='title'
                    type='text'
                    underlineShow={!isView}
                    disabled={isView}
                    small={8}
                    centerOnSmall
                    style={{ ...textStyle, ...{ width: '100%' } }}
                    inputStyle={textInputStyle}
                    viewType={modalView}
                    label='Song Title' />
                </Row>
                <Row>
                  <FormField
                    name='artist.lastName'
                    type='autocomplete'
                    viewType={modalView}
                    underlineShow={!isView}
                    disabled={isView}
                    inputStyle={textInputStyle}
                    style={textStyle}
                    textFieldStyle={textInputStyle}
                    dataSource={props.artists}
                    label='Last Name / Band' />
                  <FormField
                    name='artist.firstName'
                    type='autocomplete'
                    viewType={modalView}
                    underlineShow={!isView}
                    disabled={isView}
                    inputStyle={textInputStyle}
                    style={textStyle}
                    textFieldStyle={textInputStyle}
                    dataSource={props.artists}
                    label='First Name' />
                </Row>
              </div>
            }
            <Row>
              <FormField
                name='genre.name'
                type='autocomplete'
                label='Song Genre'
                underlineShow={!isView}
                style={textStyle}
                inputStyle={textInputStyle}
                textFieldStyle={textInputStyle}
                disabled={isView}
                dataSource={props.genres} />
              <FormField
                name='instrument.name'
                type='autocomplete'
                dataSource={props.instruments}
                style={textStyle}
                inputStyle={textInputStyle}
                textFieldStyle={textInputStyle}
                underlineShow={!isView}
                disabled={isView}
                viewType={modalView}
                label='Instrument' />
            </Row>
            <Row>
              <FormField
                type='slider'
                viewType={modalView}
                name='difficulty'
                className={css.difficulty}
                small={6}
                min={1}
                max={props.maxDifficulty}
                step={1}
                disabled={isView}
                textColor={textColor}
                label='Difficulty' />
              <FormField
                name='progress'
                type='slider'
                viewType={modalView}
                className={css.progress}
                valueDisplay={renderStars.bind(undefined, props.muiTheme)}
                disabled={isView}
                small={6}
                min={0}
                max={4}
                step={1}
                textColor={textColor}
                label='Progress' />
            </Row>
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
  addSong:       React.PropTypes.func,
  genres:        React.PropTypes.array,
  instruments:   React.PropTypes.array,
  uiHideModal:   React.PropTypes.func,
  isOpen:        React.PropTypes.bool,
  modal:         React.PropTypes.object,
  activeField:   React.PropTypes.string,
  matchedArtist: React.PropTypes.object,
  savedTabs:     React.PropTypes.array,
  muiTheme:      React.PropTypes.object,
  editSong:      React.PropTypes.func,
  artists:       React.PropTypes.array,
  maxDifficulty: React.PropTypes.number
};

export default muiThemeable()(reduxForm({ form: 'addSongForm', enableReinitialize: true, validate })(AddSongModal));
