import { orm } from 'store/orm';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';
import { find, isEmpty } from 'lodash';

export const ormSelector = state => state.orm;

const songsSelector = ormCreateSelector(orm, (Session, SongsView) => {
  const sortField = SongsView ? SongsView.sortField : 'title';
  const perPage = SongsView ? SongsView.paginationPerPage : false;
  const paginationCurrent = SongsView ? SongsView.paginationCurrent : 1;

  let retObj = Session.Song.all().toModelArray();

  if (sortField) {
    retObj = retObj.sort((a, b) => {
      if (sortField === 'artist') {
        return a.artist.fullName > b.artist.fullName;
      } else {
        return (a[sortField] > b[sortField]);
      }
    });
    if (SongsView.sortInverse) {
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

const currentSongSelector = ormCreateSelector(orm, (Session, SongsView) => {
  if (!isEmpty(SongsView) && !isEmpty(SongsView.currentSong)) {
    const song = Session.Song.withId(SongsView.currentSong);
    // TODO: find a better solution
    song.progress = parseInt(song.progress);
    song.difficulty = parseInt(song.difficulty);
    song.customFields = Session.CustomField.all().toModelArray().map((cf/* , idx */) => {
      const found = find(song.customFields, { id: cf.id });
      return found ? found.value : '';
    });
    return song;
  }
});

const paginationTotalSelector = ormCreateSelector(orm, Session => {
  return Session.Song.count();
});

const paginationStartSelector = ormCreateSelector(orm, (Session, SongsView) => {
  return (1 + (SongsView.paginationCurrent - 1) * parseInt(SongsView.paginationPerPage));
});

const paginationEndSelector = ormCreateSelector(orm, (Session, SongsView) => {
  return SongsView.paginationCurrent * SongsView.paginationPerPage > Session.Song.count()
    ? Session.Song.count()
    : SongsView.paginationCurrent * SongsView.paginationPerPage;
});

const paginationPagesSelector = ormCreateSelector(orm, (Session, SongsView) => {
  return parseInt(Math.ceil(Session.Song.count() / SongsView.paginationPerPage));
});

const songStatsSelector = ormCreateSelector(orm, (Session, state) => {
  return Session.Song ? Session.Song.getStats() : {};
});

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

// TODO: Fix race condition where selectors cause errors before SongsView is initialized
export const songs = createSelector(ormSelector, state => state.SongsView, songsSelector);
export const currentSong = createSelector(ormSelector, state => state.SongsView, currentSongSelector);
export const paginationTotal = createSelector(ormSelector, state => state.SongsView, paginationTotalSelector);
export const paginationStart = createSelector(ormSelector, state => state.SongsView, paginationStartSelector);
export const paginationEnd = createSelector(ormSelector, state => state.SongsView, paginationEndSelector);
export const paginationPages = createSelector(ormSelector, state => state.SongsView, paginationPagesSelector);
export const songStats = createSelector(ormSelector, state => state.orm, songStatsSelector);

export const savedTabs = createSelector(ormSelector, state =>
  (state.SongsView ? state.SongsView.currentSong : null),
  savedTabsSelector
);
