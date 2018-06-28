import { songs as songsSelector } from 'routes/Songs/modules/selectors';
import { LOCATION_CHANGE } from 'store/location';

// ------------------------------------
// Constants
// ------------------------------------

export const INIT_SONG_VIEW           = 'INIT_SONG_VIEW';
export const SET_CURRENT_SONG         = 'SET_CURRENT_SONG';
export const SET_SORT                 = 'SET_SORT';
export const SET_PAGINATION_PER_PAGE  = 'SET_PAGINATION_PER_PAGE';
export const SET_PAGINATION_CURRENT   = 'SET_PAGINATION_CURRENT';

// ------------------------------------
// Action Creators
// ------------------------------------

export const setCurrentSong = (song) => (dispatch, getState) => {
  if (getState().ui.modal.type) {
    return;
  }
  return dispatch({ type: SET_CURRENT_SONG, payload: song.id });
};

export const setSort = (sortField) => (dispatch, getState) => {
  return dispatch({ type: SET_SORT, payload: sortField });
};

// const nextAvailableId = (songCollection) =>
//   songCollection
//     .map((song) => song.id)
//     .sort((a, b) => a - b)
//     .pop() + 1;

export const actions = {
  setSort, setCurrentSong
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_CURRENT_SONG]: (state, action) =>
    ({ ...state, currentSong: action.payload }),
  [LOCATION_CHANGE]: (state, action) =>
    ({ ...state, currentSong: null }),
  [SET_PAGINATION_PER_PAGE]: (state, action) =>
    ({ ...state, paginationPerPage: action.payload }),
  [SET_PAGINATION_CURRENT]: (state, action) =>
    ({ ...state, paginationCurrent: action.payload }),
  [SET_SORT]: (state, action) =>
    ({ ...state, sortField: action.payload, sortInverse:  !state.sortInverse })
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  currentGenres:      [],
  currentInstruments: [],
  initialized:        false,
  currentFilters:     [],
  sortField:          '',
  sortInverse:        false,
  paginationCurrent:  1,
  paginationPerPage:  10
};

export default function songsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
