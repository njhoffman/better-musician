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

const currentSongSelector = ormCreateSelector(orm, (session, state) => {
  return state.songsView && typeof state.songsView.currentSong !== 'undefined' && session.Song.count() > 0
    ? session.Song.withId(state.songsView.currentSong)
    : null;
});

export const currentSong = createSelector(
  ormSelector,
  state => state,
  currentSongSelector
);


const artistSelector = ormCreateSelector(orm, session => {
  const modelObj = session.Artist ? session.Artist.all().toModelArray() : [];
  return modelObj;
});

export const artists = createSelector(
  ormSelector,
  state => state,
  artistSelector
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
  return session.Song.getStats();
});

export const songStats = createSelector(
  ormSelector,
  state => state.orm,
  songStatsSelector
);
