import { orm } from 'store/reducers';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const artistSelector = ormCreateSelector(orm, session => {
  const artists = session.Artist ? session.Artist.all().toModelArray() : [];
  return artists.map(artist => {
    return artist.fullName;
  });
});

export const artists = createSelector(
  ormSelector,
  state => state,
  artistSelector
);

const artistMatchSelector = ormCreateSelector(orm, (session, addSongFormValues)  => {
  if (addSongFormValues && addSongFormValues.artist) {
    console.info('foundArtist', addSongFormValues);
    return session.Artist.findByFullName(addSongFormValues.artist.fullName);
  } else {
    console.info('missingArtist', addSongFormValues);
  }
  return null;
});

export const artistsMatched = createSelector(
  ormSelector,
  state => state.form.addSongForm ? state.form.addSongForm.values : null,
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

