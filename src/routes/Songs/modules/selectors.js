import { orm } from 'store/reducers';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';


export const ormSelector = state => state.orm;

const songSelector = ormCreateSelector(orm, (session, songsView) => {
  const sortField = songsView ? songsView.sortField : 'title';
  const perPage = songsView ? songsView.paginationPerPage : false;
  const paginationCurrent = songsView ? songsView.paginationCurrent : 1;


  let retObj = session.Song.all().toModelArray();

  if (sortField) {
    retObj = retObj.sort( (a,b) => {
      if (sortField === 'artist') {
        return a.artist.fullName > b.artist.fullName;
      } else {
        return (a[sortField] > b[sortField]);
      }
    });
    if (songsView.sortInverse) {
      retObj = retObj.reverse();
    }
  }

  if (perPage) {
    const start = (paginationCurrent - 1) * perPage;
    const end = start + parseInt(perPage);
    retObj = retObj.slice(start, end);
  }
  return retObj;
});

export const songs = createSelector(
  ormSelector,
  state => state.songsView,
  songSelector
);

const currentSongSelector = ormCreateSelector(orm, (session, songsView) => {
  // TODO: clean this up when you get footer component loaded dynamically
  return songsView && typeof songsView.currentSong !== 'undefined' && session.Song.count() > 0
    ? session.Song.withId(songsView.currentSong)
    : null;
});

export const currentSong = createSelector(
  ormSelector,
  state => state.songsView,
  currentSongSelector
);


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

const artistMatchSelector = ormCreateSelector(orm, (session, addSongForm)  => {
  if (addSongForm && addSongForm.values && addSongForm.values.artist) {
    return session.Artist.findByFullName(addSongForm.values.artist);
  }
  return null;
});

export const artistsMatched = createSelector(
  ormSelector,
  state => state.form.addSongForm,
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

const paginationTotalSelector = ormCreateSelector(orm, session => {
  return session.Song.count();
});

export const paginationTotal = createSelector(
  ormSelector,
  state => state.songsView,
  paginationTotalSelector
);


const paginationStartSelector = ormCreateSelector(orm, (session, songsView) => {
  return (1 + (songsView.paginationCurrent - 1) * parseInt(songsView.paginationPerPage));
});

export const paginationStart = createSelector(
  ormSelector,
  state => state.songsView,
  paginationStartSelector
);


const paginationEndSelector = ormCreateSelector(orm, (session, songsView) => {
  return songsView.paginationCurrent * songsView.paginationPerPage > session.Song.count()
    ? session.Song.count()
    : songsView.paginationCurrent * songsView.paginationPerPage
});

export const paginationEnd = createSelector(
  ormSelector,
  state => state.songsView,
  paginationEndSelector
);

const paginationPagesSelector = ormCreateSelector(orm, (session, songsView) => {
  return parseInt(Math.ceil(session.Song.count() / songsView.paginationPerPage));
});

export const paginationPages = createSelector(
  ormSelector,
  state => state.songsView,
  paginationPagesSelector
);

const songStatsSelector = ormCreateSelector(orm, (session, state) => {
  return session.Song ? session.Song.getStats() : {};
});

export const songStats = createSelector(
  ormSelector,
  state => state.orm,
  songStatsSelector
);
