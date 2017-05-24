import { orm } from 'store/reducers';
import { get } from 'lodash';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const lastNameSelector = ormCreateSelector(orm, session => {
  const artists = session.Artist ? session.Artist.all().toModelArray() : [];
  return artists.map(artist => {
    return artist.lastName;
  });
});

export const artistLastNames = createSelector(
  ormSelector,
  state => state,
  lastNameSelector
);

const firstNameSelector = ormCreateSelector(orm, session => {
  const artists = session.Artist ? session.Artist.all().toModelArray() : [];
  return artists.map(artist => {
    return artist.firstName;
  });
});

export const artistFirstNames = createSelector(
  ormSelector,
  state => state,
  firstNameSelector
);

const artistMatchSelector = ormCreateSelector(orm, (session, artist) => {
  if (artist) {
    return session.Artist.findByFullName(artist.lastName + ', ' + artist.firstName);
  }
  return null;
});

export const artistsMatched = createSelector(
  ormSelector,
  state =>  get(state, 'form.addSongForm.values.artist', null),
  artistMatchSelector
);

const genreSelector = ormCreateSelector(orm, session => {
  const genres = session.Genre ? session.Genre.all().toModelArray() : [];
  return genres.map(genre => {
    return { text: genre.name, value: genre.id };
  });
});

export const genres = createSelector(
  ormSelector,
  state => state,
  genreSelector
);

const instrumentSelector = ormCreateSelector(orm, session => {
  const instruments = session.Instrument ? session.Instrument.all().toModelArray() : [];
  return instruments.map(instrument => {
    return { text: instrument.name, value: instrument.id };
  });
});

export const instruments = createSelector(
  ormSelector,
  state => state,
  instrumentSelector
);
