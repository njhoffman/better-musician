import React from 'react';
import { RaisedButton } from 'material-ui';
import FormField, { RenderStars } from 'components/Field';
import { Row, Column } from 'react-foundation';
import PropTypes from 'prop-types';
import css from './AddSong.scss';

export const AddSongMainTab = (props) => {
  const {
    isView,
    lastActiveField,
    textStyle,
    textInputStyle,
    modalView,
    muiTheme: { palette: { textColor } }
  } = props;

  const renderImage = (props) => {
    const artistPicture = props.matchedArtist && props.matchedArtist.pictures && props.matchedArtist.pictures[0]
      ? 'artists/' + props.matchedArtist.pictures[0]
      : 'artists/unknown_artist.png';
    if (props.activeField === 'artist' || lastActiveField === 'artist') {
      if (props.matchedArtist) {
        return (
          <Row className={css.imageFrame}>
            <Column>
              <img src={artistPicture} />
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

  const renderStars = (number) => {
    return (
      <RenderStars
        starColor={props.muiTheme.starColor}
        number={number}
        style={{ float: 'right', display: 'inline-block' }} />
    );
  };

  const textProps = {
    disabled       : isView,
    underlineShow  : !isView,
    style          : textStyle,
    inputStyle     : textInputStyle,
    viewType       : modalView
  };

  return (
    <div>
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
              {...textProps}
              label='Song Title' />
            <FormField
              name='artist.fullName'
              type='autocomplete'
              {...textProps}
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
                {...textProps}
                small={8}
                centerOnSmall
                style={{ ...textStyle, ...{ width: '100%' } }}
                label='Song Title' />
            </Row>
            <Row>
              <FormField
                name='artist.lastName'
                type='autocomplete'
                {...textProps}
                dataSource={props.artists}
                label='Last Name / Band' />
              <FormField
                name='artist.firstName'
                type='autocomplete'
                {...textProps}
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
          {...textProps}
          dataSource={props.genres} />
        <FormField
          name='instrument.name'
          type='autocomplete'
          {...textProps}
          dataSource={props.instruments}
          label='Instrument' />
      </Row>
      <Row>
        <FormField
          name='difficulty'
          type='slider'
          min={1}
          max={props.maxDifficulty}
          step={1}
          viewType={modalView}
          className={css.difficulty}
          disabled={isView}
          textColor={textColor}
          label='Difficulty' />
        <FormField
          name='progress'
          type='slider'
          min={0}
          max={4}
          step={1}
          viewType={modalView}
          className={css.progress}
          valueDisplay={renderStars}
          disabled={isView}
          textColor={textColor}
          label='Progress' />
      </Row>
    </div>
  );
};

AddSongMainTab.propTypes = {
};

export default AddSongMainTab;
