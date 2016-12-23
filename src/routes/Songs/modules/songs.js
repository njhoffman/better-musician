
import _ from 'lodash';
import {
  songs as songsSelector,
  artists as artistsSelector ,
  currentSong as currentSongSelector
} from 'routes/Songs/modules/selectors';


export const INIT_SONG_VIEW   = 'INIT_SONG_VIEW';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const HIDE_MODAL       = 'HIDE_MODAL';
export const SET_SORT = 'SET_SORT';


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

export const setSort = (sortField) => {
  return (dispatch, getState) => {
    return dispatch({ type: SET_SORT, payload: sortField });
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
    return dispatch({ type: 'ADD_SONG', payload: { ...fieldValues, ...{ id: availableId }} });
  };
};

export const actions = {
  addSong, hideModal, setCurrentSong
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
  console.log("get songs");
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

