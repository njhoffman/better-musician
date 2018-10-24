import { orm } from 'store/orm';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';
import { find, isEmpty, omit, unset, cloneDeep } from 'lodash';

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
      }
      return (a[sortField] > b[sortField]);
    });
    if (SongsView.sortInverse) {
      retObj = retObj.reverse();
    }
  }

  if (perPage) {
    const start = (paginationCurrent - 1) * perPage;
    const end = start + parseInt(perPage, 10);
    retObj = retObj.slice(start, end);
  }
  return retObj;
});

const currentSongSelector = ormCreateSelector(orm, (Session, SongsView) => {
  if (!isEmpty(SongsView) && !isEmpty(SongsView.currentSong)) {
    const song = Session.Song.withId(SongsView.currentSong);
    // TODO: find a better solution
    song.progress = parseInt(song.progress, 10);
    song.difficulty = parseInt(song.difficulty, 10);
    song.customFields = Session.CustomField.all().toModelArray().map((cf/* , idx */) => {
      const found = find(song.customFields, { id: cf.id });
      return found ? found.value : '';
    });
    return song;
  }
  return null;
});

const paginationTotalSelector = ormCreateSelector(orm, Session => Session.Song.count());

const paginationStartSelector = ormCreateSelector(orm, (Session, SongsView) => (
  1 + (SongsView.paginationCurrent - 1) * parseInt(SongsView.paginationPerPage, 10)
));

const paginationEndSelector = ormCreateSelector(orm, (Session, SongsView) => (
  SongsView.paginationCurrent * SongsView.paginationPerPage > Session.Song.count()
    ? Session.Song.count()
    : SongsView.paginationCurrent * SongsView.paginationPerPage
));

const paginationPagesSelector = ormCreateSelector(orm, (Session, SongsView) => (
  parseInt(Math.ceil(Session.Song.count() / SongsView.paginationPerPage), 10)
));

const songStatsSelector = ormCreateSelector(orm, (Session, state) => (
  Session.Song ? Session.Song.getStats() : {}
));


const savedTabsSelector = ormCreateSelector(orm, (Session, currentSong) => {
  const tabs = {};
  Session.CustomField.all().toModelArray().forEach((field, idx) => {
    // TODO: find a better way through the model
    const cField = field;
    cField.idx = idx;

    if (!tabs[cField.tabName]) {
      tabs[cField.tabName] = [];
    }
    tabs[cField.tabName].push({ ...cField.fieldProps });
  });

  return Object.keys(tabs).map((tabKey, idx) => (
    { name: tabKey, fields: tabs[tabKey], idx }
  ));
});

// TODO: Fix race condition where selectors cause errors before SongsView is initialized
export const songs = createSelector(ormSelector, state => state.SongsView, songsSelector);
export const currentSong = createSelector(ormSelector, state => state.SongsView, currentSongSelector);
export const paginationTotal = createSelector(ormSelector, state => state.SongsView, paginationTotalSelector);
export const paginationStart = createSelector(ormSelector, state => state.SongsView, paginationStartSelector);
export const paginationEnd = createSelector(ormSelector, state => state.SongsView, paginationEndSelector);
export const paginationPages = createSelector(ormSelector, state => state.SongsView, paginationPagesSelector);
export const songStats = createSelector(ormSelector, state => state.orm, songStatsSelector);

export const savedTabs = createSelector(
  ormSelector,
  state => (state.SongsView ? state.SongsView.currentSong : null),
  savedTabsSelector
);
