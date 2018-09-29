import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
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
  }
});

export const AddSongMainTab = ({
  activeField,
  lastActiveField,
  matchedArtist,
  artistLastNames,
  instruments,
  genres,
  maxDifficulty,
  noEdit,
  classes,
  ...props
}) => {
  const renderImage = () => {
    // TODO: Find a better way through config!
    const fieldRE = /^artist|^instrument|^genre/;
    const imageField = (
      activeField && fieldRE.test(activeField) ? activeField
      : lastActiveField && fieldRE.test(lastActiveField) ? lastActiveField
      : 'artist').replace(/\..*/, '');
    const imageFile = matchedArtist && matchedArtist.pictures && matchedArtist.pictures[0]
      ? matchedArtist.pictures[0] : '_unknown.png';
    const imageLabel = matchedArtist ? matchedArtist.fullName() : `Unknown ${imageField.toUpperCase()}`;
    const buttonLabel = matchedArtist ? 'Change Picture' : 'Add Picture';
    return (
      <Column>
        <img className={classes.image} src={`/images/${imageField}/${imageFile}`} />
        <Typography>{imageLabel}</Typography>
        { !noEdit && <Button variant='raised' secondary label={buttonLabel} /> }
      </Column>
    );
  };

  const renderStars = (number) => ( <Stars className={classes.progressStars} number={parseInt(number)} />);

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

  const renderEditFields = () => (
    <Fragment>
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
    </Fragment>
  );

  return (
    <Fragment>
      <FormRow>
        <Column>
          <Row className={classes.imageFrame}>
            { renderImage() }
          </Row>
        </Column>
      </FormRow>
      {noEdit && renderViewFields()}
      {!noEdit && renderEditFields()}
      <FormRow>
        <FormField
          name='genre.name'
          type='autocomplete'
          label='Song Genre'
          options={genres} />
        <FormField
          name='instrument.name'
          type='autocomplete'
          label='Instrument'
          options={instruments} />
      </FormRow>
      <FormRow>
        <FormField
          name='difficulty'
          type='slider'
          label='Difficulty'
          min={1}
          max={maxDifficulty}
          step={1} />
        <FormField
          name='progress'
          type='slider'
          label='Progress'
          min={0}
          max={4}
          step={1}
          valueDisplay={renderStars} />
      </FormRow>
    </Fragment>
  );
};

AddSongMainTab.propTypes = {
  lastActiveField : PropTypes.string.isRequired,
  activeField     : PropTypes.string.isRequired,
  noEdit          : PropTypes.bool.isRequired,
  matchedArtist   : PropTypes.object,
  artistLastNames : PropTypes.any.isRequired,
  genres          : PropTypes.any.isRequired,
  instruments     : PropTypes.any.isRequired,
  maxDifficulty   : PropTypes.number,
  classes         : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  matchedArtist    : artistsMatchedSelector(state),
  maxDifficulty    : maxDifficultySelector(state),
  genres           : genresSelector(state),
  instruments      : instrumentsSelector(state),
  artistLastNames  : artistLastNamesSelector(state)
});

export default connect(mapStateToProps)(withStyles(styles)(AddSongMainTab));
