import { orm } from 'store/orm';
import { get, sortBy } from 'lodash';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const lastNameSelector = ormCreateSelector(orm, session => {
  const artists = session.Artist ? session.Artist.all().toModelArray() : [];
  const sorted = sortBy(artists.map(artist => ({
    label: artist.fullName,
    value: artist.id
  })), 'label');
  return sorted;
});

export const artistLastNames = createSelector(ormSelector, state => state, lastNameSelector);

const genreSelector = ormCreateSelector(orm, session => {
  const genres = session.Genre ? session.Genre.all().toModelArray() : [];
  return genres.map(genre => ({ label: genre.name, value: genre.id }));
});

export const genres = createSelector(ormSelector, state => state, genreSelector);

const instrumentSelector = ormCreateSelector(orm, session => {
  const instruments = session.Instrument ? session.Instrument.all().toModelArray() : [];
  return instruments.map(instrument => ({ label: instrument.name, value: instrument.id }));
});

export const instruments = createSelector(ormSelector, state => state, instrumentSelector);


const artistMatchSelector = ormCreateSelector(orm, (session, artist) => {
  let Artist = session.Artist();
  if (artist) {
    Artist = session.Artist.findByFullName(`${artist.lastName}, ${artist.firstName}`) || Artist;
  }
  return Artist;
});

export const artistMatch = createSelector(
  ormSelector,
  state => get(state, 'form.songForm.values.artist', null),
  artistMatchSelector
);

const genreMatchSelector = ormCreateSelector(orm, (session, genre) => {
  let Genre = session.Genre();
  if (genre) {
    Genre = session.Genre.findByName(genre.name) || Genre;
  }
  return Genre;
});

export const genreMatch = createSelector(
  ormSelector,
  state => get(state, 'form.songForm.values.genre', null),
  genreMatchSelector
);

const instrumentMatchSelector = ormCreateSelector(orm, (session, instrument) => {
  let Instrument = session.Instrument();
  if (instrument) {
    Instrument = session.Instrument.findByName(instrument.name) || Instrument;
  }
  return Instrument;
});

export const instrumentMatch = createSelector(
  ormSelector,
  state => get(state, 'form.songForm.values.instrument', null),
  instrumentMatchSelector
);
