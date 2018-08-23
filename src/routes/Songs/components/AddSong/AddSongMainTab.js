import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import FormField, { FormRow, Stars } from 'components/Field';
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
    marginBottom: theme.spacing.unit,
    flexWrap: 'wrap'
  },
  flexTwo: {
    flex: '0 0 250px',
    width: '250px'
  },
  flexThree:  {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '250px'
  },
});

export const AddSongMainTab = (props) => {
  const {
    lastActiveField,
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
    <Stars
      className={classes.progressStars}
      number={parseInt(number)}
      />
  );

  const renderViewFields = () => (
    <FormRow>
      <FormField
        name='title'
        type='text'
        label='Song Title' />
      <FormField
        name='artist.fullName'
        type='text'
        label='Song Artist' />
    </FormRow>
  );

  const renderEditFields = ({ artistLastNames }) => (
    <div>
      <FormRow>
        <FormField
          name='title'
          type='text'
          small={12}
          medium={8}
          centerOnSmall
          label='Song Title' />
      </FormRow>
      <FormRow>
        <FormField
          name='artist.lastName'
          type='autocomplete'
          options={artistLastNames}
          label='Last Name / Band' />
        <FormField
          name='artist.firstName'
          type='text'
          label='First Name' />
      </FormRow>
    </div>
  );
  return (
    <div>
      <FormRow>
        <Column>
          <Row className={classes.imageFrame}>
            { renderImage() }
          </Row>
        </Column>
      </FormRow>
      {modalView.isView() && renderViewFields()}
      {!modalView.isView() && renderEditFields(props)}
      <FormRow>
        <FormField
          name='genre.name'
          type='autocomplete'
          label='Song Genre'
          options={props.genres} />
        <FormField
          name='instrument.name'
          type='autocomplete'
          label='Instrument'
          options={props.instruments} />
      </FormRow>
      <FormRow>
        <FormField
          name='difficulty'
          type='slider'
          min={1}
          max={props.maxDifficulty}
          step={1}
          disabled={modalView.isView()}
          label='Difficulty' />
        <FormField
          name='progress'
          type='slider'
          min={0}
          max={4}
          step={1}
          valueDisplay={renderStars}
          disabled={modalView.isView()}
          label='Progress' />
      </FormRow>
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
