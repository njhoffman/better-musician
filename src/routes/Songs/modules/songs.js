import {
  songs as songsSelector,
  artists as artistsSelector ,
  currentSong as currentSongSelector
} from 'routes/Songs/modules/selectors';


export const INIT_SONG_VIEW   = 'INIT_SONG_VIEW';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const HIDE_MODAL       = 'HIDE_MODAL';
export const SET_SORT         = 'SET_SORT';
export const ADD_SONG         = 'ADD_SONG';

export const MODAL_ADD_SONG = 'MODAL_ADD_SONG';


// ------------------------------------
// Action Creators
// ------------------------------------

export const hideModal = () => (dispatch, getState) => {
  return dispatch({ type: HIDE_MODAL });
}

export const setCurrentSong = (songsCollection, selectedRow, arg3, arg4) => (dispatch, getState) => {
  if (selectedRow.length === 0) {
    // TODO: figure out a better way to handle this
    // wait a bit before deselecting current song just in case it was a double click (opening view modal)
    // arbitrary wait time 200ms
    return window.setTimeout(() => {
      if (! getState().modal.modalType) {
        return dispatch({ type: SET_CURRENT_SONG, payload: null });
      }
    }, 200);
  }

  // const currentSong = songsCollection[selectedRow - 1];
  const currentSong = songsCollection[selectedRow[0] - 1];
  return dispatch({ type: SET_CURRENT_SONG, payload: currentSong.id });
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
  return dispatch({ type: ADD_SONG, payload: { ...fieldValues, ...{ id: availableId }} });
};

export const viewSong = (songValues) => (dispatch, getState) => {
  return dispatch({
    type: 'SHOW_MODAL',
    meta: {
      modalType: MODAL_ADD_SONG,
      modalView: 'view',
      modalProps: {}
    }
  });
};


export const editSong = () => (dispatch, getState) => {
  return dispatch({
    type: 'SHOW_MODAL',
    meta: {
      modalType: MODAL_ADD_SONG,
      modalView: 'edit',
      modalProps: {}
    }
  });
};

export const actions = {
  addSong, hideModal, setCurrentSong, viewSong
};


// ------------------------------------
// Property Mappers
// ------------------------------------

export const isOpen = (modal) => {
  return (modal.modalType === MODAL_ADD_SONG);
};

export const getCurrentSong = (state) => {
  return currentSongSelector(state);
};

export const getVisibleSongs = (state) => {
  return songsSelector(state);
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_CURRENT_SONG]: (state, action) =>
    ({ ...state, currentSong: action.payload }),
  ['LOCATION_CHANGE']: (state, action) =>
    ({ ...state, currentSong: null }),
  ['SET_PAGINATION_PER_PAGE']: (state, action) =>
    ({ ...state, paginationPerPage: action.payload }),
  ['SET_PAGINATION_CURRENT']: (state, action) =>
    ({ ...state, paginationCurrent: action.payload }),
  [SET_SORT]: (state, action) =>
    ({ ...state, sortField: action.payload, sortInverse:  !state.sortInverse } )

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

export default function songsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

