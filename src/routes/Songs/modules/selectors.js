import { orm } from 'store/reducers';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';
import { find, isEmpty } from 'lodash';


export const ormSelector = state => state.orm;

const songsSelector = ormCreateSelector(orm, (session, songsView) => {
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
  songsSelector
);

const currentSongSelector = ormCreateSelector(orm, (session, songsView) => {
  // TODO: clean this up when you get footer component loaded dynamically

  if (!isEmpty(songsView) && !isEmpty(songsView.currentSong)) {
    const song = session.Song.withId(songsView.currentSong);
    return song;
  }
});

export const currentSong = createSelector(
  ormSelector,
  state => state.songsView,
  currentSongSelector
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

const savedTabsSelector = ormCreateSelector(orm, (session, currentSong) => {
  let tabs = {};
  session.CustomField.all().toModelArray().forEach(field => {
    if (tabs[field.tabName]) {
      tabs[field.tabName].push(field);
    } else {
      tabs[field.tabName] = [field];
    }
  });
  let ret = [];
  Object.keys(tabs).forEach(tabKey => {
    ret.push({ name: tabKey, fields: tabs[tabKey] });
  });
  return ret;
});

export const savedTabs = createSelector(
  ormSelector,
  state => state.songsView.currentSong,
  savedTabsSelector
);

