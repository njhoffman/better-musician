import { CALL_API } from 'middleware/api';
import { init as initLog } from 'shared/logger';

const { log } = initLog('api');

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_SONGS           = 'FETCH_SONGS';
export const SONGS_REQUEST         = 'SONGS_REQUEST';
export const SONGS_SUCCESS         = 'SONGS_SUCCESS';
export const SONGS_FAILURE         = 'SONGS_FAILURE';
export const LOAD_ARTISTS          = 'LOAD_ARTISTS';
export const LOAD_INSTRUMENTS      = 'LOAD_INSTRUMENTS';
export const LOAD_GENRES           = 'LOAD_GENRES';
export const LOAD_SONGS            = 'LOAD_SONGS';
export const LOAD_FIELDS           = 'LOAD_FIELDS';
// redux-auth actions
export const AUTHENTICATE_START    = 'AUTHENTICATE_START';
export const AUTHENTICATE_COMPLETE = 'AUTHENTICATE_COMPLETE';

export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

export const SONGS_ADD = 'SONGS_ADD';
export const SONGS_ADD_SUCCESS = 'SONGS_ADD_SUCCESS';
export const SONGS_ADD_FAILURE = 'SONGS_ADD_FAILURE';

// ------------------------------------
// Action Creators
// ------------------------------------

export const fetchSongs = ({ dispatch, getState, nextLocation }) => {
  const state = getState();
  if (state.api.initialized.indexOf('songs') !== -1) {
    return false;
  }
  return dispatch({
    [CALL_API]: {
      types: [ SONGS_REQUEST, songsSuccess, SONGS_FAILURE ],
      endpoint: '/songs'
    }
  });
};

export const songsSuccess = (response) => (dispatch) => {
  const tables = response.tables;
  log('fetchSongsSuccess', response);


  /* eslint-disable no-multi-spaces */
  dispatch({ type: SONGS_SUCCESS,    payload: response });
  dispatch({ type: LOAD_ARTISTS,     payload: tables.artists });
  dispatch({ type: LOAD_INSTRUMENTS, payload: tables.instruments });
  dispatch({ type: LOAD_GENRES,      payload: tables.genres });
  dispatch({ type: LOAD_FIELDS,      payload: tables.fields });
  dispatch({ type: LOAD_SONGS,       payload: tables.songs });
  /* eslint-enable no-multi-spaces */
};

export const updateUser = () => (dispatch, getState) => {
  const fieldValues = getState().form.updateProfileForm
    ? getState().form.updateProfileForm.values
    : getState().form.updateSettingsForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [USER_UPDATE, userUpdateSuccess, USER_UPDATE_FAILURE],
      method:   'POST',
      endpoint: '/users/update',
      payload:  { ...fieldValues }
    }
  });
};

export const userUpdateSuccess = (response) => (dispatch) => {
  log('updateUserSuccess', response);
  dispatch({ type: USER_UPDATE_SUCCESS, user: response });
  dispatch({ type: 'UI_SHOW_SNACKBAR', meta: { message: 'Profile Updated' } });
  // reloads user attributes
  dispatch({ type: AUTHENTICATE_COMPLETE, user: response });
};

export const addSong = () => (dispatch, getState) => {
  const fieldValues = getState().form.addSongForm.values;

  return dispatch({
    [CALL_API]: {
      types:    [SONGS_ADD, songsAddSuccess, SONGS_ADD_FAILURE],
      method:   'POST',
      endpoint: '/songs/add',
      payload:  { ...fieldValues }
    }
  });
};

export const songsAddSuccess = (response) => (dispatch) => {
  console.info('addSongSuccess', response);
  dispatch({ type: SONGS_ADD_SUCCESS, user: response });
  dispatch({ type: 'UI_SHOW_SNACKBAR', meta: { message: 'Song Added' } });
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [AUTHENTICATE_START] : (state) =>
    ({ ...state, isFetching: true }),
  [AUTHENTICATE_COMPLETE] : (state) =>
    ({ ...state,
      isFetching: false,
      initialized: state.initialized.indexOf('user') === -1 ? state.initialized.concat('user') : state.initialized
    }),
  [SONGS_REQUEST] : (state) => ({ ...state, isFetching: true }),
  [SONGS_SUCCESS] : (state) =>
    ({ ...state,
      isFetching: false,
      initialized: state.initialized.indexOf('songs') === -1 ? state.initialized.concat('songs') : state.initialized }),
  [USER_UPDATE] : (state) => ({ ...state, isFetching: true }),
  [USER_UPDATE_SUCCESS] : (state) => ({ ...state, isFetching: false }),
  [USER_UPDATE_FAILURE] : (state) => ({ ...state, isFetching: false }),
  [SONGS_ADD] : (state) => ({ ...state, isFetching: true }),
  [SONGS_ADD_SUCCESS] : (state) => ({ ...state, isFetching: false }),
  [SONGS_ADD_FAILURE] : (state) => ({ ...state, isFetching: false })
};

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  isFetching: false,
  initialized: []
};

export default function apiReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
