import { orm } from 'store/orm';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';
import { sortBy, find, isEmpty } from 'lodash';

export const ormSelector = state => state.orm;

const songsSelector = ormCreateSelector(orm, (Session, SongsView) => {
  // TODO: make into composable subunits
  const { sortField, paginationPerPage, paginationCurrent, searchText } = SongsView;
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

  if (paginationPerPage) {
    const start = (paginationCurrent) * paginationPerPage;
    const end = start + parseInt(paginationPerPage, 10);
    songs = songs.slice(start, end);
  }

  return songs;
});

const currentSongSelector = ormCreateSelector(orm, (Session, SongsView) => {
  if (!isEmpty(SongsView) && !isEmpty(SongsView.currentSong)) {
    const song = Session.Song.withId(SongsView.currentSong);
    // TODO: find a better solution
    if (song) {
      song.progress = parseInt(song.progress, 10);
      song.difficulty = parseInt(song.difficulty, 10);
      const userFields = {};
      Session.Field.all()
        .toModelArray()
        .forEach(userField => {
          const found = find(song.userFields, { id: userField.id });
          if (found) {
            userFields[userField.id] = found.value;
          }
        });
      song.userFields = userFields;
      return song;
    }
  }
  return null;
});

const songStatsSelector = ormCreateSelector(orm, (Session, state) => (
  Session.Song ? Session.Song.getStats() : {}
));

const userTabsSelector = ormCreateSelector(orm, (session, currentSong) => {
  const tabs = session.FieldTab.all()
    .toModelArray()
    .map(({ fields, sortedFields, sortedRows, name, id, ...props }) => ({
      name,
      id,
      fields: fields.toModelArray(),
      sortedFields,
      sortedRows,
      ...props
    }));
  // console.info('Sorted Rows', tabs[0].sortedRows);
  // TODO: implement sorting capability, for now just sort by creation order
  return sortBy(tabs, 'tabId');
});
//
// TODO: Fix race condition where selectors cause errors before SongsView is initialized
export const songs = createSelector(ormSelector, state => state.SongsView, songsSelector);
export const currentSong = createSelector(ormSelector, state => state.SongsView, currentSongSelector);
export const songStats = createSelector(ormSelector, state => state.orm, songStatsSelector);

export const userTabs = createSelector(
  ormSelector,
  state => (state.SongsView ? state.SongsView.currentSong : null),
  userTabsSelector
);
