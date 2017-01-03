import {
  songs as songsSelector,
  artists as artistsSelector ,
  currentSong as currentSongSelector
} from 'routes/Songs/modules/selectors';

import { CALL_API, Schemas } from 'middleware/api';

export const INIT_SONG_VIEW   = 'INIT_SONG_VIEW';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const HIDE_MODAL       = 'HIDE_MODAL';
export const SET_SORT = 'SET_SORT';
export const FETCH_SONGS = 'FETCH_SONGS';


// ------------------------------------
// Action Creators
// ------------------------------------

export const hideModal = () => {
  return (dispatch, getState) => {
    return dispatch({ type: HIDE_MODAL });
  };
}

export const setCurrentSong = (currentSong) => (dispatch, getState) => {
  return dispatch({ type: SET_CURRENT_SONG, payload: currentSong });
};

export const setSort = (sortField) => (dispatch, getState) => {
  return dispatch({ type: SET_SORT, payload: sortField });
};


const nextAvailableId = (songCollection) =>
  songCollection
    .map( (song) => song.id )
    .sort( (a, b) => a - b )
    .pop() + 1;

export const addSong = (values) => (dispatch, getState) => {
  const fieldValues = getState().form.addSongForm.values;
  const availableId = nextAvailableId(getState().songs.collection);
  return dispatch({ type: 'ADD_SONG', payload: { ...fieldValues, ...{ id: availableId }} });
};

export const SONGS_REQUEST = 'SONGS_REQUEST';
export const SONGS_SUCCESS = 'SONGS_SUCCESS';
export const SONGS_FAILURE = 'SONGS_FAILURE';

// Fetches a page of starred repos by a particular user.
export const fetchSongs = (dispatch, getState) =>  {
  const nextPageUrl = `/songs`;
  return dispatch({
    [CALL_API]: {
      types: [ SONGS_REQUEST, SONGS_SUCCESS, SONGS_FAILURE ],
      endpoint: nextPageUrl
    }
  });
}

export const actions = {
  addSong, hideModal, setCurrentSong, fetchSongs
};


// ------------------------------------
// Property Mappers
// ------------------------------------

export const isOpen = (modal) => {
  return (modal.modalType === 'ADD_SONG');
};

export const getCurrentSong = (state) => {
  return currentSongSelector(state);
};

export const getVisibleSongs = (state) => {
  console.info("\tget songs selector");
  return songsSelector(state);
};

// ------------------------------------
// Action Handlers
// ------------------------------------


const ACTION_HANDLERS = {
  [INIT_SONG_VIEW]: (state, action) => {
    return ({ ...state, initialized: true });
  },
  [SET_CURRENT_SONG]: (state, action) =>
    ({ ...state, currentSong: action.payload }),
  [SET_SORT]: (state, action) => {
    return ({ ...state, sortField: action.payload });
  }
};


// ------------------------------------
// Reducer
// ------------------------------------


const initialState = {
  fetching:           false,
  currentGenres:      [],
  currentInstruments: [],
  initialized:        false,
  currentFilters:     [],
  sortField:          ''
};

export default function songsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

