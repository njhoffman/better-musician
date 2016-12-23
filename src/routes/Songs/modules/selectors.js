import { orm } from 'store/reducers';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';


export const ormSelector = state => state.orm;

const songSelector = ormCreateSelector(orm, (session, state) => {
  const songsView = state ? state.songsView : false;
  const sortField = songsView ? songsView.sortField : 'title';
  const modelObj = session.Song
    ? session.Song.all().toModelArray()
    : [];
  if (sortField) {
    return modelObj.sort( (a,b) => {
      if (sortField === 'artist') {
        return a.artist.fullName > b.artist.fullName;
      } else {
        return (a[sortField] > b[sortField]);
      }
    });
  } else {
    return modelObj;
  }
});

export const songs = createSelector(
  ormSelector,
  state => state,
  songSelector
);

const currentSongSelector = ormCreateSelector(orm, (session, state) => {
  return state.songsView && typeof state.songsView.currentSong !== 'undefined'
    ? session.Song.withId(state.songsView.currentSong[0])
    : null;
});

export const currentSong = createSelector(
  ormSelector,
  state => state,
  currentSongSelector
);


const artistSelector = ormCreateSelector(orm, session => {
  const modelObj = session.Artist? session.Artist.all().toModelArray() : [];
  return modelObj;
});

export const artists = createSelector(
  ormSelector,
  state => state,
  artistSelector
);
