/* @flow */

import _ from 'lodash';
import type { SongObject, SongsStateObject } from '../interfaces/songs';

// TODO: set up aliases in flow
import type { Action } from '../../../interfaces/action';
import exampleSongs from '../data/exampleSongs';
import exampleGenres from '../data/exampleGenres';
import exampleArtists from '../data/exampleArtists';
import exampleInstruments from '../data/exampleInstruments';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_SONG = 'ADD_SONG';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const DELETE_SONG = 'DELETE_SONG';
export const UPDATE_SONG = 'UPDATE_SONG';
export const HIDE_MODAL = 'HIDE_MODAL';

// ------------------------------------
// Action Creators
// ------------------------------------

export const hideModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: HIDE_MODAL });
  };
}

export const setCurrentSong = (currentSong) => {
  return (dispatch, getState) => {
    return dispatch({ type: SET_CURRENT_SONG, payload: currentSong });
  };
};

const nextAvailableId = (songCollection) =>
  songCollection
    .map( (song) => song.id )
    .sort( (a, b) => a - b )
    .pop() + 1;

export const addSong = (values) => {
  return (dispatch, getState) => {
    const fieldValues = getState().form.addSongForm.values;
    const availableId = nextAvailableId(getState().songs.collection);
    return dispatch({ type: ADD_SONG, payload: { ...fieldValues, ...{ id: availableId }} });
  };
};

// ------------------------------------
// Property Mappers
// ------------------------------------

export const isOpen = (modal) => {
  return (modal.modalType === ADD_SONG);
};

export const actions = {
  addSong, hideModal, isOpen
};

export const getCurrentSong = (state) => {
  if ( _.isEmpty(state.currentSong) ) {
    return;
  }
  const currentSong = state.currentSong[0] ? state.currentSong[0] : state.currentSong;
  return _.find(state.collection, { id: currentSong });
};

export const getVisibleSongs = (state: SongsStateObject) => {
  return state.collection ? state.collection : [];
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_SONG]:    (state: SongsStateObject, action): SongsStateObject =>
    ({ ...state, collection: state.collection.concat(action.payload) }),
    [SET_CURRENT_SONG]: (state: SongStateObject, action): SongStateObject =>
      ({ ...state, currentSong: action.payload }),
  [DELETE_SONG]: (state: SongsStateObject): SongsStateObject => state,
  [UPDATE_SONG]: (state: SongsStateObject): SongsStateObject => state
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState: SongsStateObject = {
  collection:         exampleSongs,
  fetching:           false,
  currentGenres:      [],
  currentInstruments: [],
  instruments:        exampleInstruments,
  genres:             exampleGenres,
  artists:            exampleArtists,
  visibleSongs:       exampleSongs,
  filters:            []
};

export default function songsReducer (state: SongsStateObject = initialState, action : Action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
