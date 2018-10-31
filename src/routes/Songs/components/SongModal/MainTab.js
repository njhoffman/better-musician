import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import FormField, { FormRow, Stars } from 'components/Field';
import { Row, Column } from 'react-foundation';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import {
  genreMatch,
  instrumentMatch,
  artistMatch,
  artistLastNames,
  instruments,
  genres
} from 'selectors/songs';
import { maxDifficulty } from 'selectors/users';
import {
  FIELD_EDIT, FIELD_ADD, FIELD_VIEW,
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
  progressStars: theme.app.starColor,
  row: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      marginTop: '0px',
      marginBottom: '0px'
    },
  },
  field: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  }
});

const fieldMode = (modalVariant) => {
  if (modalVariant === MODAL_VARIANT_VIEW) {
    return FIELD_VIEW;
  } else if (modalVariant === MODAL_VARIANT_ADD) {
    return FIELD_ADD;
  }
  return FIELD_EDIT;
};

export const SongMainTab = ({
  activeField,
  lastActiveField,
  matchedArtist,
  matchedGenre,
  matchedInstrument,
  lastNameOptions,
  instrumentOptions,
  genreOptions,
  maxDiff,
  classes,
  variant,
  ...props
}) => {
  const fieldProps = {
    ...props,
    className: classes.field,
    mode: fieldMode(variant)
  };

  const matchedImages = () => {
    const fieldRE = /^artist|^instrument|^genre/;
    let field = 'artist';
    if (activeField && fieldRE.test(activeField)) {
      field = activeField;
    } else if (lastActiveField && fieldRE.test(lastActiveField)) {
      field = lastActiveField;
    }
    field = field.replace(/\..*/, '');
    const matchers = { artist: matchedArtist, genre: matchedGenre, instrument: matchedInstrument };
    const matched = matchers[field];
    const buttonLabel =  matched.images && matched.images.length > 0 ? 'Change Picture' : 'Add Picture';
    return { buttonLabel, imageLabel: matched.imageLabel, image: matched.primaryImage };
  };

  const renderImage = () => {
    // TODO: Find a better way through config!
    const { buttonLabel, imageLabel, image } = matchedImages();

    return (
      <Column>
        <img alt={`${imageLabel}`} className={classes.image} src={`${image}`} />
        <Typography>{imageLabel}</Typography>
        { variant !== MODAL_VARIANT_EDIT && <Button variant='contained' secondary label={buttonLabel} /> }
      </Column>
    );
  };

  const renderStars = (number) => (
    <Stars className={classes.progressStars} number={parseInt(number, 10)} />
  );

  const renderViewFields = () => (
    <FormRow className={classes.row}>
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
      <FormRow className={classes.row}>
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
      <FormRow className={classes.row}>
        <FormField
          name='artist.lastName'
          type='autocomplete'
          label='Last Name / Band'
          options={lastNameOptions}
          maxResults={10}
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
      <FormRow className={classes.row}>
        <Column>
          <Row className={classes.imageFrame}>
            { renderImage() }
          </Row>
        </Column>
      </FormRow>
      {variant === MODAL_VARIANT_VIEW && renderViewFields()}
      {variant !== MODAL_VARIANT_VIEW && renderEditFields()}
      <FormRow className={classes.row}>
        <FormField
          name='genre.displayName'
          type='autocomplete'
          label='Song Genre'
          options={genreOptions}
          maxResults={2}
          {...fieldProps}
        />
        <FormField
          name='instrument.displayName'
          type='autocomplete'
          label='Instrument'
          options={instrumentOptions}
          maxResults={10}
          {...fieldProps}
        />
      </FormRow>
      <FormRow className={classes.row}>
        <FormField
          name='difficulty'
          type='slider'
          label='Difficulty'
          min={1}
          max={maxDiff}
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

SongMainTab.defaultProps = {
  matchedArtist:     null,
  lastNameOptions:   [],
  genreOptions:      [],
  instrumentOptions: [],
  maxDiff:           10
};

SongMainTab.propTypes = {
  lastActiveField:   PropTypes.string.isRequired,
  activeField:       PropTypes.string.isRequired,
  matchedArtist:     PropTypes.instanceOf(Object),
  lastNameOptions:   PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  genreOptions:      PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  instrumentOptions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  maxDiff:           PropTypes.number,
  classes:           PropTypes.instanceOf(Object).isRequired,
  variant:           PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  matchedGenre:      genreMatch(state),
  matchedInstrument: instrumentMatch(state),
  matchedArtist:     artistMatch(state),
  maxDiff:           maxDifficulty(state),
  lastNameOptions:   artistLastNames(state),
  genreOptions:      genres(state),
  instrumentOptions: instruments(state)
});

export default connect(mapStateToProps)(withStyles(styles)(SongMainTab));
