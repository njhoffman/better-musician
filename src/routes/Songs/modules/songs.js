/* @flow */

import type { SongObject, SongsStateObject } from '../interfaces/songs';
// TODO: set up aliases in flow
import type { Action } from '../../../interfaces/action';
import exampleSongs from '../data/ExampleSongs';

// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_SONGS = 'SHOW_SONGS';
export const ADD_SONG = 'ADD_SONG';
export const DELETE_SONG = 'DELETE_SONG';
export const UPDATE_SONG = 'UPDATE_SONG';

// ------------------------------------
// Actions
// ------------------------------------
export const getVisibleSongs = (state: SongsStateObject) => {
  return state.collection ? state.collection : [];
};

export const actions = {
   getVisibleSongs
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_SONGS]:  (state: SongsStateObject): SongsStateObject => ({ ...state, collection: getVisibleSongs(state) }),
  [ADD_SONG]:    (state: SongsStateObject): SongsStateObject => state,
  [DELETE_SONG]: (state: SongsStateObject): SongsStateObject => state,
  [UPDATE_SONG]: (state: SongsStateObject): SongsStateObject => state
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: SongsStateObject  = {
  collection: exampleSongs,
  fetching: false,
  currentGenres: [],
  currentInstruments: [],
  instruments: [],
  genres: [],
  visibleSongs: exampleSongs,
  filters: []
};

export default function songsReducer (state: SongsStateObject = initialState, action : Action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
