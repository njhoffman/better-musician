import { CALL_API, Schemas } from 'middleware/api';

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_SONGS      = 'FETCH_SONGS';
export const SONGS_REQUEST    = 'SONGS_REQUEST';
export const SONGS_SUCCESS    = 'SONGS_SUCCESS';
export const SONGS_FAILURE    = 'SONGS_FAILURE';
export const LOAD_ARTISTS     = 'LOAD_ARTISTS';
export const LOAD_INSTRUMENTS = 'LOAD_INSTRUMENTS';
export const LOAD_GENRES      = 'LOAD_GENRES';
export const LOAD_SONGS       = 'LOAD_SONGS';
export const LOAD_FIELDS      = 'LOAD_FIELDS';


// ------------------------------------
// Special Actions Creators
// ------------------------------------

export const fetchSongs = ({ dispatch, getState }) => {
  const state = getState();
  if (!state.songs || state.songs.isFetching || state.songs.initialized) {
    return false;
  }
  return dispatch({
    [CALL_API]: {
      types: [ SONGS_REQUEST, songsSuccess, SONGS_FAILURE ],
      endpoint: '/songs'
    }
  });
}

export const songsSuccess = (response) => (dispatch) => {
  const tables = response.tables;

  dispatch({ type: SONGS_SUCCESS,    payload: response });
  dispatch({ type: LOAD_ARTISTS,     payload: tables.artists });
  dispatch({ type: LOAD_INSTRUMENTS, payload: tables.instruments });
  dispatch({ type: LOAD_GENRES,      payload: tables.genres });
  dispatch({ type: LOAD_SONGS,       payload: tables.songs });
  dispatch({ type: LOAD_FIELDS,      payload: tables.fields });
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SONGS_REQUEST] : (state) => ({...state, isFetching: true }),
  [SONGS_SUCCESS] : (state) => ({...state, isFetching: false, initialized: true})
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  initialized: false
};

export default function songsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
