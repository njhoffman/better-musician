import { orm } from 'store/reducers';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';
import { find, isEmpty } from 'lodash';

export const ormSelector = state => state.orm;

const songsSelector = ormCreateSelector(orm, (Session, songsView) => {
  const sortField = songsView ? songsView.sortField : 'title';
  const perPage = songsView ? songsView.paginationPerPage : false;
  const paginationCurrent = songsView ? songsView.paginationCurrent : 1;

  let retObj = Session.Song.all().toModelArray();

  if (sortField) {
    retObj = retObj.sort((a, b) => {
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

const currentSongSelector = ormCreateSelector(orm, (Session, songsView) => {
  if (!isEmpty(songsView) && !isEmpty(songsView.currentSong)) {
    const song = Session.Song.withId(songsView.currentSong);
    song.customFields = Session.CustomField.all().toModelArray().map((cf, idx) => {
      const found = find(song.customFields, { id: cf.id });
      return found ? found.value : '';
    });
    return song;
  }
});

export const currentSong = createSelector(
  ormSelector,
  state => state.songsView,
  currentSongSelector
);

const paginationTotalSelector = ormCreateSelector(orm, Session => {
  return Session.Song.count();
});

export const paginationTotal = createSelector(
  ormSelector,
  state => state.songsView,
  paginationTotalSelector
);

const paginationStartSelector = ormCreateSelector(orm, (Session, songsView) => {
  return (1 + (songsView.paginationCurrent - 1) * parseInt(songsView.paginationPerPage));
});

export const paginationStart = createSelector(
  ormSelector,
  state => state.songsView,
  paginationStartSelector
);

const paginationEndSelector = ormCreateSelector(orm, (Session, songsView) => {
  return songsView.paginationCurrent * songsView.paginationPerPage > Session.Song.count()
    ? Session.Song.count()
    : songsView.paginationCurrent * songsView.paginationPerPage;
});

export const paginationEnd = createSelector(
  ormSelector,
  state => state.songsView,
  paginationEndSelector
);

const paginationPagesSelector = ormCreateSelector(orm, (Session, songsView) => {
  return parseInt(Math.ceil(Session.Song.count() / songsView.paginationPerPage));
});

export const paginationPages = createSelector(
  ormSelector,
  state => state.songsView,
  paginationPagesSelector
);

const songStatsSelector = ormCreateSelector(orm, (Session, state) => {
  return Session.Song ? Session.Song.getStats() : {};
});

export const songStats = createSelector(
  ormSelector,
  state => state.orm,
  songStatsSelector
);

const savedTabsSelector = ormCreateSelector(orm, (Session, currentSong) => {
  let tabs = {};
  Session.CustomField.all().toModelArray().forEach((field, idx) => {
    field.idx = idx;
    if (tabs[field.tabName]) {
      tabs[field.tabName].push(field);
    } else {
      tabs[field.tabName] = [field];
    }
  });
  return Object.keys(tabs).map(tabKey => {
    return ({ name: tabKey, fields: tabs[tabKey] });
  });
});

export const savedTabs = createSelector(
  ormSelector,
  state => state.songsView.currentSong,
  savedTabsSelector
);

