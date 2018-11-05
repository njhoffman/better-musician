import { orm } from 'store/orm';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';
import { find, isEmpty } from 'lodash';

export const ormSelector = state => state.orm;

const songsSelector = ormCreateSelector(orm, (Session, SongsView) => {
  // TODO: make into composable subunits
  const { sortField, perPage, paginationCurrent, searchText } = SongsView;
  let songs = Session.Song.all().toModelArray();

  if (searchText && searchText.trim().length > 0) {
    const searchRE = new RegExp(searchText, 'i');
    songs = songs.filter(song => (
      searchRE.test(song.artist.lastName)
      || searchRE.test(song.artist.firstName)
      || searchRE.test(song.artist.fullName)
      || searchRE.test(song.title)
    ));
  }

  if (sortField) {
    songs = songs.sort((a, b) => {
      if (sortField === 'artist') {
        return a.artist.fullName > b.artist.fullName;
      }
      return (a[sortField] > b[sortField]);
    });
    if (SongsView.sortInverse) {
      songs = songs.reverse();
    }
  }

  if (perPage) {
    const start = (paginationCurrent) * perPage;
    const end = start + parseInt(perPage, 10);
    songs = songs.slice(start, end);
  }

  return songs;
});

const currentSongSelector = ormCreateSelector(orm, (Session, SongsView) => {
  if (!isEmpty(SongsView) && !isEmpty(SongsView.currentSong)) {
    const song = Session.Song.withId(SongsView.currentSong);
    // TODO: find a better solution
    song.progress = parseInt(song.progress, 10);
    song.difficulty = parseInt(song.difficulty, 10);
    song.customFields = Session.CustomField.all()
      .toModelArray()
      .map((cf/* , idx */) => {
        const found = find(song.customFields, { id: cf.id });
        return found ? found.value : '';
      });
    return song;
  }
  return null;
});

const songStatsSelector = ormCreateSelector(orm, (Session, state) => (
  Session.Song ? Session.Song.getStats() : {}
));

const savedTabsSelector = ormCreateSelector(orm, (Session, currentSong) => {
  const tabs = {};
  Session.CustomField.all()
    .toModelArray()
    .forEach((field, idx) => {
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
export const songStats = createSelector(ormSelector, state => state.orm, songStatsSelector);

export const savedTabs = createSelector(
  ormSelector,
  state => (state.SongsView ? state.SongsView.currentSong : null),
  savedTabsSelector
);
