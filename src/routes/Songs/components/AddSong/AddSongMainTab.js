import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import FormField, { RenderStars } from 'components/Field';
import { Row, Column } from 'react-foundation';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import {
  artistLastNames as artistLastNamesSelector,
  artistsMatched as artistsMatchedSelector,
  instruments as instrumentsSelector,
  genres as genresSelector
} from 'selectors/songs';

import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
// import css from './AddSong.scss';

const styles = (theme) => ({
  imageFrame: {
    textAlign: 'center'
  },
  image: {
    height: '200px',
    marginBottom: '5px'
  },
  progressStars: theme.instrumental.starColor,
  row: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

export const AddSongMainTab = (props) => {
  const {
    lastActiveField,
    textStyle,
    modalView,
    matchedArtist,
    activeField,
    classes
  } = props;

  const renderImage = () => {
    const artistPicture = matchedArtist && matchedArtist.pictures && matchedArtist.pictures[0]
      ? 'artists/' + matchedArtist.pictures[0]
      : 'artists/unknown_artist.png';
    if (activeField === 'artist' || lastActiveField === 'artist') {
      if (matchedArtist) {
        return (
          <Column>
            <img className={classes.image} src={artistPicture} />
            <div>{matchedArtist.fullName()}</div>
            { !modalView.isView() && <Button variant='raised' secondary label='Change Picture' /> }
          </Column>
        );
      } else {
        return (
          <Column>
            <img className={classes.image} src='/artists/unknown_artist.png' />
            <div>Unknown Artist</div>
            { !modalView.isView() && <Button variant='raised' secondary label='Change Picture' /> }
          </Column>
        );
      }
    } else if (activeField === 'instrument' || lastActiveField === 'instrument') {
      return (
        <Column>
          <img className={classes.image} src='/instruments/unknown_instrument.png' />
          <div>Unknown Instrument</div>
          { !modalView.isView() && <Button variant='raised' secondary label='Add Picture' /> }
        </Column>
      );
    }
  };

  const renderStars = (number) => (
    <RenderStars
      className={classes.progressStars}
      number={number}
      style={{ float: 'right', display: 'inline-block' }} />
  );

  const textProps = {
    disabled       : modalView.isView(),
    style          : textStyle
  };

  const className = classes[`${modalView.getName()}Field`];

  const renderViewFields = () => (
    <Row className={classes.row}>
      <FormField
        name='title'
        type='text'
        className={className}
        {...textProps}
        label='Song Title' />
      <FormField
        name='artist.fullName'
        type='text'
        className={className}
        {...textProps}
        label='Song Artist' />
    </Row>
  );

  const renderEditFields = ({ artistLastNames }) => (
    <div>
      <Row className={classes.row}>
        <FormField
          name='title'
          type='text'
          className={className}
          {...textProps}
          small={8}
          centerOnSmall
          style={{ ...textStyle, ...{ width: '100%' } }}
          label='Song Title' />
      </Row>
      <Row className={classes.row}>
        <FormField
          name='artist.lastName'
          type='autocomplete'
          className={className}
          options={artistLastNames}
          label='Last Name / Band'
          {...textProps} />
        <FormField
          name='artist.firstName'
          type='text'
          label='First Name'
          {...textProps} />
      </Row>
    </div>
  );
  return (
    <div>
      <Row className={classes.row}>
        <Column>
          <Row className={classes.imageFrame}>
            { renderImage() }
          </Row>
        </Column>
      </Row>
      {modalView.isView() && renderViewFields()}
      {!modalView.isView() && renderEditFields(props)}
      <Row className={classes.row}>
        <FormField
          name='genre.name'
          type='autocomplete'
          label='Song Genre'
          options={props.genres}
          className={className}
          {...textProps} />
        <FormField
          name='instrument.name'
          type='autocomplete'
          label='Instrument'
          options={props.instruments}
          className={className}
          {...textProps} />
      </Row>
      <Row className={classes.row}>
        <FormField
          name='difficulty'
          type='slider'
          min={1}
          max={props.maxDifficulty}
          step={1}
          className={className}
          disabled={modalView.isView()}
          label='Difficulty' />
        <FormField
          name='progress'
          type='slider'
          min={0}
          max={4}
          step={1}
          className={className}
          valueDisplay={renderStars}
          disabled={modalView.isView()}
          label='Progress' />
      </Row>
    </div>
  );
};

AddSongMainTab.propTypes = {
  lastActiveField : PropTypes.string.isRequired,
  textStyle       : PropTypes.object.isRequired,
  modalView       : PropTypes.object.isRequired,
  matchedArtist   : PropTypes.object,
  activeField     : PropTypes.string,
  artistLastNames : PropTypes.any.isRequired,
  genres          : PropTypes.any.isRequired,
  instruments     : PropTypes.any.isRequired,
  maxDifficulty   : PropTypes.number,
  classes         : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  activeField      : state.form.addSongForm ? state.form.addSongForm.active : null,
  matchedArtist    : artistsMatchedSelector(state),
  maxDifficulty    : maxDifficultySelector(state),
  genres           : genresSelector(state),
  instruments      : instrumentsSelector(state),
  artistLastNames  : artistLastNamesSelector(state)
});

export default connect(mapStateToProps)(withStyles(styles)(AddSongMainTab));
