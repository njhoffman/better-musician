import * as UI from 'constants/ui';
// import { songs as songsSelector } from 'routes/Songs/modules/selectors';

// ------------------------------------
// Constants
// ------------------------------------

export const SET_CURRENT_SONG         = 'SET_CURRENT_SONG';
export const SET_SORT                 = 'SET_SORT';
export const SET_PAGINATION_PER_PAGE  = 'SET_PAGINATION_PER_PAGE';
export const SET_PAGINATION_CURRENT   = 'SET_PAGINATION_CURRENT';
export const SET_SEARCH_FILTER        = 'SET_SEARCH_FILTER';

// ------------------------------------
// Action Creators
// ------------------------------------

export const setCurrentSong = (song) => (dispatch, getState) => (
  dispatch({ type: SET_CURRENT_SONG, payload: song ? song.id : '' })
);

export const setSortColumn = (sortField) => (dispatch, getState) => (
  dispatch({ type: SET_SORT, payload: sortField })
);

export const setPaginationPerPage = (num) => (dispatch, getState) => (
  dispatch({ type: SET_PAGINATION_PER_PAGE, payload: num })
);

export const setPaginationCurrent = (page) => (dispatch, getState) => (
  dispatch({ type: SET_PAGINATION_CURRENT, payload: page })
);

export const setSearchFilter = (searchText) => (dispatch, getState) => (
  dispatch({ type: SET_SEARCH_FILTER, payload: searchText })
);

export const actions = {
  setSortColumn,
  setCurrentSong,
  setPaginationPerPage,
  setPaginationCurrent,
  setSearchFilter
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [UI.INIT_VIEW_COMPLETE]: (state, action) =>
    ({ ...state, initialized: true }),

  [SET_CURRENT_SONG]: (state, action) =>
    ({ ...state, currentSong: action.payload }),

  [SET_PAGINATION_PER_PAGE]: (state, action) =>
    ({ ...state, paginationPerPage: action.payload }),

  [SET_PAGINATION_CURRENT]: (state, action) =>
    ({ ...state, paginationCurrent: action.payload }),

  [SET_SEARCH_FILTER]: (state, action) =>
    ({ ...state, searchText: action.payload }),

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
  paginationCurrent:  0,
  paginationPerPage:  10,
  searchText:         ''
};

export default function songsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
