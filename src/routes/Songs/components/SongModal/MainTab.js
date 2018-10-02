import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import FormField, { FormRow, Stars } from 'components/Field';
import { Row, Column } from 'react-foundation';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import { artistLastNames, artistMatched, instruments, genres } from 'selectors/songs';
import { maxDifficulty } from 'selectors/users';
import {
  FIELD_VARIANT_EDIT, FIELD_VARIANT_ADD, FIELD_VARIANT_VIEW,
  MODAL_VARIANT_EDIT, MODAL_VARIANT_ADD, MODAL_VARIANT_VIEW
} from 'constants/ui';
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

export const SongMainTab = ({
  activeField,
  lastActiveField,
  matchedArtist,
  lastNames,
  instrumentOptions,
  genreOptions,
  maxDifficulty,
  classes,
  variant: modalVariant,
  ...props
}) => {
  const fieldProps = {
    ...props,
    fullWidth: true,
    variant:  (modalVariant === MODAL_VARIANT_EDIT ? FIELD_VARIANT_EDIT
      : modalVariant === MODAL_VARIANT_ADD ? FIELD_VARIANT_ADD : FIELD_VARIANT_VIEW)
  };

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
        { modalVariant !== MODAL_VARIANT_EDIT && <Button variant='raised' secondary label={buttonLabel} /> }
      </Column>
    );
  };

  const renderStars = (number) => ( <Stars className={classes.progressStars} number={parseInt(number)} />);

  const renderViewFields = () => (
    <FormRow>
      <FormField
        name='title'
        type='text'
        label='Song Title'
        {...fieldProps}
      />
      <FormField
        name='artist.fullName'
        type='text'
        label='Song Artist'
        {...fieldProps}
      />
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
          label='Song Title'
          {...fieldProps}
        />
      </FormRow>
      <FormRow>
        <FormField
          name='artist.lastName'
          type='autocomplete'
          label='Last Name / Band'
          options={lastNames}
          {...fieldProps}
        />
        <FormField
          name='artist.firstName'
          type='text'
          label='First Name'
          {...fieldProps}
        />
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
      {modalVariant === MODAL_VARIANT_VIEW && renderViewFields()}
      {modalVariant !== MODAL_VARIANT_VIEW && renderEditFields()}
      <FormRow>
        <FormField
          name='genre.name'
          type='autocomplete'
          label='Song Genre'
          options={genreOptions}
          {...fieldProps}
        />
        <FormField
          name='instrument.name'
          type='autocomplete'
          label='Instrument'
          options={instrumentOptions}
          {...fieldProps}
        />
      </FormRow>
      <FormRow>
        <FormField
          name='difficulty'
          type='slider'
          label='Difficulty'
          min={1}
          max={maxDifficulty}
          step={1}
          {...fieldProps}
        />
        <FormField
          name='progress'
          type='slider'
          label='Progress'
          min={0}
          max={4}
          step={1}
          valueDisplay={renderStars}
          {...fieldProps}
        />
      </FormRow>
    </Fragment>
  );
};

SongMainTab.propTypes = {
  lastActiveField:   PropTypes.string.isRequired,
  activeField:       PropTypes.string.isRequired,
  matchedArtist:     PropTypes.object,
  lastNames:         PropTypes.any.isRequired,
  genreOptions:      PropTypes.any.isRequired,
  instrumentOptions: PropTypes.any.isRequired,
  maxDifficulty:     PropTypes.number,
  classes:           PropTypes.object.isRequired,
  variant:           PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  matchedArtist:     artistMatched(state),
  lastNames:         artistLastNames(state),
  maxDifficulty:     maxDifficulty(state),
  genreOptions:      genres(state),
  instrumentOptions: instruments(state)
});

export default connect(mapStateToProps)(withStyles(styles)(SongMainTab));
