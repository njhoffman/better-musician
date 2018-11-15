import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
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
  MODAL_VARIANT_ADD, MODAL_VARIANT_VIEW
} from 'constants/ui';
// import css from './AddSong.scss';

const styles = (theme) => ({
  imageFrame: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit
  },
  image: {
    height: '200px',
    marginBottom: '5px'
  },
  imageLabel: {
    margin: '-3.0em 0 0 0',
    padding: '.25em 0 !important',
    background: 'rgba(10, 10, 10, 0.85)'
  },
  row: {
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
  const mode = fieldMode(variant);
  const fieldProps = {
    ...props,
    className: classes.field,
    mode
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
    const buttonLabel = 'Add Picture';

    return {
      buttonLabel,
      imageLabel: matched.primaryImage ? matched.imageLabel : 'No Artist Picture',
      image: matched.primaryImage
    };
  };

  const renderImage = () => {
    // TODO: Find a better way through config!
    const { buttonLabel, imageLabel, image } = matchedImages();

    return (
      <Column>
        <Card>
          <CardMedia image={image} className={classes.image} />
          <CardContent className={classes.imageLabel}>
            {variant !== MODAL_VARIANT_VIEW && (
              <Button variant='contained' secondary label={buttonLabel} />
            )}
            {variant === MODAL_VARIANT_VIEW && (
              <Typography variant='h6' color='textSecondary'>
                {imageLabel}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Column>
    );
  };

  const renderStars = (number) => (
    <Stars number={parseInt(number, 10)} />
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
